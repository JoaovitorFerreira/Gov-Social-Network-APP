import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/core/models/usuario.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HeaderService {
  private http: HttpClient;
  public watcher: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  public dadosUsuario: Usuario = null;

  constructor() {
    this.dadosUsuario == JSON.parse(sessionStorage.getItem('userData'));
  }

  public async getUsuario(userId: string): Promise<Usuario> {
    if (this.dadosUsuario == null) {
      await this.http
        .get(`http://localhost:3000/perfil/user/${userId}`)
        .subscribe((result) => {
          this.dadosUsuario = result as Usuario;
        });
    }
    return this.dadosUsuario;
  }
}
