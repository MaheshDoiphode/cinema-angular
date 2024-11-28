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
  private loginSubscription?: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  async onSubmit() {
    if (this.loading) return;
    
    this.loading = true;
    this.errorMessage = '';

    this.loginSubscription = this.authService.login(this.loginData)
      .subscribe({
        next: (response) => {
          this.authService.setToken(response.jwtToken);
          if (this.rememberMe) {
            // Implement remember me functionality if needed
          }
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.errorMessage = error.error?.message || 'An error occurred during login';
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        }
      });
  }

  ngOnDestroy() {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }
}