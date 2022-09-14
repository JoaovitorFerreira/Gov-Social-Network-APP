import { Component, OnInit } from '@angular/core';
import {UserDetails} from './model/user-details';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'LinkedIn';
  userDetails: UserDetails;
  redirectUrl: string;

  constructor() {

  }


  ngOnInit(): void {

  }
}
