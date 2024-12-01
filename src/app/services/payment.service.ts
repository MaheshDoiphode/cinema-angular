import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../shared/utils/environments/environment';
import { Payment } from '../shared/models/payment.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = `${environment.apiUrl}/api/payment`;

  constructor(private http: HttpClient) { }

  processPayment(transactionId: string): Observable<Payment> {
    return this.http.post<Payment>(`${this.apiUrl}/process?transactionId=${transactionId}`, {});
  }
}