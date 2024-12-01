import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cinema } from '../shared/models/cinema.model';
import { environment } from '../shared/utils/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CinemaService {
  private apiUrl = `${environment.apiUrl}/api/cinema`;

  constructor(private http: HttpClient) { }

  getCinemasShowingFilm(villeId: number, filmId: number): Observable<Cinema[]> {
    return this.http.get<Cinema[]>(`${this.apiUrl}/ville/${villeId}/film/${filmId}`);
  }
}