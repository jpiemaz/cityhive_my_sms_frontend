import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  standalone: true,
  selector: 'app-signup',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './signup.component.html',
})
export class SignupComponent {
  email = '';
  password = '';
  passwordConfirmation = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  signup() {
    if (!this.email.trim() || !this.password.trim()) return;
    if (this.password !== this.passwordConfirmation) {
      this.error = 'Passwords do not match';
      return;
    }

    this.auth
      .signup({
        email: this.email,
        password: this.password,
        password_confirmation: this.passwordConfirmation,
      })
      .subscribe({
        next: () => this.router.navigate(['/dashboard']),
        error: (err) => (this.error = err.error?.errors || 'Signup failed'),
      });
  }
}
