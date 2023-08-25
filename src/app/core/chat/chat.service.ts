import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  Message,
  OnlineSystemMessage,
  UserChatPayload,
} from 'src/app/model/message';
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
    /*let q = query(
      collection(this.firestore, 'user-chats'),
      where('usersId', 'array-contains-any', [this.user.id])
    );
    onSnapshot(q, (chatsData) => {
      console.log(chatsData.docChanges);
      for (const documents of chatsData.docChanges()) {
        if (documents.type === 'added') {
          this.message$.next({
            tipo: 'added',
            data: documents.doc.data(),
          });
        } else if (documents.type === 'modified') {
          this.message$.next({
            tipo: 'modified',
            data: documents.doc.data(),
          });
        }
      }
    });
    const querySnapshot = await getDocs(q);
    const docsArray = [];
    querySnapshot.forEach((docs) => {
      docsArray.push(docs.data());
    });
    */
    return [];
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
