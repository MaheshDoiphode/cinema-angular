import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../shared/utils/environments/environment';
import { Place, PlaceConfiguration, PlaceConfigurationResponse } from '../shared/models/place.model';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {
  private apiUrl = `${environment.apiUrl}/api/place`;

  constructor(private http: HttpClient) { }

  // Get all places for a specific salle
  getPlacesBySalle(salleId: number): Observable<Place[]> {
    return this.http.get<Place[]>(`${this.apiUrl}/salle/${salleId}`);
  }

  // Configure places for a salle
  configurePlaces(config: PlaceConfiguration): Observable<PlaceConfigurationResponse> {
    return this.http.post<PlaceConfigurationResponse>(`${this.apiUrl}/configure`, config);
  }

  // Get places with booking status for a projection
  getPlacesForProjection(projectionId: number): Observable<Place[]> {
    return this.http.get<Place[]>(`${this.apiUrl}/projection/${projectionId}`);
  }
}