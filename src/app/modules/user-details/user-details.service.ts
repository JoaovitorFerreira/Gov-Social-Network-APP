import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChatService } from 'src/app/core/chat/chat.service';
import { Usuario } from 'src/app/core/models/usuario.model';
import { MONGODB_DATABASE } from 'src/environments/environment.dev';

@Injectable()
export class UserDetailsService {
  constructor(private http: HttpClient, private chatService: ChatService) {}

  public async getUsuario(uid: string): Promise<any> {
    const user = await this.http
      .get(`${MONGODB_DATABASE}perfil/user/${uid}`)
      .subscribe((result) => {
        if (result !== null) {
          sessionStorage.setItem('detailedUser', JSON.stringify(result));
          return result as Usuario;
        } else {
          return null;
        }
      });
    return user;
  }

  public async saveUsuario(usuario: Usuario) {
    return this.http
      .put(`${MONGODB_DATABASE}editar-perfil`, usuario)
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

    /*const reference = ref(this.storage, `${path}/${id}`);
    const task = uploadBytes(reference, file);
    try {
      const res = await task;
      if (res.metadata.size > 0) {
        return res.ref.fullPath;
      }
    } catch (err) {
      console.log('error on upload file --> ', err);
      return null;
    }
    return null;
    */
  }

  public checkIfHasSentMessage(userId: string) {
    let msgsIds = JSON.parse(sessionStorage.getItem('userMsgsId'));
    if (msgsIds.length == 0) {
      msgsIds = this.chatService.initUserChat().then((messages) => {
        return messages.map((msg) => {
          return msg.id;
        });
      });
    }
    let hasSent: boolean[] = msgsIds.map((combinedUserId: string) => {
      console.log(combinedUserId);
      return combinedUserId.includes(userId);
    });
    if (hasSent.find((msg) => msg === true)) {
      return true;
    } else {
      return false;
    }
  }
}
