import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor(private router: Router) { }

  /**
   * Saves the token in the localStorage.
   * @param token 
   */
  setToken(token: any): void {
    localStorage.setItem('token', token)
  }

  /**
   * Return the token saved in localStorage.
   * @returns String
   */
  getToken(): any {
    return localStorage.getItem('token');
  }

  /**
   * Checks if the token exists.
   * @returns Boolean
   */
  exist(): boolean {
    if (this.getToken()) {
      return true;
    } else {
      return false;
    }
  }

  redirectTo(path: string) {
    if (path.charAt(0) !== '/') path = '/' + path;
    if (this.exist()) {
      this.router.navigate([path]);
    }
  }

  removeLocalToken() {
    localStorage.removeItem('token');
  }
}


