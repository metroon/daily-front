import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {
  constructor() {}

  public getItem(key) {
    return sessionStorage.getItem(key);
  }

  public setItem(key, value) {
    sessionStorage.setItem(key, value);
  }
}
