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
    if (!this.getToken()) return false;
    return true;
  }

  redirectTo(path: string) {
    if (!path) throw 'You must provide a path parameter';
    if (typeof (path) !== 'string') throw 'Parameter give is not a string ' + typeof (path);
    if (path.charAt(0) !== '/') path = '/' + path;
    if (this.exist()) this.router.navigate([path]);
  }

  logout() {
    if (this.exist()) localStorage.removeItem('token');
    this.redirectTo('/login')
  }
}


