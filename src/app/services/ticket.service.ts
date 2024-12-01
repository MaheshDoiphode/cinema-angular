import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../shared/utils/environments/environment';
import { Ticket, TicketBookingRequest } from '../shared/models/ticket.model';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private apiUrl = `${environment.apiUrl}/api/ticket`;

  constructor(private http: HttpClient) { }

  bookTickets(bookingRequest: TicketBookingRequest): Observable<Ticket[]> {
    return this.http.post<Ticket[]>(`${this.apiUrl}/book`, bookingRequest);
  }
}