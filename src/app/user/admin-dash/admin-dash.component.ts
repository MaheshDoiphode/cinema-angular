import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { Cinema } from '../../shared/models/cinema.model';
import { Film } from '../../shared/models/film.model';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { EnhancedFilm } from '../../shared/models/enhanced.file.model';

@Component({
  selector: 'app-admin-dash',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, FooterComponent],
  templateUrl: './admin-dash.component.html'
})
export class AdminDashComponent implements OnInit {
  activeTab: 'cinemas' | 'films' = 'cinemas';
  pendingCinemas: Cinema[] = [];
  films: EnhancedFilm[] = [];
  loading = false;
  error = '';
  success = '';
  showAddFilmForm = false;

  newFilm: Film = {
    titre: '',
    duree: 0,
    realisateur: '',
    description: '',
    dateSortie: new Date()
  };

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.loadPendingCinemas();
  }

  changeTab(tab: 'cinemas' | 'films') {
    this.activeTab = tab;
    this.error = '';
    this.success = '';
    if (tab === 'cinemas') {
      this.loadPendingCinemas();
    } else if (tab === 'films') {
      this.loadFilms();
    }
  }
  loadFilms() {
    this.loading = true;
    this.adminService.getAllFilms().subscribe({
      next: (films) => {
        this.films = films;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load films';
        this.loading = false;
      }
    });
  }
  loadPendingCinemas() {
    this.loading = true;
    this.adminService.getPendingCinemas().subscribe({
      next: (cinemas) => {
        this.pendingCinemas = cinemas.filter(c => c.status === 'PENDING');
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load pending cinemas';
        this.loading = false;
      }
    });
  }

  verifyCinema(cinema: Cinema) {
    if (!cinema.id) return;

    this.loading = true;
    this.adminService.verifyCinema(cinema.id).subscribe({
      next: () => {
        this.pendingCinemas = this.pendingCinemas.filter(c => c.id !== cinema.id);
        this.success = 'Cinema verified successfully';
        this.loading = false;
        setTimeout(() => this.success = '', 3000);
      },
      error: () => {
        this.error = 'Failed to verify cinema';
        this.loading = false;
      }
    });
  }

  createFilm() {
    this.loading = true;
    this.adminService.createFilm(this.newFilm).subscribe({
      next: (film) => {
        this.films.push(film);
        this.showAddFilmForm = false;
        this.success = 'Film created successfully';
        this.loading = false;
        this.resetFilmForm();
        setTimeout(() => this.success = '', 3000);
      },
      error: () => {
        this.error = 'Failed to create film';
        this.loading = false;
      }
    });
  }

  deleteFilm(film: EnhancedFilm) {
    if (!film.id || !confirm('Are you sure you want to delete this film?')) return;

    this.loading = true;
    this.error = '';
    this.success = '';

    this.adminService.deleteFilm(film.id).subscribe({
      next: (isSuccess) => {
        if (isSuccess) {
          this.films = this.films.filter(f => f.id !== film.id);
          this.success = 'Film deleted successfully';
          this.loading = false;
          setTimeout(() => this.success = '', 3000);
        } else {
          this.error = 'Failed to delete film';
          this.loading = false;
        }
      },
      error: (error) => {
        this.error = error.error?.message || 'Failed to delete film';
        this.loading = false;
      }
    });
  }

  resetFilmForm() {
    this.newFilm = {
      titre: '',
      duree: 0,
      realisateur: '',
      description: '',
      dateSortie: new Date()
    };
  }
}