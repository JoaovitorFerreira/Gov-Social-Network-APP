import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  ChatMessage,
  Message,
  OnlineSystemMessage,
} from 'src/app/model/message';
import {
  Firestore,
  collection,
  DocumentData,
  getDocs,
  QuerySnapshot,
  where,
  query,
  setDoc,
  doc,
  Timestamp,
} from '@angular/fire/firestore';
import { Usuario } from '../../models/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class UserChatService {
  public message$: BehaviorSubject<string> = new BehaviorSubject('');
  constructor(private firestore: Firestore) {}

  public async sendMessage(userData: OnlineSystemMessage, msg: string) {
    let date = new Date();
    let lastMsg: ChatMessage = {
      content: msg,
      timestamp: Timestamp.fromDate(date),
      userId: userData.requestId,
      userName: userData.requestUser,
    };
    let newChat: ChatMessage[] = userData.chat ?? [];
    let userDataSimplified: Message = {
      id: userData.id,
      createdAt: userData.createdAt,
      usersId: userData.usersId,
      usersName: userData.usersName,
      chat: newChat,
      lastMsg: lastMsg,
    };
    await setDoc(doc(this.firestore, 'user-chats/' + userData.id), {
      ...userDataSimplified,
    });
  }

  public userMessagesChat = (
    docMsgs: QuerySnapshot<DocumentData>
  ): Message[] => {
    if (docMsgs.empty) {
      return [];
    }
    const chats: Message[] = [];
    for (const doc of docMsgs.docs) {
      const dados = doc.data() as Message;
      chats.push(dados);
    }
    return chats;
  };

  public getReponseUserChat = async (
    responseUsername: string
  ): Promise<Usuario> => {
    let usersCache: any[] =
      JSON.parse(sessionStorage.getItem('usersCache')) ?? [];
    if (usersCache == undefined || usersCache.length == 0) {
      let q = query(
        collection(this.firestore, 'usuarios'),
        where('username', '==', responseUsername)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((docs) => {
        usersCache.push(docs.data());
      });
    }
    return usersCache.find((user) => {
      return user.username == responseUsername;
    });
  };
}
