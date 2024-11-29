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
  success: boolean = false;
  successMessage: string = '';
  private registerSubscription?: Subscription;
  previewImage: string | null = null;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  onFileChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      if (file.size > 5242880) {
        this.errorMessage = 'File size should not exceed 5MB';
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewImage = e.target.result;
        this.userData.profile_pic = e.target.result.split(',')[1];
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage() {
    this.previewImage = null;
    this.userData.profile_pic = undefined;
  }

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
    this.successMessage = '';

    this.registerSubscription = this.authService.register(this.userData)
      .subscribe({
        next: (response) => {
          this.success = true;
          this.successMessage = 'You are a registered customer now.';
          this.loading = false;
        },
        error: (error) => {
          this.success = false;
          this.errorMessage = error.error || error.message || 'An error occurred during Registration';
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