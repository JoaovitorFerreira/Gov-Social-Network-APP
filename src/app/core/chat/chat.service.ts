import { Injectable } from '@angular/core';
import {
  collection,
  Firestore,
  getDocs,
  query,
  where,
} from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { Message, OnlineSystemMessage } from 'src/app/model/message';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  public message$: BehaviorSubject<string> = new BehaviorSubject('');
  constructor(private firestore: Firestore) {}
  public user: Usuario = JSON.parse(sessionStorage.getItem('userData'));

  public getUserChats = async () => {
    let q = query(
      collection(this.firestore, 'user-chats'),
      where('usersId', 'array-contains-any', [this.user.id])
    );
    const querySnapshot = await getDocs(q);
    const docsArray = [];
    querySnapshot.forEach((docs) => {
      docsArray.push(docs.data());
    });
    return docsArray;
  };

  public initUserChat() {
    this.user = JSON.parse(sessionStorage.getItem('userData'));
    let userChats = [];
    return this.getUserChats()
      .then((doc) => {
        return (userChats = doc.map((userChat: Message) => {
          let treatedUserChat: OnlineSystemMessage = {
            ...userChat,
            responseUser: userChat.usersName.find((name) => {
              return name !== this.user.username;
            }),
            responseId: userChat.usersId.find((id) => {
              return id !== this.user.id;
            }),
            requestUser: this.user.username,
            requestId: this.user.id,
            lastMsg: userChat.lastMsg ?? {
              content: 'Não há ainda nenhuma mensagem a ser exibida',
              userId: '',
              userName: '',
              timestamp: userChat.createdAt,
            },
          };
          return treatedUserChat;
        }));
      })
      .finally(() => {
        const msgIds = userChats.map((userChat) => {
          return userChat.id;
        });
        sessionStorage.setItem('userMsgsId', JSON.stringify(msgIds));
        return userChats;
      });
  }
}
