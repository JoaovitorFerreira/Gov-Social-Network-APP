import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): Promise<boolean> {
    return this.authService.isUserLoggedInAsync()
      .then((value) => {
          if (!value) {
            return true;
          } else {
            this.router.navigateByUrl('/usuario');
            return false;
          }
        });
  }
}