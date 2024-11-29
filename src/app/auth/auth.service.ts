import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { JwtRequest, JwtResponse } from '../shared/models/auth.model';
import { environment } from '../shared/utils/environments/environment';
import {User} from '../shared/models/user.model';
import {PasswordUpdateRequest} from '../shared/models/auth.model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'jwt_token';
  private readonly CITY_KEY = 'selected_city_id';
  private readonly USER_TYPE = 'user_type';
  private readonly API_URL = `${environment.apiUrl}/auth`;
  
  constructor(private http: HttpClient) {}

  register(userData: User): Observable<User> {
    return this.http.post<User>(`${this.API_URL}/create-user`, userData);
  }
  
  login(credentials: JwtRequest): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(`${this.API_URL}/login`, credentials);
  }

  updatePassword(data: PasswordUpdateRequest): Observable<string> {
    return this.http.post(`${this.API_URL}/update-password`, data, 
      { observe: 'response', responseType: 'text' })
      .pipe(
        map((response: HttpResponse<string>) => {
          if (response.status === 200) {
            return response.body || 'Password updated successfully';
          }
          throw new Error('Failed to update password');
        })
      );
  }

  setToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getUserType(): string | null {
    return localStorage.getItem(this.USER_TYPE);
  }
  setUserType(userType: string) {
    localStorage.setItem(this.USER_TYPE, userType);
  }

  setCityId(id: number) {
    localStorage.setItem(this.CITY_KEY, id.toString());
  }

  getCityId(): number | null {
    const id = localStorage.getItem(this.CITY_KEY);
    return id ? parseInt(id) : null;
  }

  removeCityId() {
    localStorage.removeItem(this.CITY_KEY);
  }

  removeToken() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_TYPE);
    localStorage.removeItem(this.CITY_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}