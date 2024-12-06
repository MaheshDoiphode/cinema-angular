import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Salle } from '../shared/models/salle.model';
import { Place, PlaceConfiguration, PlaceConfigurationResponse } from '../shared/models/place.model';
import { environment } from '../shared/utils/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SalleService {
  private apiUrl = `${environment.apiUrl}/api/salle`;
  private placeUrl = `${environment.apiUrl}/api/place`;

  constructor(private http: HttpClient) { }

  getHallsByCinema(cinemaId: number): Observable<Salle[]> {
    return this.http.get<Salle[]>(`${environment.apiUrl}/api/cinema/${cinemaId}/salles`);
  }
  
  createSalle(salle: Salle): Observable<Salle> {
    return this.http.post<Salle>(this.apiUrl, salle);
  }

  updateSalle(id: number, salle: Salle): Observable<Salle> {
    return this.http.put<Salle>(`${this.apiUrl}/${id}`, salle);
  }

  deleteSalle(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getSallePlaces(id: number): Observable<Place[]> {
    return this.http.get<Place[]>(`${this.apiUrl}/${id}/places`);
  }

  configurePlaces(config: PlaceConfiguration): Observable<PlaceConfigurationResponse> {
    return this.http.post<PlaceConfigurationResponse>(`${this.placeUrl}/configure`, config);
  }
}