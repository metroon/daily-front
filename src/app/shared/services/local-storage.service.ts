import { Injectable } from '@angular/core';
import { Constants } from '../utils/constants';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  public getItem(key) {
    return JSON.parse(localStorage.getItem(key)) || null;
  }

  public setItem(key, value) {
    localStorage.setItem(key, value);
  }

  public getToken() {
    return JSON.parse(localStorage.getItem(Constants.TOKEN)) || null;
  }

  public setAccessToken(accessToken) {
    this.setItem(Constants.ACCESS_TOKEN, JSON.stringify(accessToken));
  }

  public updateTokens(token: any) {
    this.setItem(Constants.TOKEN, JSON.stringify(token));
    this.setItem(Constants.ACCESS_TOKEN, JSON.stringify(token.access_token));
  }

  public clearLocalStorage() {
    localStorage.clear();
  }
}
