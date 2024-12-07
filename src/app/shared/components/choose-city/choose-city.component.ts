import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../../auth/auth.service";
import { Ville } from "../../models/ville.model";
import { VilleService } from "../../../services/ville.service";

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
      localStorage.setItem('selected_city_name', selectedCity.name);
      
      const userType = this.authService.getUserType();
      switch (userType) {
        case 'ADMIN':
          this.router.navigate(['/admin']);
          break;
        case 'CINEMA_OWNER':
          this.router.navigate(['/cinema-owner-dash']);
          break;
        default:
          // For regular users, handle pending film navigation
          const pendingFilmId = sessionStorage.getItem('pendingFilmId');
          if (pendingFilmId) {
            sessionStorage.removeItem('pendingFilmId');
            this.router.navigate(['/select-cinema', pendingFilmId]);
          } else {
            this.router.navigate(['/home']);
          }
      }
    }
  }
}