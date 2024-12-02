import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Ticket } from "../shared/models/ticket.model";
import { User, EmailRequest } from "../shared/models/user.model";
import { environment } from "../shared/utils/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/api/user`;
  private ticketUrl = `${environment.apiUrl}/api/ticket`;

  constructor(private http: HttpClient) { }
  getProfile(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/profile`);
  }

  updateProfile(userData: { email: string; name: string }): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/profile`, userData);
  }

  getUserTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${this.ticketUrl}/user`);
  }
}