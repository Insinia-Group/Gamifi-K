import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

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
   * Removes the token from the localStorage.
   */
  remove(): void {
    localStorage.removeItem('token');
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
}


