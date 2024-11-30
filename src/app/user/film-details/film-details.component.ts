import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FilmService } from '../../services/film.service';
import { EnhancedFilm } from '../../shared/models/enhanced.file.model';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
@Component({
  selector: 'app-film-details',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './film-details.component.html',
  styleUrl: './film-details.component.css'
})
export class FilmDetailsComponent implements OnInit {
  film?: EnhancedFilm;
  loading: boolean = true;
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private filmService: FilmService
  ) { }

  ngOnInit() {
    const filmId = this.route.snapshot.paramMap.get('id');
    if (!filmId) {
      this.error = 'Invalid film ID';
      this.loading = false;
      return;
    }

    this.loadFilmDetails(Number(filmId));
  }

  loadFilmDetails(id: number) {
    this.loading = true;
    this.filmService.getFilmById(id).subscribe({
      next: (film) => {
        this.film = film;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load movie details';
        this.loading = false;
        this.router.navigate(['/home']);
      }
    });
  }
}