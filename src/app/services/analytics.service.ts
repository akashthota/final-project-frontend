import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface ChartData {
  labels: string[];
  datasets: any[];
}

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getRevenueData(): Observable<ChartData> {
    return this.http.get<ChartData>(`${this.apiUrl}/api/analytics/revenue`, {
      headers: this.getHeaders()
    });
  }

  getTransactionTrends(): Observable<ChartData> {
    return this.http.get<ChartData>(`${this.apiUrl}/api/analytics/transactions`, {
      headers: this.getHeaders()
    });
  }
} 