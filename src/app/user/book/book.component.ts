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

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent],
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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectionService: ProjectionService,
    private ticketService: TicketService,
    private authService: AuthService
  ) {}

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
    this.projectionService.getAvailablePlaces(projectionId).subscribe({
      next: (places) => {
        this.availablePlaces = places;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load available seats';
        this.loading = false;
      }
    });
  }

  selectSeat(place: Place) {
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

    try {
      const bookingPromises = this.selectedSeats.map(seat => {
        const bookingRequest = {
          projectionId: this.selectedProjection!.id!,
          placeId: seat.id!,
          nomClient: 'Customer' // You might want to get this from user profile
        };
        return this.ticketService.bookTicket(bookingRequest).toPromise();
      });

      await Promise.all(bookingPromises);
      this.router.navigate(['/tickets']); // Navigate to tickets page after booking
    } catch (error) {
      this.error = 'Failed to book tickets. Please try again.';
    } finally {
      this.bookingInProgress = false;
    }
  }
}