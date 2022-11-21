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
  public userChats: OnlineSystemMessage[] = [];
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

  private async initUserChat() {
    this.userChats = await this.chatService.initUserChat()
  }

  public openUserChat(userChat: any) {
    this.selectedUser = userChat;
  }
}
