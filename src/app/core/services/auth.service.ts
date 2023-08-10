import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { User } from 'src/app/model/user';
import { Usuario } from '../models/usuario.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http: HttpClient;
  private userId: string = null;
  private userJwt: string = null;
  private user: User = null;
  public $user = new BehaviorSubject<User>(this.user);
  constructor() {}

  public get getUserId(): string {
    return this.userId;
  }

  public get getUser(): User {
    return this.user;
  }

  public isUserLoggedIn(): boolean {
    return this.user !== null && this.userId !== null && this.userJwt !== null;
  }

  public changePassword(userToRecover: string) {
    const body = JSON.stringify({ userToRecover: userToRecover });
    return this.http
      .post(`http://localhost:3000/auth/login`, body)
      .subscribe((result: any) => {
        return result;
      });
  }

  public async login(email: string, password: string) {
    const body = JSON.stringify({ email, password });
    return this.http
      .post(`http://localhost:3000/auth/login`, body)
      .pipe(tap((result: any) => console.log(result)));
  }

  public logout(): void {
    this.user = null;
    this.userJwt = null;
    this.userId = null;
    sessionStorage.removeItem('userData');
  }
}
