import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, OngUser } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = 'http://localhost:3000/api'; // Ajuste para sua API

  constructor(private http: HttpClient) {}

  getUserProfile(userId: string): Observable<User | OngUser> {
    return this.http.get<User | OngUser>(`${this.apiUrl}/users/${userId}`);
  }

  updateUserProfile(userId: string, userData: Partial<User | OngUser>): Observable<User | OngUser> {
    return this.http.put<User | OngUser>(`${this.apiUrl}/users/${userId}`, userData);
  }

  uploadProfilePhoto(userId: string, photo: File): Observable<{url: string}> {
    const formData = new FormData();
    formData.append('photo', photo);
    return this.http.post<{url: string}>(`${this.apiUrl}/users/${userId}/photo`, formData);
  }
}
