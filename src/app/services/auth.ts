// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

import { User } from '../models/user.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;
  private jwtHelper = new JwtHelperService();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.currentUserSubject = new BehaviorSubject<User | null>(
      this.getUserFromToken()
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): Observable<User> {
    return this.http.post<any>(`${environment.apiUrl}/auth/login`, { email, password })
      .pipe(
        map(response => {
          if (response.token) {
            localStorage.setItem('token', response.token);
            const user = this.getUserFromToken();
            this.currentUserSubject.next(user);
            return user;
          }
          throw new Error('No token received');
        }),
        catchError(error => {
          return throwError(() => new Error('Login failed'));
        })
      );
  }

  register(userData: any): Observable<User> {
    return this.http.post<any>(`${environment.apiUrl}/auth/register`, userData)
      .pipe(
        map(response => {
          if (response.token) {
            localStorage.setItem('token', response.token);
            const user = this.getUserFromToken();
            this.currentUserSubject.next(user);
            return user;
          }
          throw new Error('No token received');
        }),
        catchError(error => {
          return throwError(() => new Error('Registration failed'));
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  getUserType(): string | null {
    const user = this.currentUserValue;
    return user ? user.type : null;
  }

  private getUserFromToken(): User | null {
    const token = localStorage.getItem('token');
    if (!token || this.jwtHelper.isTokenExpired(token)) {
      return null;
    }

    const decodedToken = this.jwtHelper.decodeToken(token);
    return {
      id: decodedToken.id,
      name: decodedToken.name,
      email: decodedToken.email,
      type: decodedToken.type
    };
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
