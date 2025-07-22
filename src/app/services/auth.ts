import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/user.model';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = '//jogando-a-vera-com-o-ong-plus.vercel.app/api/campanhas';
  private currentUser = signal<User | null>(null);

  constructor(private http: HttpClient) {
    // Carregar usuário do localStorage ao inicializar
    const user = localStorage.getItem('currentUser');
    if (user) {
      this.currentUser.set(JSON.parse(user));
    }
  }

  login(email: string, password: string): Observable<{ user: User, token: string }> {
    return this.http.post<{ user: User, token: string }>(`${this.apiUrl}/auth/login`, { email, password })
      .pipe(
        tap(response => {
          this.setCurrentUser(response.user, response.token);
        })
      );
  }

  register(userData: any): Observable<{ user: User, token: string }> {
    return this.http.post<{ user: User, token: string }>(`${this.apiUrl}/auth/register`, userData)
      .pipe(
        tap(response => {
          this.setCurrentUser(response.user, response.token);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.currentUser.set(null);
  }

  private setCurrentUser(user: User, token: string): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('token', token);
    this.currentUser.set(user);
  }

  getCurrentUser(): User | null {
    return this.currentUser();
  }

  isAuthenticated(): boolean {
    return !!this.currentUser();
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserType(): 'doador' | 'ong' | null {
    return this.currentUser()?.tipo || null;
  }
}
