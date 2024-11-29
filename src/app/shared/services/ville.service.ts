import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ville } from '../models/ville.model';
import { environment } from '../utils/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VilleService {
  private apiUrl = `${environment.apiUrl}/api/ville`;

  constructor(private http: HttpClient) { }

  getAllCities(): Observable<Ville[]> {
    return this.http.get<Ville[]>(this.apiUrl);
  }
}