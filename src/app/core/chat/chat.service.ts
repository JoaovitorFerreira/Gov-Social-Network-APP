import { Injectable } from '@angular/core';
import {
  collection,
  doc,
  Firestore,
  getDocs,
  onSnapshot,
  query,
  where,
} from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { Message, OnlineSystemMessage } from 'src/app/model/message';
import { Usuario } from '../models/usuario.model';

interface MessageChat {
  tipo: string;
  data: any;
}

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  public message$: BehaviorSubject<MessageChat> = new BehaviorSubject(null);
  constructor(private firestore: Firestore) {}
  public user: Usuario = JSON.parse(sessionStorage.getItem('userData'));

  public getContinuosChat = async () => {
    let q = query(
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
    return docsArray;
  };

  public async initUserChat() {
    this.user = JSON.parse(sessionStorage.getItem('userData'));
    let userChats = [];
    let q = query(
      collection(this.firestore, 'user-chats'),
      where('usersId', 'array-contains-any', [this.user.id])
    );
    return getDocs(q)
      .then((doc) => {
        return (userChats = doc.docs.map((userChat) => {
          const userChatData: Message = userChat.data() as Message;
          let treatedUserChat: OnlineSystemMessage = {
            ...userChatData,
            responseUser: userChatData.usersName.find((name) => {
              return name !== this.user.username;
            }),
            responseId: userChatData.usersId.find((id) => {
              return id !== this.user.id;
            }),
            requestUser: this.user.username,
            requestId: this.user.id,
            lastMsg: userChatData.lastMsg ?? {
              content: 'Não há ainda nenhuma mensagem a ser exibida',
              userId: '',
              userName: '',
              timestamp: userChatData.createdAt,
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
