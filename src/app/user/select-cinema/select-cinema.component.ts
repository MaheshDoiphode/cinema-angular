import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CinemaService } from '../../services/cinema.service';
import { Cinema } from '../../shared/models/cinema.model';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-select-cinema',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './select-cinema.component.html',
  styleUrl: './select-cinema.component.css'
})
export class SelectCinemaComponent implements OnInit {
  cinemas: Cinema[] = [];
  loading: boolean = true;
  error: string = '';
  filmId: number | null = null;

  constructor(
    private cinemaService: CinemaService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.filmId = Number(this.route.snapshot.paramMap.get('id'));
    if (!this.filmId) {
      this.error = 'Invalid film ID';
      this.loading = false;
      return;
    }

    const cityId = this.authService.getCityId();
    if (!cityId) {
      // Store the film ID in session storage before redirecting
      sessionStorage.setItem('pendingFilmId', this.filmId.toString());
      this.router.navigate(['/choose-city']);
      return;
    }

    this.loadCinemas(cityId, this.filmId);
  }

  loadCinemas(cityId: number, filmId: number) {
    this.loading = true;
    this.cinemaService.getCinemasShowingFilm(cityId, filmId).subscribe({
      next: (cinemas) => {
        this.cinemas = cinemas;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'No cinemas found showing this film in your city';
        this.loading = false;
      }
    });
  }

  selectCinema(cinema: Cinema) {
    if (this.filmId && cinema.id) {
      this.router.navigate(['/book', this.filmId, cinema.id]);
    }
  }
}