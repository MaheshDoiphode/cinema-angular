import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../shared/utils/environments/environment';
import { EnhancedFilm } from '../shared/models/enhanced.file.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilmService {
  private apiUrl = `${environment.apiUrl}/api/film`;

  constructor(private http: HttpClient) { }

  getNowShowingFilms(): Observable<EnhancedFilm[]> {
    return this.http.get<EnhancedFilm[]>(`${this.apiUrl}`);
  }
  getFilmById(id: number): Observable<EnhancedFilm> {
    return this.http.get<EnhancedFilm>(`${this.apiUrl}/${id}`);
  }
}