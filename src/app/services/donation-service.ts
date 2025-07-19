import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Donation } from '../models/donation.model';

@Injectable({
  providedIn: 'root'
})
export class DonationService {
  constructor(private http: HttpClient) {}

  makeDonation(campaignId: string, amount: number, message?: string, anonymous?: boolean): Observable<Donation> {
    return this.http.post<Donation>(`${environment.apiUrl}/donations`, {
      campaignId,
      amount,
      message,
      anonymous
    });
  }

  getUserDonations(): Observable<Donation[]> {
    return this.http.get<Donation[]>(`${environment.apiUrl}/donations/my`);
  }

  getCampaignDonations(campaignId: string): Observable<Donation[]> {
    return this.http.get<Donation[]>(`${environment.apiUrl}/donations/campaign/${campaignId}`);
  }
}
