import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/core/chat/chat.service';
import { Usuario } from 'src/app/core/models/usuario.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { MONGODB_DATABASE } from 'src/environments/environment.dev';

@Injectable()
export class UserDetailsService {
  constructor(
    private http: HttpClient,
    private chatService: ChatService,
    private authService: AuthService,
    private router: Router,
  ) {}

  public async getUsuario(uid: string): Promise<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.getUserJwt}`,
    });
    this.http
      .get(`${MONGODB_DATABASE}perfil/user/${uid}`, { headers: headers })
      .subscribe((result) => {
        if (result !== null) {
          sessionStorage.setItem('detailedUser', JSON.stringify(result));
          return result as Usuario;
        } else {
          return null;
        }
      });
    return JSON.parse(sessionStorage.getItem('detailedUser'));
  }

  public async saveUsuario(usuario: Usuario) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.getUserJwt}`,
    });
    return this.http
      .put(`${MONGODB_DATABASE}perfil/editar-perfil`, usuario, {
        headers: headers,
      })
      .subscribe((result: any) => {
        if (result as boolean) {
          sessionStorage.setItem('userData', JSON.stringify(usuario));
          return true;
        }
        return false;
      });
  }

  public async saveProfileImage(archive: {
    id: string;
    file: Blob;
    path: string;
  }) {
    const file: Blob = archive.file;
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = (e: any) => {
      const imgString = e.target.result as string;
      const user: Usuario = JSON.parse(sessionStorage.getItem('userData'));
      let newUser = { ...user, profilePicture: imgString };
      this.saveUsuario(newUser);
    };
  }

  public async createChat() {
    const resUser = JSON.parse(sessionStorage.getItem('detailedUser'));
    const reqUser = this.authService.getUser;
    const userChatPayload = {
      resUserId: resUser.id,
      reqUserId: reqUser.id,
      resUsername: resUser.username,
      reqUsername: reqUser.username,
    };
    return this.chatService.initUserChat(userChatPayload).then((result) => {
      if (result) {
        this.router.navigateByUrl('chat');
      }
    });
  }

  public checkIfHasSentMessage(userId: string) {
    let msgsIds = JSON.parse(sessionStorage.getItem('userMsgsId'));
    if (!msgsIds) {
     return false;
    }
    let hasSent: boolean[] = msgsIds.map((combinedUserId: string) => {
      return combinedUserId.includes(userId);
    });
    if (hasSent.find((msg) => msg === true)) {
      return true;
    } else {
      return false;
    }
  }
}
