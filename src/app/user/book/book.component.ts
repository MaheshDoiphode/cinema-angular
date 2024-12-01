import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectionService } from '../../services/projection.service';
import { TicketService } from '../../services/ticket.service';
import { Projection } from '../../shared/models/projection.model';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { AuthService } from '../../auth/auth.service';
import { Place } from '../../shared/models/place.model';
import { TicketBookingRequest, TicketBookingResponse } from '../../shared/models/ticket.model';
import { forkJoin } from 'rxjs';
import { PaymentConfirmationComponent } from '../../shared/components/payment-confirmation/payment-confirmation.component';
import { PaymentService } from '../../services/payment.service';
@Component({
  selector: 'app-book',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, PaymentConfirmationComponent],
  templateUrl: './book.component.html'
})
export class BookComponent implements OnInit {
  filmId: number | null = null;
  cinemaId: number | null = null;
  projections: Projection[] = [];
  selectedProjection: Projection | null = null;
  availablePlaces: Place[] = [];
  selectedSeats: Place[] = [];
  loading: boolean = true;
  error: string = '';
  bookingInProgress: boolean = false;
  bookedSeats: Set<number> = new Set();
  showPaymentModal = false;
  bookingResponse: TicketBookingResponse | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectionService: ProjectionService,
    private ticketService: TicketService,
    private paymentService: PaymentService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.filmId = Number(this.route.snapshot.paramMap.get('filmId'));
    this.cinemaId = Number(this.route.snapshot.paramMap.get('cinemaId'));

    if (!this.filmId || !this.cinemaId) {
      this.error = 'Invalid parameters';
      this.loading = false;
      return;
    }

    this.loadProjections();
  }

  loadProjections() {
    if (!this.filmId || !this.cinemaId) return;

    this.loading = true;
    this.projectionService.getProjectionsByCinema(this.cinemaId).subscribe({
      next: (projections) => {
        this.projections = projections.filter(p => p.filmId === this.filmId);
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load show times';
        this.loading = false;
      }
    });
  }

  selectProjection(projection: Projection) {
    this.selectedProjection = projection;
    this.loadAvailablePlaces(projection.id!);
  }

  loadAvailablePlaces(projectionId: number) {
    this.loading = true;
    this.selectedSeats = []; // Reset selected seats

    this.projectionService.getPlacesWithStatus(projectionId).subscribe({
      next: (places) => {
        this.availablePlaces = places;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load seats. Please try again.';
        this.loading = false;
      }
    });
  }

  isSeatAvailable(place: Place): boolean {
    return !place.isBooked;
  }

  selectSeat(place: Place) {
    if (!this.isSeatAvailable(place)) return;

    const index = this.selectedSeats.findIndex(seat => seat.id === place.id);
    if (index > -1) {
      this.selectedSeats.splice(index, 1);
    } else {
      this.selectedSeats.push(place);
    }
  }

  isSeatSelected(place: Place): boolean {
    return this.selectedSeats.some(seat => seat.id === place.id);
  }

  getTotalPrice(): number {
    return this.selectedSeats.length * (this.selectedProjection?.prix || 0);
  }
  async bookTickets() {
    if (!this.selectedProjection || this.selectedSeats.length === 0) return;

    this.bookingInProgress = true;
    this.error = '';

    const bookingRequest: TicketBookingRequest = {
      projectionId: this.selectedProjection.id!,
      placeIds: this.selectedSeats.map(seat => seat.id!),
      nomClient: this.authService.getUserName() || 'Customer'
    };

    this.ticketService.bookTickets(bookingRequest).subscribe({
      next: (response) => {
        this.bookingResponse = response;
        this.showPaymentModal = true;
        this.bookingInProgress = false;
      },
      error: (error) => {
        if (error.status === 400) {
          this.error = 'Some seats are already booked. Please try different seats.';
        } else {
          this.error = 'Failed to book tickets. Please try again.';
        }
        this.bookingInProgress = false;
      }
    });
  }
  handlePaymentConfirm() {
    if (!this.bookingResponse) return;
    
    this.paymentService.processPayment(this.bookingResponse.transactionId).subscribe({
      next: (payment) => {
        // Store tickets in local storage for immediate access in tickets page
        localStorage.setItem('latest_tickets', JSON.stringify(this.bookingResponse?.tickets));
        this.router.navigate(['/tickets']);
      },
      error: (error) => {
        this.error = 'Payment processing failed. Please try again.';
        this.showPaymentModal = false;
      }
    });
  }

  handlePaymentCancel() {
    this.showPaymentModal = false;
    this.bookingResponse = null;
  }

}