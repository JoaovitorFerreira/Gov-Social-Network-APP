import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  ChatMessage,
  Message,
  OnlineSystemMessage,
} from 'src/app/model/message';
import { Usuario } from '../../models/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class UserChatService {
  public message$: BehaviorSubject<string> = new BehaviorSubject('');
  constructor() {}

  public async sendMessage(userData: OnlineSystemMessage, msg: string) {
    let date = new Date();
    let lastMsg: ChatMessage = {
      content: msg,
      timestamp: date.toDateString(),
      userId: userData.requestUserId,
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
      _id: userData._id,
    };
    //await setDoc(doc(this.firestore, 'user-chats/' + userData.id), {
    //  ...userDataSimplified,
    //});
  }

  public userMessagesChat = (
    docMsgs: any
    //QuerySnapshot<DocumentData>
  ): Message[] => {
    if (docMsgs.empty) {
      return [];
    }
    /* const chats: Message[] = [];
    for (const doc of docMsgs.docs) {
      const dados = doc.data() as Message;
      chats.push(dados);
    }
    return chats;
    */
  };

  public getReponseUserChat = async (
    responseUsername: string
  ): Promise<Usuario> => {
    let usersCache: any[] =
      JSON.parse(sessionStorage.getItem('usersCache')) ?? [];
    const user: Usuario = null;
    return Promise.resolve(user as Usuario);
  };
}
