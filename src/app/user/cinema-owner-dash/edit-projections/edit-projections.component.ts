// src/app/user/cinema-owner-dash/edit-projections/edit-projections.component.ts

import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { forkJoin, Observable } from 'rxjs';
import { ProjectionService } from '../../../services/projection.service';
import { FilmService } from '../../../services/film.service';
import { SalleService } from '../../../services/salle.service';
import { Projection } from '../../../shared/models/projection.model';
import { EnhancedFilm } from '../../../shared/models/enhanced.file.model';
import { Salle } from '../../../shared/models/salle.model';
import { Seance } from '../../../shared/models/seance.model';
import { Cinema } from '../../../shared/models/cinema.model';
import { HallPricing } from '../../../shared/models/salle.model';

interface LoadResult {
  projections: Projection[];
  halls: Salle[];
}

@Component({
  selector: 'app-edit-projections',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-projections.component.html'
})
export class EditProjectionsComponent implements OnInit, OnDestroy {
  @Input() cinemas: Cinema[] = [];
  selectedCinemaStatus: 'PENDING' | 'VERIFIED' | null = null;
  loading = false;
  error = '';
  selectedCinemaId: number | null = null;
  projections: Projection[] = [];
  films: EnhancedFilm[] = [];
  halls: Salle[] = [];
  seances: Seance[] = [];
  showAddForm = false;
  editingProjection: Projection | null = null;

  newProjection: Projection = {
    dateProjection: new Date(),
    prix: 0,
    filmId: 0,
    salleId: 0,
    seanceId: 0
  };

  showNewSeanceForm = false;
  newSeance = {
    heureDebut: ''
  };

  constructor(
    private projectionService: ProjectionService,
    private filmService: FilmService,
    private salleService: SalleService
  ) {}

  ngOnInit(): void {
    this.resetState();
    this.loadFilms();
    this.loadSeances();
  }

  ngOnDestroy(): void {
    this.resetState();
  }

  resetState(): void {
    this.error = '';
    this.loading = false;
    this.showAddForm = false;
    this.showNewSeanceForm = false;
    this.selectedCinemaId = null;
    this.selectedCinemaStatus = null;
    this.editingProjection = null;
    this.projections = [];
    this.halls = [];
    this.newProjection = {
      dateProjection: new Date(),
      prix: 0,
      filmId: 0,
      salleId: 0,
      seanceId: 0
    };
  }
  getHallPrice(hallType: string): number {
    return HallPricing[hallType as keyof typeof HallPricing] || 0;
  }
  onCinemaSelect(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const cinemaId = Number(select.value);
    
    if (!cinemaId) {
      this.resetState();
      return;
    }

    // Check cinema status before loading
    const selectedCinema = this.cinemas.find(c => c.id === cinemaId);
    if (selectedCinema?.status === 'PENDING') {
      this.error = 'This cinema is pending verification. You cannot manage projections until it is verified.';
      this.selectedCinemaStatus = 'PENDING';
      return;
    }

    this.selectedCinemaStatus = 'VERIFIED';
    this.loadProjections(cinemaId);
  }

  loadProjections(cinemaId: number): void {
    this.loading = true;
    this.error = '';
    this.selectedCinemaId = cinemaId;
    
    forkJoin({
      projections: this.projectionService.getProjectionsByCinema(cinemaId),
      halls: this.salleService.getHallsByCinema(cinemaId)
    }).subscribe({
      next: (result) => {
        this.projections = result.projections;
        this.halls = result.halls;
        this.loading = false;
      },
      error: (error: Error) => {
        this.error = 'Failed to load data';
        this.loading = false;
        this.resetState();
      }
    });
  }

  loadFilms(): void {
    this.filmService.getNowShowingFilms().subscribe({
      next: (films) => {
        this.films = films;
      },
      error: () => {
        this.error = 'Failed to load films';
      }
    });
  }

  loadSeances(): void {
    this.projectionService.getSeances().subscribe({
      next: (seances) => {
        this.seances = seances;
      },
      error: () => {
        this.error = 'Failed to load seances';
      }
    });
  }

  setError(message: string): void {
    this.error = message;
    setTimeout(() => {
      this.error = '';
    }, 5000);
  }

  addProjection(): void {
    if (!this.selectedCinemaId || !this.validateProjection(this.newProjection)) {
      return;
    }

    this.loading = true;
    this.error = '';

    this.projectionService.createProjection(this.newProjection).subscribe({
      next: (projection) => {
        this.projections.push(projection);
        this.showAddForm = false;
        this.loading = false;
        this.resetNewProjection();
      },
      error: () => {
        this.setError('Failed to create projection');
        this.loading = false;
      }
    });
  }

  private validateProjection(projection: Projection): boolean {
    if (!projection.filmId || !projection.salleId || !projection.seanceId || !projection.prix) {
      this.setError('Please fill all required fields');
      return false;
    }
    if (new Date(projection.dateProjection) < new Date()) {
      this.setError('Projection date cannot be in the past');
      return false;
    }
    return true;
  }

  updateProjection(projection: Projection): void {
    if (!projection.id) return;

    this.loading = true;
    
    const updatedProjection = {
      ...projection,
      dateProjection: new Date(projection.dateProjection)
    };

    this.projectionService.updateProjection(projection.id, updatedProjection).subscribe({
      next: (updatedProjection) => {
        const index = this.projections.findIndex(p => p.id === updatedProjection.id);
        if (index !== -1) {
          this.projections[index] = updatedProjection;
        }
        this.editingProjection = null;
        this.loading = false;
      },
      error: () => {
        this.setError('Failed to update projection');
        this.loading = false;
      }
    });
  }

  deleteProjection(projection: Projection): void {
    if (!projection.id || !confirm('Are you sure you want to delete this projection?')) return;

    this.loading = true;
    this.projectionService.deleteProjection(projection.id).subscribe({
      next: () => {
        this.projections = this.projections.filter(p => p.id !== projection.id);
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to delete projection';
        this.loading = false;
      }
    });
  }

  addNewSeance(): void {
    if (!this.newSeance.heureDebut) {
      this.error = 'Please enter a valid time';
      return;
    }

    this.loading = true;
    this.error = '';

    this.projectionService.createSeance(this.newSeance).subscribe({
      next: (seance) => {
        this.seances.push(seance);
        this.showNewSeanceForm = false;
        this.loading = false;
        this.newSeance.heureDebut = '';
      },
      error: () => {
        this.error = 'Failed to create show time';
        this.loading = false;
      }
    });
  }

  resetNewProjection(): void {
    this.newProjection = {
      dateProjection: new Date(),
      prix: 0,
      filmId: 0,
      salleId: 0,
      seanceId: 0
    };
  }
  onHallSelect(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const hallId = Number(select.value);
    const selectedHall = this.halls.find(h => h.id === hallId);
    
    if (selectedHall) {
      this.newProjection.salleId = hallId;
      this.newProjection.prix = HallPricing[selectedHall.name as keyof typeof HallPricing];
    }
  }
  onEditHallSelect(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const hallId = Number(select.value);
    const selectedHall = this.halls.find(h => h.id === hallId);
    
    if (selectedHall && this.editingProjection) {
      this.editingProjection.salleId = hallId;
      this.editingProjection.prix = HallPricing[selectedHall.name as keyof typeof HallPricing];
    }
  }

  getFilmTitle(filmId: number): string {
    return this.films.find(f => f.id === filmId)?.title ?? 'Unknown Film';
  }

  getHallName(hallId: number): string {
    return this.halls.find(h => h.id === hallId)?.name ?? 'Unknown Hall';
  }

  getSeanceTime(seanceId: number): string {
    return this.seances.find(s => s.id === seanceId)?.heureDebut ?? 'Unknown Time';
  }
}
