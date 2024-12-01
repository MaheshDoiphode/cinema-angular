import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { Ticket } from '../../shared/models/ticket.model';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.css'
})
export class TicketsComponent implements OnInit {
  tickets: Ticket[] = [];
  loading = true;
  error = '';

  ngOnInit() {
    // Get tickets from local storage that were just booked
    const latestTickets = localStorage.getItem('latest_tickets');
    if (latestTickets) {
      this.tickets = JSON.parse(latestTickets);
      localStorage.removeItem('latest_tickets'); // Clear after retrieving
    }
    this.loading = false;
  }
}