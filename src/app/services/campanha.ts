// campaign.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { environment } from '../../environments/environment';
import { ModelCampanha } from '../models/campanha.models';

@Injectable({
  providedIn: 'root'
})
export class CampanhaService {
  constructor(private http: HttpClient) {}

  // getCampaigns(page = 1, limit = 10, filters?: any): Observable<{ campaigns: ModelCampanha[]; total: number }> {
  //   let params = new HttpParams()
  //     .set('page', page.toString())
  //     .set('limit', limit.toString());

  //   if (filters) {
  //     Object.keys(filters).forEach(key => {
  //       if (filters[key]) {
  //         params = params.set(key, filters[key]);
  //       }
  //     });
  //   }

  //   return this.http.get<{ campaigns: ModelCampanha[]; total: number }>(
  //     `${environment.apiUrl}/campaigns`,
  //     { params }
  //   );
  // }

  // getPublicCampaigns(category?: string): Observable<ModelCampanha[]> {
  //   let params = new HttpParams();
  //   if (category) {
  //     params = params.set('category', category);
  //   }
  //   return this.http.get<ModelCampanha[]>(
  //     `${environment.apiUrl}/campaigns/public`,
  //     { params }
  //   );
  // }

  // getFeaturedCampaigns(): Observable<ModelCampanha[]> {
  //   return this.http.get<ModelCampanha[]>(
  //     `${environment.apiUrl}/campaigns/featured`
  //   );
  // }

  // getCampaignById(id: string): Observable<ModelCampanha></ModelCampanha> {
  //   return this.http.get<ModelCampanha>(
  //     `${environment.apiUrl}/campaigns/${id}`
  //   );
  // }

  // createCampaign(campaignData: FormData): Observable<ModelCampanha> {
  //   return this.http.post<ModelCampanha>(
  //     `${environment.apiUrl}/campaigns`,
  //     campaignData
  //   );
  // }

  // updateCampaign(id: string, campaignData: FormData): Observable<ModelCampanha> {
  //   return this.http.put<ModelCampanha>(
  //     `${environment.apiUrl}/campaigns/${id}`,
  //     campaignData
  //   );
  // }

  // deleteCampaign(id: string): Observable<any> {
  //   return this.http.delete(
  //     `${environment.apiUrl}/campaigns/${id}`
  //   );
  // }
}
