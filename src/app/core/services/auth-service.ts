import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

export interface AuthResponse {
  message: string;
  token: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
}

export interface EnteredData {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private readonly API_URL = 'http://localhost:3000/api/auth';

  public currUser = signal<{ id: number; email: string } | null>(this.getInitialUser());

  private getInitialUser() {
    const token = localStorage.getItem('token');
    if (token) return { id: 0, email: 'user@example.com' };
    return null;
  }

  public register(userData: any): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.API_URL}/register`, userData)
      .pipe(tap((res) => this.setSession(res)));
  }

  public login(enteredData: EnteredData): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.API_URL}/login`, enteredData)
      .pipe(tap((res) => this.setSession(res)));
  }

  public logout(): void {
    localStorage.removeItem('token');
    this.currUser.set(null);
    this.router.navigate(['/login']);
  }

  private setSession(authResult: AuthResponse): void {
    localStorage.setItem('token', authResult.token);
    this.currUser.set({
      id: authResult.user.id,
      email: authResult.user.email,
    });
  }

  public isLoggedIn(): boolean {
    return !!this.currUser();
  }
}
