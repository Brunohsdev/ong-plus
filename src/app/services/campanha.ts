import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { ModelCampanha } from '../models/campanha.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {
  constructor(private http: HttpClient) {}

  getCampaigns(): Observable<ModelCampanha[]> {
    return this.http.get<ModelCampanha[]>(`${environment.apiUrl}/campaigns`);
  }

  getFeaturedCampaigns(): Observable<ModelCampanha[]> {
    return this.http.get<ModelCampanha[]>(`${environment.apiUrl}/campaigns/featured`);
  }

  getCampaignById(id: string): Observable<ModelCampanha> {
    return this.http.get<ModelCampanha>(`${environment.apiUrl}/campaigns/${id}`);
  }

  createCampaign(campaignData: FormData): Observable<ModelCampanha> {
    return this.http.post<ModelCampanha>(`${environment.apiUrl}/campaigns`, campaignData);
  }

  updateCampaign(id: string, campaignData: FormData): Observable<ModelCampanha> {
    return this.http.put<ModelCampanha>(`${environment.apiUrl}/campaigns/${id}`, campaignData);
  }

  deleteCampaign(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/campaigns/${id}`);
  }
}
