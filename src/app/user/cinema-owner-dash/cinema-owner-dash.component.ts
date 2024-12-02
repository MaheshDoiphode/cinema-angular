import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CinemaOwnerService } from '../../services/cinema-owner.service';
import { Cinema } from '../../shared/models/cinema.model';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { VilleService } from '../../services/ville.service';
import { Ville } from '../../shared/models/ville.model';
import { AuthService } from '../../auth/auth.service';
import { EditCinemaModalComponent } from './edit-cinema-modal/edit-cinema-modal.component';

@Component({
  selector: 'app-cinema-owner-dash',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, FooterComponent, EditCinemaModalComponent],
  templateUrl: './cinema-owner-dash.component.html',
  styleUrls: ['./cinema-owner-dash.component.css']
})
export class CinemaOwnerDashComponent implements OnInit {
  activeTab = 'cinemas';
  cinemas: Cinema[] = [];
  loading = true;
  error = '';
  showAddForm = false;
  editingCinema: Cinema | null = null;
  cities: Ville[] = [];
  showEditModal = false;

  newCinema: Cinema = {
    name: '',
    nombreSalles: 3,
    longitude: 0,
    latitude: 0,
    altitude: 0,
    villeId: 1
  };

  constructor(
    private cinemaOwnerService: CinemaOwnerService,
    private villeService: VilleService,
    private authService: AuthService
  ) { }
  ngOnInit() {
    this.loadCities();
    this.loadCinemas();
  }

  loadCinemas() {
    this.loading = true;
    this.cinemaOwnerService.getOwnedCinemas().subscribe({
      next: (cinemas) => {
        this.cinemas = cinemas;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load cinemas';
        this.loading = false;
      }
    });
  }
  loadCities() {
    this.villeService.getAllCities().subscribe({
      next: (cities) => {
        this.cities = cities;
      },
      error: (error) => {
        this.error = 'Failed to load cities';
      }
    });
  }
  registerCinema() {
    this.loading = true;
    this.cinemaOwnerService.registerCinema(this.newCinema).subscribe({
      next: (cinema) => {
        this.cinemas.push(cinema);
        this.showAddForm = false;
        this.loading = false;
        this.newCinema = {
          name: '',
          nombreSalles: 3,
          longitude: 0,
          latitude: 0,
          altitude: 0,
          villeId: 1
        };
      },
      error: (error) => {
        this.error = 'Failed to register cinema';
        this.loading = false;
      }
    });
  }

  updateCinema() {
    if (!this.editingCinema?.id) return;

    this.loading = true;
    this.cinemaOwnerService.updateCinema(this.editingCinema.id, this.editingCinema).subscribe({
      next: (cinema) => {
        const index = this.cinemas.findIndex(c => c.id === cinema.id);
        if (index !== -1) {
          this.cinemas[index] = cinema;
        }
        this.editingCinema = null;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to update cinema';
        this.loading = false;
      }
    });
  }
  
  //------------ modal edit
  handleEditClick(cinema: Cinema) {
    this.editingCinema = cinema;
    this.showEditModal = true;
  }

  handleModalClose() {
    this.showEditModal = false;
    this.editingCinema = null;
  }

  handleSaveChanges(updatedCinema: Cinema) {
    if (!updatedCinema.id) return;

    this.loading = true;
    this.cinemaOwnerService.updateCinema(updatedCinema.id, updatedCinema).subscribe({
      next: (cinema) => {
        const index = this.cinemas.findIndex(c => c.id === cinema.id);
        if (index !== -1) {
          this.cinemas[index] = cinema;
        }
        this.showEditModal = false;
        this.editingCinema = null;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to update cinema';
        this.loading = false;
      }
    });
  }
}