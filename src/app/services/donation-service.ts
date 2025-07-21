import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Donation } from '../models/donation.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DonationService {
  constructor(private http: HttpClient) {}

  getDonations(): Observable<Donation[]> {
    return this.http.get<Donation[]>(`${environment.apiUrl}/donations`);
  }

  createDonation(donation: Donation): Observable<Donation> {
    return this.http.post<Donation>(`${environment.apiUrl}/donations`, donation);
  }
}
