import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import {
  Subject,
  switchAll,
  catchError,
  tap,
  EMPTY,
  Observable,
  Observer,
  map,
  retry,
  share,
} from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Usuario } from 'src/app/core/models/usuario.model';
import { AuthService } from 'src/app/core/services/auth.service';
import {
  comentarioPost,
  Evento,
  OnlineSystemPost,
  Post,
} from 'src/app/model/post';
import {
  MONGODB_DATABASE,
  WEBSOCKET_CONNECTION_URL,
} from 'src/environments/environment.dev';

@Injectable()
export class FeedService implements OnInit {
  public feedPost: Subject<any>;
  public ws: any;
  public isConnected = false;
  private subject: Subject<MessageEvent>;
  private myUserJWT = JSON.parse(sessionStorage.getItem('access_token'));
  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {}
  //websocket methods
  public open() {
    this.feedPost = <Subject<any>>this.connect(
      `${WEBSOCKET_CONNECTION_URL}feed`
    ).pipe(
      map((response: MessageEvent): any => {
        const data = JSON.parse(response.data);
        return data;
      })
    );
    console.log(
      'Websocket successfully connected to : ',
      `${WEBSOCKET_CONNECTION_URL}feed`
    );
  }

  public connect(url): Subject<MessageEvent> {
    if (!this.subject) {
      this.subject = this.create(url);
    }
    return this.subject;
  }

  private create(url): Subject<MessageEvent> {
    this.ws = new WebSocket(url, ['Bearer', this.myUserJWT]);
    const observable = Observable.create((obs: Observer<MessageEvent>) => {
      this.ws.onmessage = obs.next.bind(obs);
      this.ws.onerror = obs.error.bind(obs);
      this.ws.onclose = obs.complete.bind(obs);
      return this.ws.close.bind(this.ws);
    }).pipe(share(), retry());
    const observer = {
      next: (data: Object) => {
        if (this.ws.readyState === WebSocket.OPEN) {
          this.ws.send(JSON.stringify(data));
        }
      },
    };
    return Subject.create(observer, observable);
  }

  public close() {
    if (this.ws) {
      this.ws.close();
      console.log('websocket connection closed');
      this.subject = null;
    }
  }

  // public getPosts() {
  //   /*let q = query(
  //     collection(this.firestore, 'posts'),
  //     orderBy('dataPost', 'desc')
  //   );*/
  //   const docsArray = [];
  //   /* getDocs(q).then((querySnapshot) => {
  //     if (!querySnapshot.empty) {
  //       querySnapshot.forEach(async (docs) => {
  //         let result: any = {
  //           ...docs.data(),
  //           dataTratada: docs
  //             .data()
  //             .dataPost.toDate()
  //             .toLocaleDateString('pt-BR'),
  //         };
  //         const treatedImgData = await this.checkImageData(docs.data());
  //         result = { ...result, ...treatedImgData };
  //         docsArray.push(result);
  //       });
  //     }
  //   });*/
  //   return docsArray;
  // }

  // public getPGEPosts() {
  //   const docsArray = [];
  //   /*let q = query(
  //     collection(this.firestore, 'posts'),
  //     orderBy('dataPost', 'desc'),
  //     where('postRh', '==', true)
  //   );
  //   getDocs(q).then((querySnapshot) => {
  //     if (!querySnapshot.empty) {
  //       querySnapshot.forEach(async (docs) => {
  //         let result: any = {
  //           ...docs.data(),
  //           dataTratada: docs
  //             .data()
  //             .dataPost.toDate()
  //             .toLocaleDateString('pt-BR'),
  //         };
  //         const treatedImgData = await this.checkImageData(docs.data());
  //         result = { ...result, ...treatedImgData };
  //         docsArray.push(result);
  //       });
  //     }
  //   });*/
  //   return docsArray;
  // }

  //rest and view methods

  private async checkImageData(dados: any) {
    let result;

    if (dados.imagensAnexadas!) {
      result = {
        ...result,
        imagemCarregada: await this.getPhoto(dados.imagensAnexadas),
      };
    }
    if (dados.donoPost!) {
      const donoPost = dados.donoPost;
      let donoPostProfilePicture = await Promise.resolve(
        dados.donoPost.profilePicture.startsWith('https://')
          ? donoPost.profilePicture
          : this.getPhoto(dados.donoPost.profilePicture)
      );
      donoPost.profilePicture = donoPostProfilePicture;
      result = {
        ...result,
        donoPost: donoPost,
      };
    }
    if (dados.evento!) {
      const evento = dados.evento;
      if (evento.participantes && evento.participantes.length > 0) {
        const participanteTratado = await Promise.all(
          dados.evento.participantes.map(async (participante) => {
            const participanteProfilePicture =
              participante.profilePicture.startsWith('https://')
                ? participante.profilePicture
                : await this.getPhoto(participante.profilePicture);

            return {
              ...participante,
              profilePicture: participanteProfilePicture,
            };
          })
        );
        evento.participantes = participanteTratado;
      }
      result = {
        ...result,
        evento: evento,
      };
    }
    if (dados.comentarios!) {
      const comentarioTratado = await Promise.all(
        dados.comentarios.map(async (comentario) => {
          const donoComment = comentario.donoComentario;
          const donoComentarioProfilePicture =
            comentario.donoComentario.profilePicture.startsWith('https://')
              ? comentario.donoComentario.profilePicture
              : await this.getPhoto(comentario.donoComentario.profilePicture);

          comentario.donoComentario = {
            ...donoComment,
            profilePicture: donoComentarioProfilePicture,
          };
          return {
            ...comentario,
          };
        })
      );
      result = { ...result, comentarios: comentarioTratado };
    }
    return result;
  }

  public getPhoto(path: string) {
    //return getDownloadURL(ref(this.storage, path));
    return '';
  }

  public savePost(post: Post) {
    /*const uid = post.id;
    return setDoc(doc(this.firestore, 'posts/' + uid), post).then(() => {
      return true;
    });*/
    const savePost = this.http
      .post(`${MONGODB_DATABASE}feed/criar-post`, post, {
        headers: this.authService.getReqHeaders,
      })
      .pipe()
      .subscribe(
        (result) => {
          window.location.reload();
          return result;
        },
        (error) => {
          return error;
        }
      );
    return savePost;
  }

  public async savePostImg(archive: {
    id: string;
    file: Blob;
    path: string;
  }): Promise<string> {
    /*const id: string = archive.id;
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
    */
    return Promise.resolve('');
  }

  public async saveComment(
    comment: string,
    post: OnlineSystemPost,
    user: Usuario
  ) {
    let date = new Date();
    /*let CommentToPost: comentarioPost = {
      dataComentario: Timestamp.fromDate(date),
      donoComentario: user,
      comentario: comment,
    };
    let comments: comentarioPost[] = post.comentarios ?? [];
    comments.push(CommentToPost);
    let postSimplified: Post = {
      id: post.id,
      donoPost: post.donoPost,
      tipoPost: post.tipoPost,
      descricao: post.descricao,
      dataPost: post.dataPost,
      comentarios: comments,
    };
    if (post.reacoes!) {
      postSimplified = {
        ...postSimplified,
        reacoes: post.reacoes,
      };
    }
    if (post.usuariosMarcados!) {
      postSimplified = {
        ...postSimplified,
        usuariosMarcados: post.usuariosMarcados,
      };
    }
    if (post.imagensAnexadas!) {
      postSimplified = {
        ...postSimplified,
        imagensAnexadas: post.imagensAnexadas,
      };
    }

    await setDoc(doc(this.firestore, 'posts/' + post.id), postSimplified);
    */
  }
}
