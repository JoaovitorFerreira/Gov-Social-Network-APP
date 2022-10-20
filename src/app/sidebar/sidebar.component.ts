import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../core/services/auth.service';
import { HeaderService } from '../header/header.service';

@Component({
  selector: 'pge-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
  public openMenu: boolean;
  private subject = new Subject();
  constructor(private headerService: HeaderService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.watchMenuStatus();
  }

  ngOnDestroy(): void {
    this.subject.next(null);
    this.subject.complete();
  }

  private watchMenuStatus() {
    this.headerService.watcher.pipe(takeUntil(this.subject)).subscribe(status => {
      this.openMenu = status;
    });
  }

  public goTo(path: string) {
    this.router.navigate([path]);
  }

  public logout() {
    this.openMenu = false;
    this.authService.logout().then(() => {
      sessionStorage.removeItem('userData')
      this.router.navigateByUrl('login');
    });
  }

}