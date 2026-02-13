import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../../core/services/auth-service';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-register',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  private router = inject(Router);
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);

  public isLoading = signal<boolean>(false);
  public errorMessage = signal<string | null>(null);
  public hidePassword = signal(true);

  registerForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  public getForm() {
    return this.registerForm.controls;
  }

  public togglePassword(event: MouseEvent) {
    event.preventDefault();
    this.hidePassword.update((value) => !value);
  }

  public onSubmit() {
    if (this.registerForm.invalid) return;
    this.isLoading.set(true);
    this.errorMessage.set(null);

    const userData = this.registerForm.getRawValue();

    this.authService.register(userData).subscribe({
      next: (response) => {
        console.log('registr success', response);
        this.router.navigate(['/']);
      },

      error: (error) => {
        console.error('registr error', error);
        this.errorMessage.set(error.message || 'register error');
        this.isLoading.set(false);
      },

      complete: () => this.isLoading.set(false),
    });
  }
}
