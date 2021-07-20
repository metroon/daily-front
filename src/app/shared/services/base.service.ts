import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  private baseUrl = 'assets/data'

  constructor(private http: HttpClient) { }

  get(url: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${url}`);
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
