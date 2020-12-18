import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalStorageService {

  private _check;

  public get check() {
    return this._check;
  }
  public set check(value) {
    this._check = value;
  }
  constructor() { }

}
