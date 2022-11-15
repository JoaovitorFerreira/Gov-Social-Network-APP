import { Injectable, OnInit } from "@angular/core";
import { Firestore, getDocs, collection } from "@angular/fire/firestore";
import { Storage, getDownloadURL, ref } from "@angular/fire/storage";

@Injectable()
export class FeedService implements OnInit {

  constructor(private firestore: Firestore, private storage: Storage) {
  }

  ngOnInit(): void {
  }

  public getPosts(){
    let posts = [{user:'',title:'minha primeira experiencia no gov publico',message:'lorem epsun...', userImg:''},
    {user:'',title:'teste',message:'lorem epsun...', userImg:''},
    {user:'',title:'teste 2',message:'lorem epsun...', userImg:''},
    {user:'',title:'teste 3',message:'lorem epsun...', userImg:''}]
    return posts
  }

  public getPhoto(path: string) {
    return getDownloadURL(ref(this.storage, path));
  }
}