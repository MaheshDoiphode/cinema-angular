import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Cinema } from '../shared/models/cinema.model';
import { Film } from '../shared/models/film.model';
import { environment } from '../shared/utils/environments/environment';
import { EnhancedFilm } from '../shared/models/enhanced.file.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  verifyCinema(cinemaId: number): Observable<Cinema> {
    return this.http.post<Cinema>(`${this.apiUrl}/api/cinema/${cinemaId}/verify`, {});
  }

  createFilm(film: Film): Observable<EnhancedFilm> {
    return this.http.post<EnhancedFilm>(`${this.apiUrl}/api/film`, film);
  }

  deleteFilm(filmId: number): Observable<boolean> {
    return this.http.delete(`${this.apiUrl}/api/film/${filmId}`, { observe: 'response' })
      .pipe(
        map((response: HttpResponse<any>) => response.status === 200)
      );
  }

  getPendingCinemas(): Observable<Cinema[]> {
    return this.http.get<Cinema[]>(`${this.apiUrl}/api/cinema`);
  }
  getAllFilms(): Observable<EnhancedFilm[]> {
    return this.http.get<EnhancedFilm[]>(`${this.apiUrl}/api/film`);
  }
}