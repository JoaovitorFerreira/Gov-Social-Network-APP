import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject, catchError, map, retry, tap, throwError } from 'rxjs';
import { OnlineSystemPost, Post, tipoRealizacaoPost } from 'src/app/model/post';
import { AddContactComponent } from 'src/app/shared/add-contact-modal/add-contact-modal.component';
import { EventModalComponent } from 'src/app/shared/event-modal/event-modal.component';
import { Usuario } from '../../core/models/usuario.model';
import { HeaderService } from '../../shared/header/header.service';
import { FeedService } from './feed.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
  providers: [FeedService],
})
export class FeedComponent implements OnInit, OnDestroy {
  public user: Usuario;
  public setor: Usuario[];
  public formGroup: UntypedFormGroup;
  public messageFormGroup: UntypedFormGroup;
  private destroy: Subject<any> = new Subject();
  public posts: any[] = [];
  public selectedImg: { file: File; id: string; path: string };
  public realizationOptions = Object.keys(tipoRealizacaoPost);
  public realizationOption;
  public usuariosMarcados: Usuario[];
  public hasImgSaved = false;
  public panelOpenState = false;
  public liveData = [];
  public interval = 1;
  constructor(
    private router: Router,
    private fb: UntypedFormBuilder,
    private headerService: HeaderService,
    private feedService: FeedService,
    private dialog: MatDialog
  ) {
    this.feedService
      .getPosts()
      .pipe()
      .subscribe((result) => {
        this.posts = this.checkNewPosts(result, this.liveData);
        console.log(this.posts)
      });
  }

  async ngOnInit() {
    if (!this.headerService.dadosUsuario) {
      await new Promise((complete) => setTimeout(() => complete(true), 2000));
    }
    this.loadUserInfo();
    this.formGroup = this.fb.group({
      message: [null, Validators.required],
    });
    this.messageFormGroup = this.fb.group({
      comment: [null, Validators.required],
    });
    this.checkFirstLogin();
  }

  ngOnDestroy(): void {
    this.destroy.next(null);
    this.destroy.complete();
  }

  public checkNewPosts(postArray: any[], oldPostsArray: any[]) {
    if (postArray.length == 0) return this.liveData;
    const diffItens = postArray.filter(
      (element) => !oldPostsArray.includes(element)
    );
    if (diffItens.length > 0) this.liveData.push(...diffItens);
    return this.liveData;
  }

  public async loadUserInfo() {
    this.user = this.headerService.dadosUsuario;
    if (!this.user.profilePicture.startsWith('http')) {
      this.user.profilePicture = await this.getPhoto(this.user.profilePicture);
    }
  }

  public setRealization(event) {
    this.realizationOption = event.target.defaultValue;
  }

  public postComment(p: Post) {
    console.log(p);
    let comment = this.messageFormGroup.getRawValue().comment;
    this.feedService
      .saveComment(comment, p, this.headerService.dadosUsuario)
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  private getPhoto(path: string): Promise<string> {
    if (!path) {
      return Promise.resolve(
        'https://www.donkey.bike/wp-content/uploads/2020/12/user-member-avatar-face-profile-icon-vector-22965342-e1608640557889.jpg'
      );
    }
    if (path.startsWith('https://')) {
      return Promise.resolve(
        'https://www.donkey.bike/wp-content/uploads/2020/12/user-member-avatar-face-profile-icon-vector-22965342-e1608640557889.jpg'
      );
    }
    return Promise.resolve(path);
  }

  public openProfile(pessoa: Usuario) {
    if (this.headerService.dadosUsuario.id === pessoa.id) {
      this.router.navigateByUrl('usuario/self');
    } else {
      this.router.navigateByUrl('usuario/' + pessoa.id);
    }
  }

  private checkFirstLogin() {
    if (this.headerService.dadosUsuario.firstAccess) {
      this.router.navigateByUrl('change-password');
    }
  }

  public uploadImage(ref: HTMLInputElement) {
    ref.click();
  }

  public imageSelected(event) {
    if (!event.target.files[0]) {
      this.hasImgSaved = false;
      return;
    }
    const file: File = event.target.files[0];
    let date = new Date();
    const timestamp = date.toDateString();
    const fileObj = {
      file,
      id: 'postImg' + file.name.split('.').pop() + timestamp,
      path: 'posts-pictures/',
    };
    this.selectedImg = fileObj;
    this.hasImgSaved = true;
  }

  public removeImage() {
    for (const prop of Object.getOwnPropertyNames(this.selectedImg)) {
      delete this.selectedImg[prop];
    }
    this.hasImgSaved = false;
  }

  public async savePost() {
    let date = new Date();
    let imgPath =
      this.selectedImg == undefined
        ? null
        : await this.feedService.savePostImg(this.selectedImg);
    let newPost: Post = {
      donoPost: this.user,
      tipoPost: this.realizationOption,
      descricao: this.formGroup.getRawValue().message,
      dataPost: date.toDateString(),
      evento: null,
      isEvento: false,
      ...(this.usuariosMarcados && { usuariosMarcados: this.usuariosMarcados }),
    };
    if (imgPath != null) {
      newPost = {
        ...newPost,
        imagensAnexadas: imgPath,
      };
    }
    this.feedService.savePost(newPost);
  }

  public async saveEventPost(eventoAcriar: any) {
    let date = new Date();
    let imgPath =
      eventoAcriar.imagensAnexadas === null
        ? null
        : await this.feedService.savePostImg(eventoAcriar.imagensAnexadas);
    let newPost: Post = {
      donoPost: this.user,
      descricao: eventoAcriar.descricao,
      dataPost: date.toDateString(),
      evento: {
        nomeEvento: eventoAcriar.evento.nomeEvento,
        donoEvento: this.user,
        dataInicioEvento: eventoAcriar.evento.dataInicioEvento,
        dataFimEvento: eventoAcriar.evento.dataFimEvento,
        horarioInicio: eventoAcriar.evento.horarioInicio,
        horarioFim: eventoAcriar.evento.horarioFim,
        linkTransmissaoEvento: eventoAcriar.evento.linkTransmissaoEvento,
        linkInscricaoEvento: eventoAcriar.evento.linkInscricaoEvento,
      },
      isEvento: true,
    };
    if (imgPath != null) {
      newPost = {
        ...newPost,
        imagensAnexadas: imgPath,
      };
    }
    this.feedService.savePost(newPost);
  }

  public addContact() {
    const dialogRef = this.dialog.open(AddContactComponent, {
      width: '600px',
      height: '300px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.usuariosMarcados = result;
    });
  }

  public createAnEvent() {
    const dialogRef = this.dialog.open(EventModalComponent, {
      width: '600px',
      height: '70%',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === false) {
        return;
      }
      this.saveEventPost(result);
    });
  }

  public participateEvent(post: Post, signal: boolean) {
    const user = this.headerService.dadosUsuario;
    let atendeesList = [];

    if (signal) {
      if (post.evento.participantes && post.evento.participantes.length >= 0) {
        atendeesList = [...post.evento.participantes, user];
      } else {
        atendeesList = [user];
      }
    } else {
      const index = post.evento.participantes.findIndex(
        (userList) => userList.id === user.id
      );
      index !== -1 && post.evento.participantes.splice(index, 1);
      atendeesList = [...post.evento.participantes];
    }

    const newEvent = {
      dataFimEvento: post.evento.dataFimEvento,
      dataInicioEvento: post.evento.dataInicioEvento,
      horarioFim: post.evento.horarioFim,
      horarioInicio: post.evento.horarioInicio,
      nomeEvento: post.evento.nomeEvento,
      donoEvento: post.evento.donoEvento,
      participantes: atendeesList,
      linkTransmissaoEvento: post.evento.linkTransmissaoEvento,
      linkInscricaoEvento: post.evento.linkInscricaoEvento,
    };

    const newPost = {
      ...post,
      evento: newEvent,
    };
    this.feedService.savePost(newPost);
  }

  public userIsAtendee(post: Post) {
    const user = this.headerService.dadosUsuario;
    const hasAtendees =
      Array.isArray(post.evento.participantes) &&
      post.evento.participantes.length > 0;
    if (hasAtendees) {
      return post.evento.participantes.some(
        (atendee) => atendee.id === user.id
      );
    } else {
      return false;
    }
  }

  // public catchWebSocketPosts(msg) {
  //   if (Object.keys(msg)[0] === 'error') {
  //     return;
  //   }
  //   if (msg.result) {
  //     switch (Object.keys(msg.result)[0]) {
  //       case 'new_message':
  //         const newNessage = msg.result.new_message;
  //         // Do something with your new message
  //         break;
  //       case 'new_user':
  //         const newUser = msg.result.new_user;
  //         // Do something with your new user
  //         break;
  //       case 'user_change':
  //         //this.handleUserChange(msg.result.user_change);
  //         // Do something with the changed user
  //         break;
  //       default:
  //         break;
  //     }
  //   } else {
  //     console.log('err', msg.result);
  //   }
  // }
}
