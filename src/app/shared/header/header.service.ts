import { Injectable } from "@angular/core";
import { Firestore, doc, getDoc } from "@angular/fire/firestore";
import { Usuario } from "src/app/core/models/usuario.model";

@Injectable()
export class HeaderService {
    constructor(private firestore: Firestore) {}

    public getUsuario(uid: string): Promise<Usuario> {
        return getDoc(doc(this.firestore, `usuarios/${uid}`)).then(user => {
            return user.exists() ? user.data() : null;
        }).catch(error => {
            console.log('error getting user --> ', error);
            return null;
        });
    }

}