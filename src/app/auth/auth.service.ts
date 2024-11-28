import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtRequest, JwtResponse } from '../shared/models/auth.model';
import { environment } from '../shared/utils/environments/environment';
import {User} from '../shared/models/user.model';
import {PasswordUpdateRequest} from '../shared/models/auth.model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'jwt_token';
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

  removeToken() {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}