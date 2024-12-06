// src/app/services/projection.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../shared/utils/environments/environment';
import { Projection } from '../shared/models/projection.model';
import { Place } from '../shared/models/place.model';
import { Ticket } from '../shared/models/ticket.model';
import { Seance } from '../shared/models/seance.model';
@Injectable({
  providedIn: 'root'
})
export class ProjectionService {
  private apiUrl = `${environment.apiUrl}/api/projection`;
  private ticketUrl = `${environment.apiUrl}/api/ticket`;
  private placeUrl = `${environment.apiUrl}/api/place`;
  private seanceUrl = `${environment.apiUrl}/api/seance`;

  constructor(private http: HttpClient) { }

  getAvailablePlaces(projectionId: number): Observable<Place[]> {
    return this.http.get<Place[]>(`${this.apiUrl}/${projectionId}/places`);
  }
  getPlacesWithStatus(projectionId: number): Observable<Place[]> {
    return this.http.get<Place[]>(`${this.placeUrl}/projection/${projectionId}`);
  }
  getProjectionsByCinema(cinemaId: number): Observable<Projection[]> {
    return this.http.get<Projection[]>(`${this.apiUrl}/cinema/${cinemaId}`);
  }

  createProjection(projection: Projection): Observable<Projection> {
    return this.http.post<Projection>(this.apiUrl, projection);
  }

  updateProjection(id: number, projection: Projection): Observable<Projection> {
    return this.http.put<Projection>(`${this.apiUrl}/${id}`, projection);
  }

  deleteProjection(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getSeances(): Observable<Seance[]> {
    return this.http.get<Seance[]>(this.seanceUrl);
  }

  createSeance(seance: { heureDebut: string }): Observable<Seance> {
    return this.http.post<Seance>(this.seanceUrl, seance);
  }
}