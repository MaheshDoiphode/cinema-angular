import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../../shared/models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnDestroy {
  userData: User = {
    email: '',
    name: '',
    password_hash: '',
    role: 'USER',
    profile_pic: undefined
  };
  
  confirmPassword: string = '';
  errorMessage: string = '';
  loading: boolean = false;
  termsAccepted: boolean = false;
  private registerSubscription?: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  async onSubmit() {
    if (this.loading) return;
    
    if (!this.termsAccepted) {
      this.errorMessage = 'Please accept the terms and conditions';
      return;
    }

    if (this.userData.password_hash !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }
    
    this.loading = true;
    this.errorMessage = '';

    this.registerSubscription = this.authService.register(this.userData)
      .subscribe({
        next: (response) => {
          // Optionally store some user info
          this.router.navigate(['/auth/login']);
        },
        error: (error) => {
          this.errorMessage = error.error?.message || 'An error occurred during registration';
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        }
      });
  }

  ngOnDestroy() {
    if (this.registerSubscription) {
      this.registerSubscription.unsubscribe();
    }
  }
}