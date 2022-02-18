import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor(public JwtHelperService: JwtHelperService) {
    
  }
}
