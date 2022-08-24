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
    localStorage.setItem(key, JSON.stringify(value));
  }

  public getToken() {
    return JSON.parse(localStorage.getItem(Constants.TOKEN)) || null;
  }

  public setAccessToken(accessToken) {
    this.setItem(Constants.ACCESS_TOKEN, accessToken);
  }

  public updateTokens(token: any) {
    this.setItem(Constants.TOKEN, token);
    this.setItem(Constants.ACCESS_TOKEN, token.accessToken);
  }

  public getUser() {
    return JSON.parse(localStorage.getItem(Constants.TOKEN))?.user || null;
  }

  public clearLocalStorage() {
    localStorage.clear();
  }
}
