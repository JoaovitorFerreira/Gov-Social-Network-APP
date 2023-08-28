import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Message, UserChatPayload } from 'src/app/model/message';
import { Usuario } from '../models/usuario.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { MONGODB_DATABASE } from 'src/environments/environment.dev';

interface MessageChat {
  tipo: string;
  data: any;
}

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  public message$: BehaviorSubject<MessageChat> = new BehaviorSubject(null);
  constructor(private authService: AuthService, private http: HttpClient) {}
  public user: Usuario = JSON.parse(sessionStorage.getItem('userData'));

  public getContinuosChat = async () => {
    const body = this.user.id;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.getUserJwt}`,
    });
    const result = this.http
      .get(`${MONGODB_DATABASE}mensagens/chats/${body}`, { headers: headers })
      .pipe()
      .subscribe((result) => {
        return result as Message[];
      });
    return result;
  };

  public async initUserChat(userChatPayload: UserChatPayload) {
    const body = userChatPayload;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.getUserJwt}`,
    });
    return this.http
      .post(`${MONGODB_DATABASE}mensagens`, body, { headers: headers })
      .pipe()
      .subscribe((result) => {
        return result;
      });
  }
}
