export type DateFilterType = 'today' | 'week' | 'month' | 'all';
export type StatusFilterType = 'upcoming' | 'past' | 'all';
const DATE_FILTERS: DateFilterType[] = ['today', 'week', 'month', 'all'];
const STATUS_FILTERS: StatusFilterType[] = ['upcoming', 'past', 'all'];

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../shared/models/user.model';
import { Ticket } from '../../shared/models/ticket.model';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, FooterComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;
  activeTab: string = 'profile';
  user: User | null = null;
  tickets: Ticket[] = [];
  loading = true;
  error = '';
  editMode = false;
  updatedUser: User | null = null;
  imagePreview: string | null = null;
  selectedDate: string = '';
  filteredTickets: Ticket[] = [];
  dateFilter: DateFilterType = 'all';
  ticketStatus: StatusFilterType = 'all';
  readonly dateFilters = DATE_FILTERS;
  readonly statusFilters = STATUS_FILTERS;
  isSpecificDateActive = false;


  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) { }
  setDateFilter(filter: DateFilterType) {
    this.dateFilter = filter;
    // Reset specific date when choosing other filters
    if (filter !== 'all') {
      this.selectedDate = '';
      this.isSpecificDateActive = false;
    }
    this.filterTickets();
  }

  onSpecificDateChange(event: Event) {
    const date = (event.target as HTMLInputElement).value;
    if (date) {
      // Reset other filters when specific date is selected
      this.dateFilter = 'all';
      this.isSpecificDateActive = true;
    } else {
      this.isSpecificDateActive = false;
    }
    this.filterTickets();
  }
  setStatusFilter(status: StatusFilterType) {
    this.ticketStatus = status;
    this.filterTickets();
  }
  ngOnInit() {
    this.loadUserData();
    this.filteredTickets = this.tickets;
  }
  filterTickets() {
    let filtered = [...this.tickets];

    // First apply date filter
    if (this.dateFilter !== 'all') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      switch (this.dateFilter) {
        case 'today':
          filtered = filtered.filter(ticket =>
            new Date(ticket.projectionDate!).toDateString() === today.toDateString()
          );
          break;
        case 'week':
          const weekAhead = new Date(today);
          weekAhead.setDate(weekAhead.getDate() + 7);
          filtered = filtered.filter(ticket => {
            const date = new Date(ticket.projectionDate!);
            return date >= today && date <= weekAhead;
          });
          break;
        case 'month':
          const monthAhead = new Date(today);
          monthAhead.setMonth(monthAhead.getMonth() + 1);
          filtered = filtered.filter(ticket => {
            const date = new Date(ticket.projectionDate!);
            return date >= today && date <= monthAhead;
          });
          break;
      }
    }

    // Then apply status filter
    if (this.ticketStatus !== 'all') {
      const now = new Date();
      filtered = filtered.filter(ticket => {
        const showtime = new Date(ticket.seanceTime!);
        return this.ticketStatus === 'upcoming' ?
          showtime > now : showtime < now;
      });
    }

    // Finally apply specific date filter if selected
    if (this.selectedDate) {
      filtered = filtered.filter(ticket =>
        new Date(ticket.projectionDate!).toDateString() === new Date(this.selectedDate).toDateString()
      );
    }

    this.filteredTickets = filtered;
  }

  loadUserData() {
    this.loading = true;
    this.userService.getProfile().subscribe({
      next: (user) => {
        this.user = user;
        this.updatedUser = { ...user };
        this.loadUserTickets();
      },
      error: (error) => {
        this.error = 'Failed to load profile. Please try again.';
        this.loading = false;
        if (error.status === 401) {
          this.authService.removeToken();
          this.router.navigate(['/auth/login']);
        }
      }
    });
  }
  cancelEdit() {
    this.editMode = false;
    this.updatedUser = { ...this.user! };
    this.imagePreview = null;
  }
  loadUserTickets() {
    this.userService.getUserTickets().subscribe({
      next: (tickets) => {
        this.tickets = tickets;
        this.filteredTickets = tickets;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load tickets';
        this.loading = false;
      }
    });
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
    if (!this.editMode) {
      this.updatedUser = { ...this.user! };
      this.imagePreview = null;
    }
  }

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (this.updatedUser && e.target?.result) {
          // Store full data URL for preview
          this.imagePreview = e.target.result as string;
          // Store base64 without prefix for API
          const base64String = (e.target.result as string).split(',')[1];
          this.updatedUser.profile_pic = base64String;
        }
      };
      reader.readAsDataURL(file);
    }
  }


  onProfileImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/default-avatar.png';
  }

  updateProfile() {
    if (!this.updatedUser) return;

    const updateData = {
      email: this.updatedUser.email,
      name: this.updatedUser.name,
      profile_pic: this.updatedUser.profile_pic
    };

    this.loading = true;
    this.userService.updateProfile(updateData).subscribe({
      next: (updatedUser) => {
        this.user = updatedUser;
        this.editMode = false;
        this.loading = false;
        this.imagePreview = null;
        if (this.authService.getUserName() !== updatedUser.name) {
          this.authService.setUserName(updatedUser.name);
        }
      },
      error: (error) => {
        this.error = 'Failed to update profile';
        this.loading = false;
      }
    });
  }
}