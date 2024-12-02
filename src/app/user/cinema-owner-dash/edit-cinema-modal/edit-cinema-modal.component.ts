import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Cinema } from '../../../shared/models/cinema.model';
import { Ville } from '../../../shared/models/ville.model';


@Component({
  selector: 'app-edit-cinema-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50" 
         *ngIf="show" 
         (click)="close()">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white"
           (click)="$event.stopPropagation()">
        <div class="mt-3">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Edit Cinema</h3>
          <form (ngSubmit)="save()" #editForm="ngForm" class="space-y-4">
            <!-- Cinema Name -->
            <div>
              <label class="block text-sm font-medium text-gray-700">Cinema Name *</label>
              <input type="text" [(ngModel)]="editedCinema.name" name="name" required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            </div>

            <!-- City Selection -->
            <div>
              <label class="block text-sm font-medium text-gray-700">City *</label>
              <select [(ngModel)]="editedCinema.villeId" name="villeId" required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                <option *ngFor="let city of cities" [value]="city.id">
                  {{ city.name }}
                </option>
              </select>
            </div>

            <!-- Number of Halls -->
            <div>
              <label class="block text-sm font-medium text-gray-700">Number of Halls *</label>
              <input type="number" [(ngModel)]="editedCinema.nombreSalles" name="nombreSalles" required min="1"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            </div>

            <!-- Location Details -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">Longitude *</label>
                <input type="number" [(ngModel)]="editedCinema.longitude" name="longitude" required step="any"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Latitude *</label>
                <input type="number" [(ngModel)]="editedCinema.latitude" name="latitude" required step="any"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Altitude *</label>
                <input type="number" [(ngModel)]="editedCinema.altitude" name="altitude" required step="any"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
              </div>
            </div>

            <!-- Form Actions -->
            <div class="flex justify-end space-x-3 pt-4">
              <button type="button" (click)="close()"
                class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                Cancel
              </button>
              <button type="submit" [disabled]="!editForm.form.valid"
                class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `
})
export class EditCinemaModalComponent {
  @Input() show = false;
  @Input() cinema: Cinema | null = null;
  @Input() cities: Ville[] = [];
  @Output() closeModal = new EventEmitter<void>();
  @Output() saveChanges = new EventEmitter<Cinema>();

  editedCinema: Cinema = {
    name: '',
    nombreSalles: 3,
    longitude: 0,
    latitude: 0,
    altitude: 0,
    villeId: 1
  };

  ngOnChanges() {
    if (this.cinema) {
      this.editedCinema = { ...this.cinema };
    }
  }

  close() {
    this.closeModal.emit();
  }

  save() {
    this.saveChanges.emit(this.editedCinema);
  }
}