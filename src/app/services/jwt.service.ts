import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class JwtService {


  constructor(public JwtHelperService: JwtHelperService) {
    
  }
  setToken  ( token:any ):void {
  localStorage.setItem('token',token)
  }
  
  getToken ():any {
    return localStorage.getItem('token');
  }

  remove ():void
  {
    localStorage.removeItem( 'token' );
  }

  exist ():boolean
  {
    if ( this.getToken() )
    {
      return true;
    } else
    {
      return false;
    }
  }
}


