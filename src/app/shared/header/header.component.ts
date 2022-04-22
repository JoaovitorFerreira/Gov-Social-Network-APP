import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { HeaderService } from './header.service';

@Component({
  selector: 'pge-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [HeaderService]
})
export class HeaderComponent implements OnInit {
  public username: string = 'Sr. Procurador';
  constructor(private authService: AuthService, private headerService: HeaderService) { }

  ngOnInit(): void {
    this.headerService.getUsuario(this.authService.getUserId).then(user => {
      this.username = user.username;
    }).catch(error => {
      console.log('error getting user --> ', error);
    });
  }

  public isNotInLoginPage(): boolean {
    return !location.href.includes('/login');
  }

}
