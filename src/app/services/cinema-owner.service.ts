import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cinema } from '../shared/models/cinema.model';
import { environment } from '../shared/utils/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CinemaOwnerService {
  private apiUrl = `${environment.apiUrl}/api/cinema`;

  constructor(private http: HttpClient) { }

  registerCinema(cinema: Cinema): Observable<Cinema> {
    return this.http.post<Cinema>(`${this.apiUrl}/register`, cinema);
  }

  updateCinema(id: number, cinema: Cinema): Observable<Cinema> {
    return this.http.put<Cinema>(`${this.apiUrl}/update/${id}`, cinema);
  }

  getOwnedCinemas(): Observable<Cinema[]> {
    return this.http.get<Cinema[]>(`${this.apiUrl}/owner`);
  }
}