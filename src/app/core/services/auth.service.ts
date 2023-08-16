import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { MONGODB_DATABASE } from 'src/environments/environment.dev';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userId: string = null;
  private userJwt: string = null;
  private user: Usuario = null;
  public $user = new BehaviorSubject<Usuario>(this.user);

  constructor(private http: HttpClient) {}

  public get getUserId(): string {
    const user: Usuario = JSON.parse(sessionStorage.getItem('userData'));
    return this.userId === null ? user.id : this.userId;
  }

  public get getReqHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.userJwt}`,
    });
    return headers;
  }

  public get getUserJwt() {
    const jwt: string = JSON.parse(sessionStorage.getItem('access_token'));
    return this.userJwt === null ? jwt : this.userJwt;
  }

  public get getUser(): Usuario {
    return this.user === null
      ? JSON.parse(sessionStorage.getItem('userData'))
      : this.user;
  }

  public isUserLoggedIn(): boolean {
    const user: Usuario = JSON.parse(sessionStorage.getItem('userData'));
    const jwt: string = JSON.parse(sessionStorage.getItem('access_token'));
    const isLocal =
      this.user !== null && this.userId !== null && this.userJwt !== null;
    const notInSession = !(user && jwt);

    return isLocal ? true : !notInSession;
  }

  public async setUserInfo(userData: any) {
    this.user = userData.user;
    this.userId = userData.user.id;
    this.userJwt = userData.access_token;
    sessionStorage.setItem('userData', JSON.stringify(userData.user));
    sessionStorage.setItem(
      'access_token',
      JSON.stringify(userData.access_token)
    );
  }

  public async getUserData(userId: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.getUserJwt}`,
    });
    const result = this.http
      .get(`${MONGODB_DATABASE}perfil/user/${userId}`, { headers: headers })
      .pipe()
      .subscribe((result) => {
        sessionStorage.setItem('userData', JSON.stringify(result));
        return result;
      });
    return result;
  }

  public logout(): void {
    this.user = null;
    this.userJwt = null;
    this.userId = null;
    sessionStorage.removeItem('userData');
  }
}
