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
    this.username = this.authService.getUser
      ? this.authService.getUser.username
      : 'Procurador(a)';
  }

  ngOnDestroy(): void {
    this.subject.next(null);
    this.subject.complete();
  }

  public isNotInLoginPage(): boolean {
    return !location.href.includes('/login');
  }

  public getFirstName(userName: string) {
    return userName.split(' ')[0];
  }

  public openMenu() {
    this.menu = !this.menu;
    this.headerService.watcher.next(this.menu);
  }
}
