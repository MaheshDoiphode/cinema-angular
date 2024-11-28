import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtRequest } from '../../shared/models/auth.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginData: JwtRequest = {
    email: '',
    password: ''
  };
  rememberMe: boolean = false;
  errorMessage: string = '';
  loading: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  async onSubmit() {
    if (this.loading) return;
    
    this.loading = true;
    this.errorMessage = '';

    try {
      // Call your auth service login method here
      // const response = await this.authService.login(this.loginData).toPromise();
      // this.authService.setToken(response.jwtToken);
      
      // For now, just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to home page after successful login
      this.router.navigate(['/']);
    } catch (error: any) {
      this.errorMessage = error.message || 'An error occurred during login';
    } finally {
      this.loading = false;
    }
  }
}