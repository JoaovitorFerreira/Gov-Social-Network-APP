import { Component, Input } from '@angular/core';
import { UserChatService } from './user-chat.service';
import { Usuario } from 'src/app/core/models/usuario.model';
import { ChatMessage, OnlineSystemMessage } from 'src/app/model/message';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Socket, io } from 'socket.io-client';
import { WEBSOCKET_CONNECTION_URL } from 'src/environments/environment.dev';

@Component({
  selector: 'user-chat',
  templateUrl: './user-chat.component.html',
  styleUrls: ['./user-chat.component.scss'],
})
export class UserChatComponent {
  messageList: ChatMessage[];
  usuario: Usuario;
  private socket: Socket;
  responseUser: Usuario;
  _userChat: OnlineSystemMessage;
  public formGroup: UntypedFormGroup;

  @Input() set userChat(userChat: OnlineSystemMessage) {
    this._userChat = userChat;
    this.messageList = this._userChat.chat;
  }

  constructor(
    private fb: UntypedFormBuilder
  ) {
    this.usuario = JSON.parse(sessionStorage.getItem('userData'));
  }

  ngOnInit() {
    this.formGroup = this.fb.group({
      message: [null, Validators.required],
    });
    this.wsConnect();
    this.connectUserChat();
    this.receiveMessage();
  }

  private wsConnect() {
    this.socket = io(`${WEBSOCKET_CONNECTION_URL}message-ws`, {
      transports: ['websocket'],
    });
  }

  private connectUserChat() {
    if (this.socket) {
      this.socket.emit('chat', {
        msgId: this._userChat.msgId,
        msgToSent: {} as ChatMessage,
        signal: true,
      });
    } else {
      this.wsConnect();
      this.connectUserChat();
    }
  }

  receiveMessage() {
    return this.socket.on('chat', (result) => {
      this.messageList.push(result);
    });
  }

  sendMessage() {
    let msg = this.formGroup.getRawValue().message;
    const msgToSent: ChatMessage = {
      userName: this.usuario.username,
      userId: this.usuario.id,
      content: msg,
      timestamp: Date.now().toString(),
    };
    this.socket.emit('chat', {
      msgId: this._userChat.msgId,
      msgToSent: msgToSent,
      signal: false,
    });
    this.formGroup.reset();
    this.messageList.push(msgToSent);
  }
}
