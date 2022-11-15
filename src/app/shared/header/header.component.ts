import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { HeaderService } from './header.service';

@Component({
  selector: 'pge-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public username: string = 'Procurador(a)';
  private subject = new Subject();
  private menu: boolean = false;
  constructor(
    private authService: AuthService,
    private headerService: HeaderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.$user
      .pipe(takeUntil(this.subject))
      .subscribe((userExists) => {
        this.headerService.getUsuario(this.authService.getUserId).then(user => {
          if (!user) { return; }
          this.username = user.username;
        }).catch(error => {
          if (!userExists) {
            this.username = 'Procurador(a)';
            return;
          }
          console.log('error getting user --> ', error);
        });
      });
  }

  ngOnDestroy(): void {
    this.subject.next(null);
    this.subject.complete();
  }

  public isNotInLoginPage(): boolean {
    return !location.href.includes('/login');
  }

  public getFirstName(userName: string) {
    return userName.split(' ')[0]
  }

  public openMenu() {
    this.menu = !this.menu;
    this.headerService.watcher.next(this.menu);
  }
}