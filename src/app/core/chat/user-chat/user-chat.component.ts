import { Component, Input } from '@angular/core';
import { ChatService } from './user-chat.service';
import { Firestore, doc, getDoc, setDoc } from "@angular/fire/firestore";
import { Usuario } from "src/app/core/models/usuario.model";
import { ChatMessage, OnlineSystemMessage } from 'src/app/model/message';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'user-chat',
  templateUrl: './user-chat.component.html',
  styleUrls: ['./user-chat.component.scss']
})
export class UserChatComponent {
  messageList: ChatMessage[];
  usuario: Usuario;
  responseUser: Usuario;
  _userChat: OnlineSystemMessage
  public formGroup: FormGroup;

  @Input() set userChat(userChat: OnlineSystemMessage) {
    this._userChat = userChat;
    this.getResponseUserData()
    this.getMessageData()
  }

  constructor(private chatService: ChatService, private fb: FormBuilder){
    this.usuario = JSON.parse(sessionStorage.getItem('userData'));
  }

  ngOnInit(){
    this.formGroup = this.fb.group({
      message: '',
    });
  }

  private getResponseUserData(){
    this.chatService.getReponseUserChat(this._userChat.responseUser).then((data)=>{
      this.responseUser = data
    })
  }

  private getMessageData(){
    
    this.messageList = this._userChat.chat
  }
  
  sendMessage() {
    let msg = this.formGroup.getRawValue().message;
    this.chatService.sendMessage(this._userChat, msg);
    this.formGroup.setValue({message: ''})
  }

}