import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  private baseUrl = 'assets/data';

  constructor(private http: HttpClient) {}

  get(url: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${url}.json`);
  }

  post(url: string, body: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/${url}`, body);
  }

  put(url: string, body: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${url}`, body);
  }

  patch(url: string, body: any): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${url}`, body);
  }

  delete(url: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${url}`);
  }
}
