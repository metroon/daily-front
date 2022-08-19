import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  private BASE_URL = environment.baseUrl;

  constructor(private http: HttpClient) {}

  get(url: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/${url}`);
  }

  post(url: string, body: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}/${url}`, body);
  }

  put(url: string, body: any): Observable<any> {
    return this.http.put(`${this.BASE_URL}/${url}`, body);
  }

  patch(url: string, body: any): Observable<any> {
    return this.http.patch(`${this.BASE_URL}/${url}`, body);
  }

  delete(url: string): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/${url}`);
  }
}
