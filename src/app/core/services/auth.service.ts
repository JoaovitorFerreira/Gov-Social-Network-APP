import { Injectable } from "@angular/core";
import { User, sendPasswordResetEmail, signInWithEmailAndPassword, Auth, updatePassword } from '@angular/fire/auth';

@Injectable({providedIn: 'root'})
export class AuthService {
    private userId: string = null;
    private user: User = null;
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
      this.fireAuth.onAuthStateChanged((user) =>
        {
            if (user) {
                this.user = user;
                this.userId = user.uid;
            } else {
                this.user = null;
                this.userId = null;
            }
        },
        ((error) => {
            this.user = null;
            this.userId = null;
            console.log('user auth error --> ', error);
        })
      );
    }

    public isUserLoggedInAsync(): Promise<string> {
        return this.fireAuth.currentUser.getIdToken();
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