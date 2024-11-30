import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FilmService } from '../../services/film.service';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { EnhancedFilm } from '../../shared/models/enhanced.file.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FooterComponent, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  films: EnhancedFilm[] = [];
  loading: boolean = true;
  error: string = '';

  constructor(private filmService: FilmService) { }

  ngOnInit() {
    this.loadNowShowingFilms();
  }

  loadNowShowingFilms() {
    this.loading = true;
    this.filmService.getNowShowingFilms().subscribe({
      next: (films) => {
        this.films = films;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load films. Please try again later.';
        this.loading = false;
      }
    });
  }
}