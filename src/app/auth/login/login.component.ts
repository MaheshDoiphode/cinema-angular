import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtRequest } from '../../shared/models/auth.model';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnDestroy {
  loginData: JwtRequest = {
    email: '',
    password: ''
  };
  rememberMe: boolean = false;
  errorMessage: string = '';
  loading: boolean = false;
  success: boolean = false;
  successMessage: string = '';
  private loginSubscription?: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  async onSubmit() {
    if (this.loading) return;
    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.loginSubscription = this.authService.login(this.loginData)
      .subscribe({
        next: (response) => {
          this.authService.setToken(response.jwtToken);
          this.authService.setUserType(response.role);
          this.authService.setUserName(response.username);
          
          // First time login needs city selection
          if (!this.authService.getCityId()) {
            this.router.navigate(['/choose-city']);
          } else {
            // Has city, redirect based on role
            this.redirectBasedOnRole();
          }
        },
        error: (error) => {
          this.errorMessage = error.error?.message || 'An error occurred during login';
          this.loading = false;
        }
      });
  }

  private redirectBasedOnRole() {
    const userType = this.authService.getUserType();
    switch (userType) {
      case 'ADMIN':
        this.router.navigate(['/admin']);
        break;
      case 'CINEMA_OWNER':
        this.router.navigate(['/cinema-owner-dash']);
        break;
      default:
        this.router.navigate(['/home']);
    }
  }

  ngOnDestroy() {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }
}