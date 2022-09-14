import { Injectable } from "@angular/core";
import { Firestore, doc, getDoc } from "@angular/fire/firestore";
import { Usuario } from "src/app/core/models/usuario.model";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class HeaderService {
  public watcher: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public dadosUsuario: Usuario = null;
  constructor(private firestore: Firestore) { }

  public getUsuario(uid: string): Promise<Usuario> {
    return getDoc(doc(this.firestore, `usuarios/${uid}`)).then(user => {
      this.dadosUsuario = user.exists() ? { ...user.data(), id: uid } as Usuario : null;
      console.log('dados usuario load --> ', this.dadosUsuario);
      return this.dadosUsuario;
    }).catch(error => {
      console.log('error getting user --> ', error);
      return null;
    });
  }

}