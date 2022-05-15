import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../models/api';
import { Router } from '@angular/router';
import { JwtService } from './jwt.service';

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

  redirectTo(path: string) {
    this.jwt.redirectTo(path);
  }

  async isValid() {
    if (this.jwt.exist()) {
      const statusToken = await this.tokenValidation();
      return statusToken;
    } else {
      return { isValid: false }
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
          console.log(err);

          reject('Error with the login ');
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
      this.http.post<any>(this.api.toThisPath('/register'), user, this.observe).subscribe(
        (res) => {
          if (res.status == 200 && res.statusText == 'OK') {
            resolve(res.body);
            this.router.navigate(['/login']);
          } else {
            reject('Server Error');
          }
        },
        (err) => {
          console.log(err)
          reject('Error getting the rankings.');
        }
      );
    });
  }

  setProfilePicture(profile: object) {
    return new Promise((resolve, reject) => {
      const headers = this.createHeader(['Content-type'], ['application/x-www-form-urlencoded; charset=UTF-8'], true);
      this.http.post<HttpResponse<any>>(this.api.toThisPath('/profile/image'), profile, { headers: headers }).subscribe(
        (res) => {
          if (res) {
            resolve(res);
          } else {
            reject('Server Error');
          }
        },
        (err) => {
          reject('Error setting the profile picture.');
        }
      );
    });
  }

  getRankingUsersById(id: number) {
    return new Promise((resolve, reject) => {
      this.http.post<any>(this.api.toThisPath('/getRankingUsersById'), { idRanking: id }, this.observe).subscribe(
        (res) => {
          if (res.status == 200 && res.statusText == 'OK') {
            resolve(res.body);
          } else {
            reject('Server Error');
          }
        },
        (err) => {
          console.log(err)
          reject('Error getting the rankings.');
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
          reject('Error getting the rankings.');
        }
      );
    });
  }


  removeUserFromRanking(email: object) {
    return new Promise((resolve, reject) => {
      this.http.post<any>(this.api.toThisPath('/removeUserFromRanking'), email, this.observe).subscribe(
        (res) => {
          if (res.status == 200 && res.statusText == 'OK') {
            resolve(res.body);
          } else {
            reject('Server Error');
          }
        },
        (err) => {
          console.log(err)
          reject('Error getting the rankings.');
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
          reject('Error with the status.');
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
            console.log(err);
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
          reject('Error getting the avatar.');
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
          reject('Error getting the rankings.');
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
          reject('Error getting the rankings.');
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
          reject('Error getting the rankings.');
        }
      );
    });
  }

  getRankingData(data: any): any {
    return new Promise((resolve, reject) => {
      this.http.post<any>(this.api.toThisPath('/rankingData'), data, this.observe).subscribe(
        (res) => {
          if (res.status == 200 && res.statusText == 'OK') {
            resolve(res.body);
          } else {
            reject('Server Error');
          }
        },
        (err) => {
          console.log(err)
          reject('Error getting the rankings.');
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
            reject({ status: false });
          }
        },
        (err) => {
          console.log(err)
          reject('Error getting the profile.');
        }
      );
    });
  }

  emailExists(email: string) {
    return new Promise((resolve, reject) => {
      this.http.get<any>(this.api.toThisPath('/exist/email/' + email), this.observe).subscribe(
        (res) => {
          if (res.status == 200 && res.statusText == 'OK') {
            resolve({ status: true, body: res.body });
          } else {
            resolve({ status: false });
          }
        },
        (err) => {
          console.log(err)
          reject('Error checking email existence.');
        }
      );
    })
  }

  emailExistsRegister(data: string) {
    return new Promise((resolve, reject) => {
      this.http.post<any>(this.api.toThisPath('/validateEmail'), data, this.observe).subscribe(
        (res) => {
          if (res.status == 200 && res.statusText == 'OK') {
            resolve({ status: true, body: res.body });
          } else {
            resolve({ status: false });
          }
        },
        (err) => {
          console.log(err)
          reject('Error checking email existence.');
        }
      );
    })
  }



  addUsersToRanking(data: any) {
    return new Promise((resolve, reject) => {
      this.http.post<any>(this.api.toThisPath('/addUsersToRanking'), data, this.observe).subscribe(
        (res) => {
          if (res.status == 200 && res.statusText == 'OK') {
            resolve(res.body);
          } else {
            reject('Server Error');
          }
        },
        (err) => {
          console.log(err)
          reject('Error adding a ranking.');
        }
      );
    })
  }

  addRanking(data: any) {
    return new Promise((resolve, reject) => {
      this.http.post<any>(this.api.toThisPath('/ranking'), data, this.observe).subscribe(
        (res) => {
          if (res.status == 200 && res.statusText == 'OK') {
            resolve({ status: true });
          } else {
            reject('Server Error');
          }
        },
        (err) => {
          console.log(err)
          reject('Error adding a ranking.');
        }
      );
    })
  }

  updateProfile(profile: any) {
    return new Promise((resolve, reject) => {
      this.http.post<any>(this.api.toThisPath('/profile/data'), profile, this.observe).subscribe(
        (res) => {
          if (res.status == 200 && res.statusText == 'OK') {
            resolve({ status: true });
          } else {
            reject('Server Error');
          }
        },
        (err) => {
          console.log(err)
          reject('Error changing profile data.');
        }
      );
    })
  }

  updateData(data: any) {
    return new Promise((resolve, reject) => {
      this.http.post<any>(this.api.toThisPath('/updateData'), data, this.observe).subscribe(
        (res) => {
          if (res.status == 200 && res.statusText == 'OK') {
            resolve({ status: true });
          } else {
            reject('Server Error');
          }
        },
        (err) => {
          console.log(err)
          reject('Error changing profile data.');
        }
      );
    })
  }

  updateInsinia(data: any) {
    return new Promise((resolve, reject) => {
      this.http.post<any>(this.api.toThisPath('/updateInsinia'), data, this.observe).subscribe(
        (res) => {
          if (res.status == 200 && res.statusText == 'OK') {
            resolve({ status: true });
          } else {
            reject('Server Error');
          }
        },
        (err) => {
          console.log(err)
          reject('Error changing profile data.');
        }
      );
    })
  }

  getHistory() {
    return new Promise((resolve, reject) => {
      this.http.get<HttpResponse<any>>(this.api.toThisPath('/history'), this.observe).subscribe(
        (res) => {
          if (res.status == 200 && res.statusText == 'OK') {
            resolve(res.body);
          } else {
            reject('Server Error');
          }
        },
        (err) => {
          console.log(err)
          reject('Error getting the profile.');
        }
      );
    });
  }


  revertHistory(profile: any) {
    return new Promise((resolve, reject) => {
      this.http.post<any>(this.api.toThisPath('/revertHistory'), profile, this.observe).subscribe(
        (res) => {
          if (res.status == 200 && res.statusText == 'OK') {
            resolve({ status: true });
          } else {
            reject('Server Error');
          }
        },
        (err) => {
          console.log(err)
          reject('Error changing profile data.');
        }
      );
    })
  }

  deleteRanking(data: any) {
    return new Promise((resolve, reject) => {
      this.http.post<any>(this.api.toThisPath('/deleteRanking'), data, this.observe).subscribe(
        (res) => {
          if (res.status == 200 && res.statusText == 'OK') {
            resolve({ status: true });
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

  exitRanking(data: any) {
    return new Promise((resolve, reject) => {
      this.http.post<any>(this.api.toThisPath('/exitRanking'), data, this.observe).subscribe(
        (res) => {
          if (res.status == 200 && res.statusText == 'OK') {
            resolve({ status: true });
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

  renewJoinCode(data: any) {
    return new Promise((resolve, reject) => {
      this.http.post<any>(this.api.toThisPath('/renewJoinCode'), data, this.observe).subscribe(
        (res) => {
          if (res.status == 200 && res.statusText == 'OK') {
            resolve({ status: true });
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

  sendFile(data: any) {
    return new Promise((resolve, reject) => {
      this.http.post<any>(this.api.toThisPath('/sendFile'), data, this.observe).subscribe(
        (res) => {
          if (res.status == 200 && res.statusText == 'OK') {
            resolve({ status: true });
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