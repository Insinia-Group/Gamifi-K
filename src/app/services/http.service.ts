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
   * Makes a request with the login data to get access.
   * @param user any
   */
  login(user: any): any {
    return new Promise((resolve, reject) => {
      this.http.post<HttpResponse<any>>(this.api.toThisPath('/login'), user, {observe: 'response'}).subscribe(
        (res) => {
          if (res.status == 200 && res.statusText == 'OK') {
            if (res.headers.get('Authorization')) {
              const token = res.headers.get('Authorization')?.split('"')[1];
              this.jwt.setToken(token);
              resolve(token);
            }
          } else {
            reject('Server Error');
          }
        },
        (err) => {
          reject('Error with the login');
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
  status(): any {
    return new Promise((resolve, reject) => {
      this.http.get<HttpResponse<any>>(this.api.toThisPath('/status'), {observe: 'response'}).subscribe(
        (res) => {
          if (res.status == 200 && res.statusText == 'OK') {
            resolve(res.body);
          } else {
            reject('Server Error');
          }
        },
        (err) => {
          reject('Error with the status.' + err);
        }
      );
    });
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
   * Sets multiples headers.
   * @param names 
   * @param values 
   * @param isHTTP 
   * @returns any (Headers | HttpHeader);
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


  /**
   * @idUser
   * 
   * 
   * 
   */

  getRankingByUser(idUser: FormData) {
    try {
      const headers = this.createHeader(['Content-type'], ['text/html; charset=UTF-8'], true);
      this.http.post<any>(this.api.toThisPath('/ranking'), idUser).subscribe(
        (data) => console.log(data),
        (err) => console.log(err)
      );
    } catch (e) {
      console.log(e)
    }
  }

}

// getRankingByUser(idUser: FormData) {
//   return new Promise((resolve, reject) => {
//     this.http.post<HttpResponse<any>>(this.api.toThisPath('/getRankingByUser'), idUser, {observe: 'response'}).subscribe(
//       (res) => {
//         console.log(res);
//         if (res.status == 200 && res.statusText == 'OK') {
//           resolve(res.body);
//         } else {
//           reject('Server Error');
//         }
//       },
//       (err) => {
//         reject('Error with the status.' + err);
//       }
//     );
//   });
// }