import { Injectable } from "@angular/core";
import { Firestore, doc, getDoc } from "@angular/fire/firestore";
import { getDownloadURL, ref, Storage } from "@angular/fire/storage";
import { Usuario } from "src/app/core/models/usuario.model";

@Injectable()
export class UserDetailsService {
  constructor(private firestore: Firestore, private storage: Storage) {}

  public getUsuario(uid: string): Promise<Usuario> {
    return getDoc(doc(this.firestore, `usuarios/${uid}`)).then(user => {
      if (!user.exists()) { return null; }
      const dados = {...user.data(), id: uid} as Usuario;
      return dados;
    }).catch(error => {
      console.log('error getting user --> ', error);
      return null;
    });
  }

  public getPhoto(path: string) {
    return getDownloadURL(ref(this.storage, path));
  }
}