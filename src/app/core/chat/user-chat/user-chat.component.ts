import { Component, Input } from '@angular/core';
import { UserChatService } from './user-chat.service';
import { Usuario } from 'src/app/core/models/usuario.model';
import { ChatMessage, OnlineSystemMessage } from 'src/app/model/message';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'user-chat',
  templateUrl: './user-chat.component.html',
  styleUrls: ['./user-chat.component.scss'],
})
export class UserChatComponent {
  messageList: ChatMessage[];
  usuario: Usuario;
  responseUser: Usuario;
  _userChat: OnlineSystemMessage;
  public formGroup: UntypedFormGroup;

  @Input() set userChat(userChat: OnlineSystemMessage) {
    this._userChat = userChat;
    this.getResponseUserData();
    this.getMessageData();
  }

  constructor(
    private userChatService: UserChatService,
    private fb: UntypedFormBuilder
  ) {
    this.usuario = JSON.parse(sessionStorage.getItem('userData'));
  }

  ngOnInit() {
    this.formGroup = this.fb.group({
      message: [null, Validators.required],
    });
  }

  private getResponseUserData() {
    this.userChatService
      .getReponseUserChat(this._userChat.responseUser)
      .then((data) => {
        this.responseUser = data;
      });
  }

  private getMessageData() {
    this.messageList = this._userChat.chat;
    console.log(this.messageList);
  }

  sendMessage() {
    let msg = this.formGroup.getRawValue().message;
    this.userChatService
      .sendMessage(this._userChat, msg)
      .then(() => {
        this.formGroup.reset();
        console.log('sent');
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
