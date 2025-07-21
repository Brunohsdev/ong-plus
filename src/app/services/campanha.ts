import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ModelCampanha } from '../models/campanha.models';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {
  // Coloque a URL fixa da API aqui:
  private apiUrl = 'http://localhost:3000/api/campanhas'; // ou sua URL real

  constructor(private http: HttpClient) {}

  getCampaigns(): Observable<ModelCampanha[]> {
    return this.http.get<ModelCampanha[]>(this.apiUrl);
  }
  getCampaignById(id: string): Observable<ModelCampanha> {
    return this.http.get<ModelCampanha>(`${this.apiUrl}/campanhas/${id}`);
  }

  createCampaign(campaign: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/campaigns`, campaign);
  }
  
  updateCampaign(id: string, campaign: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/campanhas/${id}`, campaign);
  }
  

  deleteCampaign(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/campanhas/${id}`);
  }
}
