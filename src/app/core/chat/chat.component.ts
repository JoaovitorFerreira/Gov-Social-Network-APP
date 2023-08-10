import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { OnlineSystemMessage } from 'src/app/model/message';
import { Usuario } from '../models/usuario.model';
import { ChatService } from './chat.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'pge-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent {
  public userChats: OnlineSystemMessage[] = [];
  public searchedChats: OnlineSystemMessage[] = [];
  public messageList: string[] = [];
  public formGroup: UntypedFormGroup;
  public user: Usuario;
  public selectedUser: any;

  constructor(
    private chatService: ChatService,
    private fb: UntypedFormBuilder,
    public snackbar: MatSnackBar
  ) {}

  ngOnInit() {
    this.initUserChat();
    this.formGroup = this.fb.group({
      search: [null, Validators.required],
    });
    this.chatService.getContinuosChat();
    this.observableContinuosChat();
  }

  public searchUser() {
    let searchString = this.formGroup.getRawValue().search;
    let user = this.userChats.filter((user) => {
      let treatedUsername = user.responseUser.toLowerCase();
      return treatedUsername.includes(searchString);
    });
    if (user.length > 0) {
      this.searchedChats = user;
    } else {
      this.userNotFound();
    }
    this.formGroup.reset();
  }

  public observableContinuosChat() {
    this.chatService.message$.subscribe((msg) => {
      if (msg == null) {
        return;
      } else if (msg.tipo === 'added') {
        this.userChats.push(msg.data);
      } else if (msg.tipo === 'modified') {
        this.userChats
          .find((userChatsMsg) => userChatsMsg.id === msg.data.id)
          .chat.push(msg.data.lastMsg);
        this.userChats.find(
          (userChatsMsg) => userChatsMsg.id === msg.data.id
        ).lastMsg = msg.data.lastMsg;
      }
    });
  }

  public userNotFound() {
    this.snackbar.open('Usuário não encontrado', '', {
      duration: 2000,
    });
  }

  public cleanFilter() {
    this.searchedChats = [];
  }

  private async initUserChat() {
    this.userChats = await this.chatService.initUserChat();
  }

  public openUserChat(userChat: any) {
    this.selectedUser = userChat;
  }
}
