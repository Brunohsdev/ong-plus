import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Donation } from '../models/donation.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DonationService {
  private apiUrl = 'http://localhost:3000/api/donations'; // ou sua URL real
  constructor(private http: HttpClient) {}

  getDonations(): Observable<Donation[]> {
    return this.http.get<Donation[]>(`${this.apiUrl}/donations`);
  }

  createDonation(donation: Donation): Observable<Donation> {
    return this.http.post<Donation>(`${this.apiUrl}/donations`, donation);
  }
}
