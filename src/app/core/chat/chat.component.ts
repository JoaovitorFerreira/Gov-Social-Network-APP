import { Component } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Message } from 'src/app/model/message';
import { Usuario } from '../models/usuario.model';
import { ChatService } from './chat.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { MONGODB_DATABASE } from 'src/environments/environment.dev';
@Component({
  selector: 'pge-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent {
  public userChats: any = [];
  public searchedChats: any = [];
  public messageList: string[] = [];
  public formGroup: UntypedFormGroup;
  public user: Usuario;
  public selectedUser: any;
  public localUser: Usuario = JSON.parse(sessionStorage.getItem('userData'));
  public loading: boolean = true;

  constructor(
    private chatService: ChatService,
    private fb: UntypedFormBuilder,
    private authService: AuthService,
    public snackbar: MatSnackBar,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.formGroup = this.fb.group({
      search: [null, Validators.required],
    });
    this.populateUserChats();
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

  public populateUserChats = async () => {
    this.loading = true;
    const body = this.localUser.id;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.getUserJwt}`,
    });
    this.http
      .get(`${MONGODB_DATABASE}mensagens/chats/${body}`, { headers: headers })
      .pipe()
      .subscribe((result) => {
        this.userChats = result as Message[];
        this.loading = false;
      });
  };

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

  public openUserChat(userChat: any) {
    this.selectedUser = userChat;
  }
}
