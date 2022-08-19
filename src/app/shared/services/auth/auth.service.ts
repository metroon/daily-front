import { BaseService } from './../base.service';
import { Injectable } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public showLoader: boolean = false;

  constructor(
    private http: HttpClient,
    private baseService: BaseService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  public login(email, password) {
    let loginModel = { email, password };
    return this.baseService.post('authenticate', loginModel).pipe(
      map((response) => {
        const authenticatedModel = response;
        this.localStorageService.updateTokens(authenticatedModel);
        return response;
      })
    );
  }

  // Remover e utilizr a função login()
  public loginMock(email, password) {
    return this.http.get('assets/data/authenticate.json').pipe(
      map((response) => {
        const authenticatedModel = response;
        this.localStorageService.updateTokens(authenticatedModel);
        return response;
      })
    );
  }

  public requestChangePassword(email) {
    return this.baseService.post(`request-change-password/${email}`, {});
  }

  public confirmChangePassword(newPassword) {
    return this.baseService.post(`confirm-change-password`, newPassword);
  }

  public logout() {
    this.localStorageService.clearLocalStorage();
    this.router.navigateByUrl('/login');
  }

  public refreshToken() {
    let token = this.localStorageService.getToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${
        token && token.refresh_token ? token.refresh_token : ''
      }`,
    });

    return this.http
      .get(`${environment.baseUrl}/v1/refresh-token?email=${token.email}`, {
        headers,
      })
      .pipe(
        map((response) => {
          const authenticatedModel = response;
          this.updateTokens(token, authenticatedModel);
          return response;
        })
      );
  }

  private updateTokens(token, authenticatedModel) {
    token.access_token = authenticatedModel.access_token;
    token.accessTokenExpiration = authenticatedModel.accessTokenExpiration;
    token.refresh_token = authenticatedModel.refresh_token;
    token.refreshTokenExpiration = authenticatedModel.refreshTokenExpiration;
    this.localStorageService.updateTokens(token);
  }

  public isTokenExpired(tokenExpirationDate: Date): boolean {
    const now = new Date();
    const expiration = new Date(tokenExpirationDate);
    return now > expiration;
  }
}
