// src/app/services/projection.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../shared/utils/environments/environment';
import { Projection } from '../shared/models/projection.model';
import { Place } from '../shared/models/place.model';
import { Ticket } from '../shared/models/ticket.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectionService {
  private apiUrl = `${environment.apiUrl}/api/projection`;
  private ticketUrl = `${environment.apiUrl}/api/ticket`;
  private placeUrl = `${environment.apiUrl}/api/place`;


  constructor(private http: HttpClient) { }

  getProjectionsByCinema(cinemaId: number): Observable<Projection[]> {
    return this.http.get<Projection[]>(`${this.apiUrl}/cinema/${cinemaId}`);
  }

  getAvailablePlaces(projectionId: number): Observable<Place[]> {
    return this.http.get<Place[]>(`${this.apiUrl}/${projectionId}/places`);
  }
  getPlacesWithStatus(projectionId: number): Observable<Place[]> {
    return this.http.get<Place[]>(`${this.placeUrl}/projection/${projectionId}`);
  }
}