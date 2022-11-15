import { Injectable } from "@angular/core";
import { Firestore, doc, getDoc, setDoc } from "@angular/fire/firestore";
import { getDownloadURL, ref, Storage, uploadBytes } from "@angular/fire/storage";
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

  public saveUsuario(usuario: Usuario): Promise<boolean> {
    const uid = usuario.id;
    delete usuario.id;
    
    return setDoc(doc(this.firestore, 'usuarios/' + uid), usuario).then(() => {
      sessionStorage.setItem('userData', JSON.stringify(usuario))
      return true
    });
  }

  public async saveProfileImage(archive: { id: string, file: Blob, path: string }): Promise<string> {
    const id: string = archive.id;
    const file: Blob = archive.file;
    const path: string = archive.path;
    const reference = ref(this.storage, `${path}/${id}`);
    const task = uploadBytes(reference, file);
    try {
        const res = await task;
        if (res.metadata.size > 0) {
          return res.ref.fullPath;
        }
    } catch (err) {
      console.log('error on upload file --> ', err);
      return null;
    }
    return null;
  }

  public getPhoto(path: string) {
    return getDownloadURL(ref(this.storage, path));
  }
}