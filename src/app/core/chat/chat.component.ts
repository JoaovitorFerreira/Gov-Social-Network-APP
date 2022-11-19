import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  ChatMessage,
  Message,
  OnlineSystemMessage,
} from 'src/app/model/message';
import { Usuario } from '../models/usuario.model';
import { ChatService } from './chat.service';

@Component({
  selector: 'pge-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent {
  public userChats: any[] = [];
  public messageList: string[] = [];
  public formGroup: FormGroup;
  public user: Usuario;
  public selectedUser: any;
  constructor(private chatService: ChatService, private fb: FormBuilder) {}

  ngOnInit() {
    this.initUserChat();
    this.formGroup = this.fb.group({
      search: '',
    });
  }

  public searchUser() {
    return true;
  }

  private initUserChat() {
    this.user = JSON.parse(sessionStorage.getItem('userData'));
    this.chatService
      .getUserChats()
      .then((doc) => {
        this.userChats = doc.map((userChat: Message) => {
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
              userName:'',
              timestamp: userChat.createdAt,
            },
          };
          return treatedUserChat;
        });
      })
      .finally(() => {
        const msgIds = this.userChats.map((userChat) => {
          return userChat.id;
        });
        sessionStorage.setItem('userMsgsId', JSON.stringify(msgIds));
      });
  }

  public openUserChat(userChat: any) {
    this.selectedUser = userChat;
  }
}
