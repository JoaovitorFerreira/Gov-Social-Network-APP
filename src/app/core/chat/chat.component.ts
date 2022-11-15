import { Component } from '@angular/core';
import { ChatService } from './chat.service';



@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
    userChats: any;
    messageList: string[] = [];

  constructor(private chatService: ChatService){

  }

  ngOnInit(){
    this.chatService.getUserChats().subscribe((message: string) => {
      this.messageList.push(message);
    })
  }

  openUserChat() {
    this.chatService.sendMessage(this.newMessage);
    this.newMessage = '';
  }
}