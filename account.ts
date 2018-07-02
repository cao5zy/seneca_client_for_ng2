import { Injectable } from '@angular/core';

@Injectable()
export class AccountService {
  project: string = "";
  constructor(
    private userName: string = "",
    private token: string = ""){}

  reset() {
    this.set();
  }

  getName():string {
    return this.userName;
  }

  getToken():string {
    return this.token;
  }

  set(userName: string = "", token: string = ""){
    this.userName = token && token.length != 0 ? userName : "";
    this.token = typeof token == 'undefined' ? "": token;
  }

  hasToken(): boolean {
    return this.token && this.token.length != 0;
  }

}