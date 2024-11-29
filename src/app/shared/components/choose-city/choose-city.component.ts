import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../../auth/auth.service";
import { Ville } from "../../models/ville.model";
import { VilleService } from "../../services/ville.service";

@Component({
  selector: 'app-choose-city',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './choose-city.component.html',
  styleUrl: './choose-city.component.css'
})
export class ChooseCityComponent implements OnInit {
  cities: Ville[] = [];
  loading: boolean = true;
  error: string = '';
  selectedCityId: number | null = null; 

  constructor(
    private villeService: VilleService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadCities();
  }

  loadCities() {
    this.loading = true;
    this.villeService.getAllCities().subscribe({
      next: (cities) => {
        this.cities = cities;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load cities';
        this.loading = false;
      }
    });
  }

  selectCity(city: Ville) {
    if (city.id) {
      this.selectedCityId = city.id;
    }
  }

  continueToHome() {
    if (!this.selectedCityId) return;
    const selectedCity = this.cities.find(city => city.id === this.selectedCityId);
    if (selectedCity && selectedCity.id) {
      this.authService.setCityId(selectedCity.id);
      this.router.navigate(['/']); // TODO: Update the navigation 
    }
  }
}