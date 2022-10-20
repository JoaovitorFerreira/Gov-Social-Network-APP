import { Injectable } from "@angular/core";
import { Firestore, getDocs, collection } from "@angular/fire/firestore";
import { Storage, getDownloadURL, ref } from "@angular/fire/storage";
import { Usuario } from "../core/models/usuario.model";

@Injectable()
export class FeedService {

  private usersCache: any = [];

  constructor(private firestore: Firestore, private storage: Storage) {}

  public getUsersFromSetor(setor: string): Promise<Usuario[]> {
    
    if(this.usersCache.length > 0) {
      const usuarios: Usuario[] = [];
      for (const dc of this.usersCache) {
        const user = dc.data() as Usuario;
        if (user.currentJob.setor !== setor) { continue; }
        usuarios.push({...dc.data(), id: dc.id} as Usuario);
      }
      return Promise.resolve(usuarios)
    } else {
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
  }

  public getUsersFromName(name: string): Promise<Usuario[]> {
    
    if(this.usersCache.length > 0) {
      const usuarios: Usuario[] = [];
        for (const dc of this.usersCache) {
          const user = dc.data() as Usuario;
          if (!user.username.includes(name)) { continue; }
          usuarios.push({...dc.data(), id: dc.id} as Usuario);
        }
        return Promise.resolve(usuarios);
    } else {
      return getDocs(collection(this.firestore, 'usuarios')).then(users => {
        const usuarios: Usuario[] = [];
        if (users.empty) { return usuarios; }
        for (const dc of users.docs) {
          const user = dc.data() as Usuario;
          if (!user.username.includes(name)) { continue; }
          usuarios.push({...dc.data(), id: dc.id} as Usuario);
        }
        return usuarios;
      });
    }
  }

  public getUsersFromCargo(cargo: string): Promise<Usuario[]> {
    
    if(this.usersCache.length > 0){
      const usuarios: Usuario[] = [];
      for (const dc of this.usersCache) {
        const user = dc.data() as Usuario;
        if (user.currentJob.cargo !== cargo) { continue; }
        usuarios.push({...dc.data(), id: dc.id} as Usuario);
      }
      return Promise.resolve(usuarios)
    } else {
      return getDocs(collection(this.firestore, 'usuarios')).then(users => {
        const usuarios: Usuario[] = [];
        if (users.empty) { return usuarios; }
        this.usersCache = users.docs;
        for (const dc of users.docs) {
          const user = dc.data() as Usuario;
          if (user.currentJob.cargo !== cargo) { continue; }
          usuarios.push({...dc.data(), id: dc.id} as Usuario);
        }
        return usuarios;
      });
    }
  }
  
  public getUsersFromEspecialidade(especialidade: string): Promise<Usuario[]> {

    if(this.usersCache.length > 0){
      const usuarios: Usuario[] = [];
      for (const dc of this.usersCache) {
        const user = dc.data() as Usuario;
        if(user.especialidades[especialidade]){
          usuarios.push({...dc.data(), id: dc.id} as Usuario);
        }
        else if(user.especialidades.outros[especialidade]){
          usuarios.push({...dc.data(), id: dc.id} as Usuario);
        }
      }
      return Promise.resolve(usuarios);
    } else {
      return getDocs(collection(this.firestore, 'usuarios')).then(users => {
        const usuarios: Usuario[] = [];
        if (users.empty) { return usuarios; }
        this.usersCache = users.docs;
        for (const dc of users.docs) {
          const user = dc.data() as Usuario;
          if(user.especialidades[especialidade]){
            usuarios.push({...dc.data(), id: dc.id} as Usuario);
          }
          else if(user.especialidades.outros[especialidade]){
            usuarios.push({...dc.data(), id: dc.id} as Usuario);
          }
        }
        return usuarios;
      });
    }
    
  }
  
  public getPhoto(path: string) {
    return getDownloadURL(ref(this.storage, path));
  }
}