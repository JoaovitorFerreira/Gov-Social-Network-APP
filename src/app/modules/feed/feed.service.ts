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
  BehaviorSubject,
} from 'rxjs';
import { AnonymousSubject } from 'rxjs/internal/Subject';
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
import { Socket, io } from 'socket.io-client';

@Injectable()
export class FeedService implements OnInit {
  private socket: Socket;
  public message$: BehaviorSubject<any> = new BehaviorSubject('');
  public messages: Subject<any>;
  constructor(private http: HttpClient, private authService: AuthService) {
    this.wsConnect();
  }

  ngOnInit(): void {}
  public getPosts() {
    if (this.socket) {
      this.socket.emit('getPosts');
      this.socket.on('getPosts', (data) => {
        this.message$.next(data);
      });
      this.socket;
    } else {
      this.wsConnect();
      this.getPosts();
    }
    return this.message$.asObservable();
  }
  public wsConnect() {
    this.socket = io(`${WEBSOCKET_CONNECTION_URL}feed-ws`, {
      transports: ['websocket'],
    });
  }

  public savePost(post: Post) {
    const savePost = this.http
      .post(`${MONGODB_DATABASE}feed/criar-post`, post, {
        headers: this.authService.getReqHeaders,
      })
      .pipe()
      .subscribe(
        (result) => {
          return result;
        },
        (error) => {
          return error;
        }
      );
    return savePost;
  }

  public async saveComment(comment: string, post: Post, user: Usuario) {
    const body = {
      id: post.id,
      comentario: {
        dataComentario: new Date().toISOString(),
        donoComentario: user,
        comentario: comment,
      },
    };
    this.http
      .post(`${MONGODB_DATABASE}feed/criar-comentario`, body, {
        headers: this.authService.getReqHeaders,
      })
      .pipe()
      .subscribe(
        (result) => {
          return result;
        },
        (error) => {
          return error;
        }
      );
  }

  public async savePostImg(archive: { id: string; file: Blob; path: string }) {
    const file: Blob = archive.file;
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = (e: any) => {
      const imgString = e.target.result as string;
      const user: Usuario = JSON.parse(sessionStorage.getItem('userData'));
      return imgString;
    };
    return reader.result.toString();
  }
}
