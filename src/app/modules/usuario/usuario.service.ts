import { Injectable } from "@angular/core";
import { Firestore, doc, getDoc, updateDoc } from "@angular/fire/firestore";
import { Usuario } from "src/app/core/models/usuario.model";

@Injectable()
export class UsuarioService {
    constructor(private firestore: Firestore) {}

    public getUsuario(uid: string): Promise<Usuario> {
        return getDoc(doc(this.firestore, `usuarios/${uid}`)).then(user => {
            return user.exists() ? user.data() : null;
        }).catch(error => {
            console.log('error getting user --> ', error);
            return null;
        });
    }

    public updateUsuario(uid: string, data: Partial<Usuario>): Promise<boolean> {
        return updateDoc(doc(this.firestore, `usuarios/${uid}`), data).then(() => true).catch(() => false);
    }

}