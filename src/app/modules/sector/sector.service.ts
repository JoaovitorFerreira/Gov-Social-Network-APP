import { Injectable, OnInit } from '@angular/core';
import { Usuario } from '../../core/models/usuario.model';

@Injectable()
export class SectorService implements OnInit {
  private usersCache: any = [];

  constructor() {}

  ngOnInit(): void {
    this.SetUsersCache();
  }

  public SetUsersCache() {
    if (this.usersCache.length == 0) {
      this.usersCache = JSON.parse(sessionStorage.getItem('usersCache'));
    }
  }
}
