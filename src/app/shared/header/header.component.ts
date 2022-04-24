import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { HeaderService } from './header.service';

@Component({
  selector: 'pge-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [HeaderService]
})
export class HeaderComponent implements OnInit {
  public username: string = 'Sr.(a) Procurador(a)';
  private subject = new Subject();
  constructor(private authService: AuthService, private headerService: HeaderService, private router: Router) { }

  ngOnInit(): void {
    this.authService.$user.pipe(takeUntil(this.subject)).subscribe(userExists => {
      if (!userExists) { this.username = 'Sr.(a) Procurador(a)'; return; }
      this.headerService.getUsuario(this.authService.getUserId).then(user => {
        if (!user) { return; }
        this.username = user.username;
      }).catch(error => {
        console.log('error getting user --> ', error);
      });
    })
  }

  ngOnDestroy(): void {
    this.subject.next(null);
    this.subject.complete();
  }

  public isNotInLoginPage(): boolean {
    return !location.href.includes('/login');
  }

  public logout() {
    this.authService.logout().then(() => {
      this.router.navigateByUrl('/login');
    });
  }

}
