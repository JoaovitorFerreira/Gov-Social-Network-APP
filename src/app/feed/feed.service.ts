import { Injectable } from "@angular/core";
import { Firestore, getDocs, collection } from "@angular/fire/firestore";
import { Storage, getDownloadURL, ref } from "@angular/fire/storage";
import { Usuario } from "../core/models/usuario.model";

@Injectable()
export class FeedService {
  constructor(private firestore: Firestore, private storage: Storage) {}

  public getUsersFromSetor(setor: string): Promise<Usuario[]> {
    return getDocs(collection(this.firestore, 'usuarios')).then(users => {
      const usuarios: Usuario[] = [];
      if (users.empty) { return usuarios; }
      for (const dc of users.docs) {
        const user = dc.data() as Usuario;
        if (user.currentJob.setor !== setor) { continue; }
        usuarios.push({...dc.data(), id: dc.id} as Usuario);
      }
      return usuarios;
    });
  }
  
  public getPhoto(path: string) {
    return getDownloadURL(ref(this.storage, path));
  }
}