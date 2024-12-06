// src/app/user/cinema-owner-dash/edit-halls/edit-halls.component.ts

import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SalleService } from '../../../services/salle.service';
import { PlaceService } from '../../../services/place.service';
import { Salle } from '../../../shared/models/salle.model';
import { Place, PlaceConfiguration } from '../../../shared/models/place.model';

export enum HallType {
  STANDARD = 'STANDARD',
  VIP = 'VIP',
  PREMIUM = 'PREMIUM'
}

@Component({
  selector: 'app-edit-halls',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-halls.component.html',
  styleUrls: ['./edit-halls.component.css']
})
export class EditHallsComponent implements OnInit {
  @Input() cinemas: any[] = [];
  
  loading = false;
  error = '';
  selectedCinemaId: number | null = null;
  halls: Salle[] = [];
  selectedHall: Salle | null = null;
  places: Place[] = [];
  
  hallTypes = Object.values(HallType);
  showAddHallForm = false;
  editingHall: Salle | null = null;
  
  placeConfiguration: PlaceConfiguration = {
    salleId: 0,
    totalRows: 4,
    totalColumns: 4
  };

  newHall: Salle = {
    name: HallType.STANDARD,
    nombrePlaces: 16,
    cinemaId: 0
  };

  showPlaceConfiguration = false;

  constructor(
    private salleService: SalleService,
    private placeService: PlaceService
  ) {}

  ngOnInit() {
    this.resetState();
  }

  resetState() {
    this.error = '';
    this.loading = false;
    this.showAddHallForm = false;
    this.showPlaceConfiguration = false;
    this.selectedCinemaId = null;
    this.selectedHall = null;
    this.editingHall = null;
    this.halls = [];
    this.places = [];
  }

  loadHalls(event: Event) {
    this.error = '';
    const selectElement = event.target as HTMLSelectElement;
    const cinemaId = Number(selectElement.value);

    if (!cinemaId) {
      this.resetState();
      return;
    }

    this.loading = true;
    this.selectedCinemaId = cinemaId;
    this.newHall = {
      name: HallType.STANDARD,
      nombrePlaces: 16,
      cinemaId: cinemaId
    };

    this.salleService.getHallsByCinema(cinemaId).subscribe({
      next: (halls) => {
        this.halls = halls;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load halls';
        this.loading = false;
      }
    });
  }

  selectHall(hall: Salle) {
    this.error = '';
    this.selectedHall = hall;
    this.showPlaceConfiguration = true;
    this.loadPlaces(hall.id!);
  }

  closePlaceConfiguration() {
    this.showPlaceConfiguration = false;
    this.selectedHall = null;
    this.places = [];
  }

  loadPlaces(hallId: number) {
    this.loading = true;
    this.placeService.getPlacesBySalle(hallId).subscribe({
      next: (places) => {
        this.places = places;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load seats';
        this.loading = false;
      }
    });
  }

  addHall() {
    if (!this.selectedCinemaId) return;

    this.newHall.cinemaId = this.selectedCinemaId;
    this.loading = true;
    this.error = '';

    this.salleService.createSalle(this.newHall).subscribe({
      next: (hall) => {
        this.halls.push(hall);
        this.showAddHallForm = false;
        this.loading = false;
        this.newHall = {
          name: HallType.STANDARD,
          nombrePlaces: 16,
          cinemaId: this.selectedCinemaId!
        };
      },
      error: (error) => {
        this.error = 'Failed to create hall';
        this.loading = false;
      }
    });
  }

  updateSeatsCount(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const rows = Number(inputElement.value);
    if (rows > 0 && rows <= 10) {
      this.placeConfiguration.totalColumns = rows;
      this.placeConfiguration.totalRows = rows;
      this.newHall.nombrePlaces = rows * rows;
    }
  }

  updateHall(hall: Salle) {
    if (!hall.id) return;

    this.loading = true;
    this.error = '';

    this.salleService.updateSalle(hall.id, hall).subscribe({
      next: (updatedHall) => {
        const index = this.halls.findIndex(h => h.id === updatedHall.id);
        if (index !== -1) {
          this.halls[index] = updatedHall;
        }
        this.editingHall = null;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to update hall';
        this.loading = false;
      }
    });
  }

  deleteHall(hall: Salle) {
    if (!hall.id || !confirm('Are you sure you want to delete this hall?')) return;

    this.loading = true;
    this.error = '';

    this.salleService.deleteSalle(hall.id).subscribe({
      next: () => {
        this.halls = this.halls.filter(h => h.id !== hall.id);
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to delete hall';
        this.loading = false;
      }
    });
  }

  configurePlaces() {
    if (!this.selectedHall) return;

    this.loading = true;
    this.error = '';
    const config: PlaceConfiguration = {
      salleId: this.selectedHall.id!,
      totalRows: this.placeConfiguration.totalRows,
      totalColumns: this.placeConfiguration.totalColumns
    };

    this.placeService.configurePlaces(config).subscribe({
      next: (response) => {
        this.places = response.places;
        this.loading = false;
        if (this.selectedHall) {
          this.selectedHall.configuredPlaces = this.places.length;
          const hallIndex = this.halls.findIndex(h => h.id === this.selectedHall?.id);
          if (hallIndex !== -1) {
            this.halls[hallIndex] = this.selectedHall;
          }
        }
      },
      error: (error) => {
        this.error = 'Failed to configure seats';
        this.loading = false;
      }
    });
  }
}