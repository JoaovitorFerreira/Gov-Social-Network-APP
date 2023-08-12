import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/core/models/usuario.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MONGODB_DATABASE } from 'src/environments/environment.dev';

@Injectable()
export class HeaderService {
  private http: HttpClient;
  public watcher: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  public dadosUsuario: Usuario = null;

  constructor() {
    this.dadosUsuario = JSON.parse(sessionStorage.getItem('userData')) 
    
  }
}
