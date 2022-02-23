import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {API} from '../models/api';
import {JwtService} from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  public api: API;
  public response: string

  constructor(public http: HttpClient, private jwt: JwtService) {
    this.api = new API();
  }

  /**
   * 
   * @param user any
   */
  async login(user: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post<HttpResponse<any>>(this.api.toThisPath('/login'), user, {observe: 'response'}).subscribe(
        (resp) => {
          if (resp.status == 200 && resp.statusText == 'OK') {
            const token = resp.headers.get('Authorization')?.split('"')[1];
            this.jwt.setToken(token);
            resolve(token);
          } else {
            reject('Server Error');
          }
        },
        (err) => {
          reject({error: err});
        }
      );
    });
  }

  /**
   * Making a request with a register data.
   * @param user 
   */
  register(user: any): any {
    try {
      const headers = this.createHeader(['Content-type'], ['application/x-www-form-urlencoded; charset=UTF-8'], true);
      this.http.post(this.api.toThisPath('/register'), user, {headers: headers}).subscribe(
        (data) => console.log(data),
        (err) => console.log(err)
      );
    } catch (e) {
      console.log(e)
    }
  }

  /**
   * Checks status with the API.
   */
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

  /**
   * Makes a HTTP request to the API to upload an image.
   * @param data
   * @param options 
   */
  pictureUpload(data: FormData) {
    this.http.post<any>(this.api.toThisPath('/uploadAvatar'), data).subscribe(
      (data) => console.log(data),
      (err) => console.log(err)
    );
  }

  /**
   * Sets multiples headers with one method.
   * @param names 
   * @param values 
   * @param isHTTP 
   * @returns 
   */
  createHeader(names: string[], values: string[], isHTTP: boolean): any {
    let headers: any;
    if (isHTTP) {
      headers = new HttpHeaders();
    } else {
      headers = new Headers();
    }

    if (names.length === values.length) {
      names.forEach((name, index) => {
        headers.append(name, values[index])
      });
    } else {
      throw 'Not the same amount of names ' + names.length + ' values ' + values.length;
    }
    return headers;
  }

}
