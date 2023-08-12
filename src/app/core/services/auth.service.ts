import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, catchError, take, tap } from 'rxjs';
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

  public async login(email: string, password: string) {
    const body = { email: email, password: password };
    const result = this.http
      .post(`${MONGODB_DATABASE}auth/login`, body)
      .pipe()
      .subscribe((result: any) => {
        this.user = result.user;
        this.userId = result.user.id;
        this.userJwt = result.access_token;
        sessionStorage.setItem('userData', JSON.stringify(result.user));
        sessionStorage.setItem(
          'access_token',
          JSON.stringify(result.access_token)
        );
        return result;
      });
    console.log(result);
    return result;
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
