import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { PasswordUpdateRequest } from '../../shared/models/auth.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent implements OnDestroy {
  loading: boolean = false;
  errorMessage: string = '';
  success: boolean = false;
  successMessage: string = '';
  passwordData: PasswordUpdateRequest = {
    email: '',
    oldPassword: '',
    newPassword: ''
  };
  confirmPassword: string = '';
  private resetSubscription?: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  async onSubmit() {
    if (this.loading) return;

    if (this.passwordData.newPassword !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      this.success = false;
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.resetSubscription = this.authService.updatePassword(this.passwordData)
      .subscribe({
        next: (response) => {
          this.success = true;
          this.successMessage = 'Your password has been updated successfully.';
          this.loading = false;
        },
        error: (error) => {
          this.success = false;
          this.errorMessage = error.error || error.message || 'An error occurred during password reset';
          this.loading = false;
        }
      });
  }

  ngOnDestroy() {
    if (this.resetSubscription) {
      this.resetSubscription.unsubscribe();
    }
  }
}