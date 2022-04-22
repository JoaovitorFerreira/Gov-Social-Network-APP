import { Injectable } from "@angular/core";
import { User, sendPasswordResetEmail, signInWithEmailAndPassword, Auth, updatePassword } from '@angular/fire/auth';
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userId: string = null;
  private user: User = null;
  public $user = new BehaviorSubject<User>(this.user);
  public get getUserId(): string {
    return this.userId;
  }
  public get getUser(): User {
    return this.user;
  }

  constructor(private fireAuth: Auth) {
    this.userLoggedStatusTracker();
  }

  public userLoggedStatusTracker() {
    this.fireAuth.onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
        this.userId = user.uid;
        this.$user.next(user);
      } else {
        this.user = null;
        this.userId = null;
        this.$user.next(null);
      }
    },
      ((error) => {
        this.user = null;
        this.userId = null;
        this.$user.next(null);
        console.log('user auth error --> ', error);
      })
    );
  }

  public isUserLoggedInAsync(): Promise<string> {
    return this.fireAuth.currentUser ? this.fireAuth.currentUser.getIdToken() : Promise.resolve(null);
  }

  public isUserLoggedIn(): boolean {
    return (this.user !== null && this.userId !== null);
  }

  public changePassword(password: string): Promise<boolean> {
    return updatePassword(this.user, password).then(() => true).catch(() => false);
  }

  public login(email: string, password: string): Promise<boolean> {
    return signInWithEmailAndPassword(this.fireAuth, email, password)
      .then(value => {
        this.user = value.user;
        this.userId = this.user.uid;
        this.$user.next(value.user);
        return true;
      }).catch(err => {
        console.log('error logging in ----> ', err);
        return false;
      });
  }

  public emailResetPassword(email: string): Promise<boolean> {
    return sendPasswordResetEmail(this.fireAuth, email).then(() => true);
  }

  public logout(): Promise<void> {
    return this.fireAuth.signOut();
  }
}