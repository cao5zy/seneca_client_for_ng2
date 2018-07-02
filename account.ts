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
    this.userName = userName;
    this.token = token;
  }


}