import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {API} from '../models/api';
import {Router} from '@angular/router';
import {JwtService} from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  public api: API;
  public response: string
  protected observe: object;

  constructor(public http: HttpClient, private jwt: JwtService, private router: Router) {
    this.api = new API();
    this.observe = {
      observe: 'response'
    };
  }

  async canContinue() {
    const url = '/login'
    if (!this.jwt.exist()) this.jwt.redirectTo(url);
    const statusToken = await this.tokenValidation();
    if (!statusToken) this.jwt.logout();
  }

  async canLogin() {
    const url = '/profile'
    if (this.jwt.exist()) {
      const statusToken = await this.tokenValidation();
      if (!statusToken) this.jwt.logout();
      this.jwt.redirectTo(url)
    }
  }

  /**
   * Makes a request with the login data to get access.
   * @param user any
   */
  login(user: any): any {
    return new Promise((resolve, reject) => {
      this.http.post<HttpResponse<any>>(this.api.toThisPath('/login'), user, this.observe).subscribe(
        (res) => {
          if (res.status == 200 && res.statusText == 'OK') {
            if (res.headers.get('Authorization')) {
              const token = res.headers.get('Authorization')?.split('"')[1];
              this.jwt.setToken(token);
              resolve(true);
            } else if (res.body && !res.body.authentication) {
              resolve(false)
            }
          } else {
            reject('Server Error');
          }
        },
        (err) => {
          reject('Error with the login ' + err);
        }
      );
    });
  }

  /**
   * Making a request with a register data.
   * @param user 
   */
  register(user: any): any {
    return new Promise((resolve, reject) => {
      this.http.post<any>(this.api.toThisPath('/getRankingById'), user, this.observe).subscribe(
        (res) => {
          if (res.status == 200 && res.statusText == 'OK') {
            resolve(res.body);
          } else {
            reject('Server Error');
          }
        },
        (err) => {
          console.log(err)
          reject('Error getting the rankings. ' + err);
        }
      );
    });
  }

  setProfilePicture(profile: object) {
    return new Promise((resolve, reject) => {
      const headers = this.createHeader(['Content-type'], ['application/x-www-form-urlencoded; charset=UTF-8'], true);
      this.http.post<HttpResponse<any>>(this.api.toThisPath('/profile/image'), profile, {headers: headers}).subscribe(
        (res) => {
          if (res) {
            console.log(res)
            resolve(res);
          } else {
            reject('Server Error');
          }
        },
        (err) => {
          reject('Error setting the profile picture.' + err);
        }
      );
    });
  }

  addRankingByCode(code: any): any {
    return new Promise((resolve, reject) => {
      this.http.post<any>(this.api.toThisPath('/addRankingByCode'), code, this.observe).subscribe(
        (res) => {
          if (res.status == 200 && res.statusText == 'OK') {
            resolve(res.body);
          } else {
            reject('Server Error');
          }
        },
        (err) => {
          console.log(err)
          reject('Error getting the rankings. ' + err);
        }
      );
    });
  }

  /**
   * Checks status with the API.
   */
  status(): any {
    return new Promise((resolve, reject) => {
      this.http.get<HttpResponse<any>>(this.api.toThisPath('/status'), this.observe).subscribe(
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

  tokenValidation(): any {
    if (this.jwt.exist()) {
      return new Promise((resolve, reject) => {
        this.http.get<HttpResponse<any>>(this.api.toThisPath('/tokenValidation'), this.observe).subscribe(
          (res) => {
            resolve(res.body);
          },
          (err) => {
            reject("Error con la validación del token");
            this.router.navigate(['/login']);
          }
        );
      });
    }
  }

  /**
   * Makes a HTTP request to the API to upload an image.
   * @param data
   * @param options 
   */
  pictureUpload(data: FormData) {
    return new Promise((resolve, reject) => {
      this.http.post<any>(this.api.toThisPath('/uploadAvatar'), data, this.observe).subscribe(
        (res) => {
          if (res.status == 200 && res.statusText == 'OK') {
            resolve(res.body);
          } else {
            reject('Server Error');
          }
        },
        (err) => {
          console.log(err)
          reject('Error getting the avatar. ' + err);
        }
      );
    });
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

  getRankings() {
    try {
      this.http.get(this.api.toThisPath('/rankings'), this.observe).subscribe(
        (data) => console.log(data),
        (err) => console.log(err)
      );
    } catch (e) {
      console.log(e)
    }
  }

  getRanking() {
    return new Promise((resolve, reject) => {
      this.http.get<HttpResponse<any>>(this.api.toThisPath('/rankings'), this.observe).subscribe(
        (res) => {
          if (res.status == 200 && res.statusText == 'OK') {
            resolve(res.body);
          } else {
            reject('Server Error');
          }
        },
        (err) => {
          reject('Error getting the rankings.' + err);
        }
      );
    });
  }

  getRankingModerator() {
    return new Promise((resolve, reject) => {
      this.http.get<HttpResponse<any>>(this.api.toThisPath('/rankingsOfModerator'), this.observe).subscribe(
        (res) => {
          if (res.status == 200 && res.statusText == 'OK') {
            resolve(res.body);
          } else {
            reject('Server Error');
          }
        },
        (err) => {
          console.log(err)
          reject('Error getting the rankings. ' + err);
        }
      );
    });
  }

  getRankingById(id: any): any {
    return new Promise((resolve, reject) => {
      this.http.post<any>(this.api.toThisPath('/getRankingById'), id, this.observe).subscribe(
        (res) => {
          if (res.status == 200 && res.statusText == 'OK') {
            resolve(res.body);
          } else {
            reject('Server Error');
          }
        },
        (err) => {
          console.log(err)
          reject('Error getting the rankings. ' + err);
        }
      );
    });
  }

  getRankingData() {
    return new Promise((resolve, reject) => {
      this.http.get<HttpResponse<any>>(this.api.toThisPath('/rankingData'), this.observe).subscribe(
        (res) => {
          if (res.status == 200 && res.statusText == 'OK') {
            resolve(res.body);
          } else {
            reject('Server Error');
          }
        },
        (err) => {
          console.log(err)
          reject('Error getting ranking data. ' + err);
        }
      );
    });
  }

  getProfile() {
    return new Promise((resolve, reject) => {
      this.http.get<HttpResponse<any>>(this.api.toThisPath('/profile'), this.observe).subscribe(
        (res) => {
          if (res.status == 200 && res.statusText == 'OK') {
            resolve(res.body);
          } else {
            reject('Server Error');
          }
        },
        (err) => {
          console.log(err)
          reject('Error getting the profile.' + err);
        }
      );
    });
  }

  addRanking(data: any) {
    return new Promise((resolve, reject) => {
      this.http.post<any>(this.api.toThisPath('/addRanking'), data, this.observe).subscribe(
        (res) => {
          if (res.status == 200 && res.statusText == 'OK') {
            resolve({status: true});
          } else {
            reject('Server Error');
          }
        },
        (err) => {
          console.log(err)
          reject('Error adding a ranking.' + err);
        }
      );
    })
  }

  updateProfile(profile: any) {
    return new Promise((resolve, reject) => {
      this.http.post<any>(this.api.toThisPath('/profile/data'), profile, this.observe).subscribe(
        (res) => {
          if (res.status == 200 && res.statusText == 'OK') {
            resolve({status: true});
          } else {
            reject('Server Error');
          }
        },
        (err) => {
          console.log(err)
          reject('Error changing profile data.' + err);
        }
      );
    })
  }

  updateData(data: any) {
    return new Promise((resolve, reject) => {
      this.http.post<any>(this.api.toThisPath('/updateData'), data, this.observe).subscribe(
        (res) => {
          if (res.status == 200 && res.statusText == 'OK') {
            resolve({status: true});
          } else {
            reject('Server Error');
          }
        },
        (err) => {
          console.log(err)
          reject('Error changing profile data.' + err);
        }
      );
    })
  }

  updateInsinia(data: any) {
    return new Promise((resolve, reject) => {
      this.http.post<any>(this.api.toThisPath('/updateInsinia'), data, this.observe).subscribe(
        (res) => {
          if (res.status == 200 && res.statusText == 'OK') {
            resolve({status: true});
          } else {
            reject('Server Error');
          }
        },
        (err) => {
          console.log(err)
          reject('Error changing profile data.' + err);
        }
      );
    })
  }

  getHistory(data: any) {
    return new Promise((resolve, reject) => {
      this.http.post<any>(this.api.toThisPath('/history'), data, this.observe).subscribe(
        (res) => {
          if (res.status == 200 && res.statusText == 'OK') {
            resolve({status: true});
          } else {
            reject('Server Error');
          }
        },
        (err) => {
          console.log(err)
          reject('Error changing profile data.' + err);
        }
      );
    })
  }

}