import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { JwtHelperService } from '@auth0/angular-jwt';
import * as moment from 'moment';

import { map } from 'rxjs/operators';

const jwt = new JwtHelperService();

class DecodedToken {
  exp = 0;
  username = '';
}

@Injectable()
export class AuthService {
  private decodedToken;

  constructor(private http: HttpClient) {
    this.decodedToken =
      JSON.parse(localStorage.getItem('bwm_meta')) || new DecodedToken();
  }

  register(userData: any): Observable<any> {
    return this.http.post('api/v1/users/register', userData);
  }

  login(userData: any): Observable<any> {
    return this.http
      .post('api/v1/users/auth', userData)
      .pipe(map((token: string) => this.saveToken(token)));
  }

  logout() {
    localStorage.removeItem('bwm_auth');
    localStorage.removeItem('bwm_meta');

    this.decodedToken = new DecodedToken();
  }

  isAuthenticated(): boolean {
    return moment().isBefore(this.getExpiration());
  }

  getUsername() {
    return this.decodedToken.username;
  }

  getAuthToken(): string {
    return localStorage.getItem('bwm_auth');
  }

  private saveToken(token: string): string {
    this.decodedToken = jwt.decodeToken(token);

    localStorage.setItem('bwm_auth', token);
    localStorage.setItem('bwm_meta', JSON.stringify(this.decodedToken));

    return token;
  }

  private getExpiration() {
    return moment.unix(this.decodedToken.exp);
  }
}
