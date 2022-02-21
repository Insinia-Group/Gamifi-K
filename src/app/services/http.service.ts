import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { API } from '../models/api';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  public api: API;
  public response: string

  constructor(public http: HttpClient, private jwt:JwtService) {
    this.api = new API();
  }
  /**
   * 
   * @param user any
   */
  
  login ( user: any ): any{
    try
    {
      const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: 'response' as 'response'
      };

      this.http.post<HttpResponse<any>>( this.api.toThisPath( '/login' ), user,{observe:'response'} ).subscribe(
        (resp) => this.jwt.setToken((resp.headers.get('Authorization')?.split('"')[1])),
        (err) => console.log(err)
      );

     
    } catch {
      console.log('Error')
    }
  }
  register(user: any): any {
    try {
      const headers = new HttpHeaders();
      headers.append( 'Content-type', 'application/x-www-form-urlencoded; charset=UTF-8' );
      this.http.post( this.api.toThisPath( '/register' ), user, {headers:headers}).subscribe(
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
  pictureUpload (data:FormData,options:object)
  {
    console.log( data );
    this.http.post<any>( this.api.toThisPath( '/uploadAvatar' ),data,options ).subscribe(
      ( data ) => console.log( data ),
      ( err ) => console.log( err )
    );
    
  }

}
