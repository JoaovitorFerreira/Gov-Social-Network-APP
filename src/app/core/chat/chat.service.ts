import { Injectable } from '@angular/core'
import { collection, Firestore, getDocs, query, where } from "@angular/fire/firestore";
import { BehaviorSubject } from 'rxjs';
import { Usuario } from '../models/usuario.model';


@Injectable({
  providedIn: 'root',
})
export class ChatService {

  public message$: BehaviorSubject<string> = new BehaviorSubject('');
  constructor(private firestore: Firestore) {}
  public user: Usuario = JSON.parse(sessionStorage.getItem('userData'))

  public sendMessage(message) {
  
  }

  public getNewMessage = () => {
    
  };

  public getUserChats = async () => {
    let q = query(collection(this.firestore, 'user-chats'), where("usersId","array-contains-any",[this.user.id]))
    const querySnapshot = await getDocs(q);
    const docsArray = []
    querySnapshot.forEach(docs =>{
      docsArray.push(docs.data())
    })
    return docsArray
  }
}