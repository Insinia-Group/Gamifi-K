import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { API } from '../models/api';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  public api: API;
  public response: string

  constructor(public http: HttpClient, public jwtHelper: JwtHelperService) {
    this.api = new API();
  }
  /**
   * 
   * @param user any
   */
  login ( user: any ): any{
    console.log( user );
    try {
      this.http.post(this.api.toThisPath('/login'), user).subscribe(
        (data) => console.log(data),
        (err) => console.log(err)
      );
     
    } catch {
      console.log('Error')
    }
  }
  register(user: any): any {
    try {
      this.http.post(this.api.toThisPath('/register'), JSON.stringify(user)).subscribe(
        (data) => console.log(data),
        (err) => console.log(err)
      );
    } catch(e) {
      console.log(e)
    }
  }
  status() {
    try {
      this.http.get(this.api.toThisPath('/status')).subscribe(
        (data) => console.log(data),
        (err) => console.log(err)
      );
    } catch {
      console.log('Error')
    }
  }
}
