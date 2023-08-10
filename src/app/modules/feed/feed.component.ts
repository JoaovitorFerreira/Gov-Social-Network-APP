import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { OnlineSystemPost, Post, tipoRealizacaoPost } from 'src/app/model/post';
import { AddContactComponent } from 'src/app/shared/add-contact-modal/add-contact-modal.component';
import { EventModalComponent } from 'src/app/shared/event-modal/event-modal.component';
import { Usuario } from '../../core/models/usuario.model';
import { HeaderService } from '../../shared/header/header.service';
import { FeedService } from './feed.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
  providers: [FeedService],
})
export class FeedComponent implements OnInit, OnDestroy {
  public user: Usuario;
  public setor: Usuario[];
  public formGroup: FormGroup;
  public messageFormGroup: FormGroup;
  private destroy: Subject<any> = new Subject();
  public posts: any[] = [];
  public selectedImg: { file: File; id: string; path: string };
  public realizationOptions = Object.keys(tipoRealizacaoPost);
  public realizationOption;
  public usuariosMarcados: Usuario[];
  public hasImgSaved = false;
  public panelOpenState = false;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private headerService: HeaderService,
    private feedService: FeedService,
    private dialog: MatDialog
  ) {}

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
    this.posts = this.feedService
      .getPosts()
      .sort((a, b) => b.dataTratada - a.dataTratada);
  }

  ngOnDestroy(): void {
    this.destroy.next(null);
    this.destroy.complete();
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

  public postComment(p: OnlineSystemPost) {
    let comment = this.messageFormGroup.getRawValue().comment;
    let user = this.headerService.dadosUsuario;
    this.feedService
      .saveComment(comment, p, user)
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
    console.log('antes da remoção', this.selectedImg);
    for (const prop of Object.getOwnPropertyNames(this.selectedImg)) {
      delete this.selectedImg[prop];
    }
    this.hasImgSaved = false;
    console.log('apos a remocao', this.selectedImg);
  }

  public async savePost() {
    let date = new Date();
    let imgPath =
      this.selectedImg == undefined
        ? null
        : await this.feedService.savePostImg(this.selectedImg);
    let newPost: Post = {
      id: `${this.user.id}-post-${date.toDateString()}`,
      donoPost: this.user,
      tipoPost: this.realizationOption,
      descricao: this.formGroup.getRawValue().message,
      dataPost: date.toDateString(),
      ...(this.usuariosMarcados && { usuariosMarcados: this.usuariosMarcados }),
    };
    if (imgPath != null) {
      newPost = {
        ...newPost,
        imagensAnexadas: imgPath,
      };
    }
    this.feedService.savePost(newPost).then(() => {
      window.location.reload();
    });
  }

  public async saveEventPost(eventoAcriar: any) {
    let date = new Date();
    let imgPath =
      eventoAcriar.imagensAnexadas === null
        ? null
        : await this.feedService.savePostImg(eventoAcriar.imagensAnexadas);
    let newPost: Post = {
      id: `${this.user.id}-post-${date.toDateString()}`,
      donoPost: this.user,
      descricao: eventoAcriar.descricao,
      dataPost: date.toDateString(),
      evento: {
        nomeEvento: eventoAcriar.evento.nomeEvento,
        dataInicioEvento: eventoAcriar.evento.dataInicioEvento,
        dataFimEvento: eventoAcriar.evento.dataFimEvento,
        horarioInicio: eventoAcriar.evento.horarioInicio,
        horarioFim: eventoAcriar.evento.horarioFim,
        linkTransmissaoEvento: eventoAcriar.evento.linkTransmissaoEvento,
        linkInscricaoEvento: eventoAcriar.evento.linkInscricaoEvento,
      },
    };
    if (imgPath != null) {
      newPost = {
        ...newPost,
        imagensAnexadas: imgPath,
      };
    }
    this.feedService.savePost(newPost).then(() => {
      window.location.reload();
    });
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
      participantes: atendeesList,
      linkTransmissaoEvento: post.evento.linkTransmissaoEvento,
      linkInscricaoEvento: post.evento.linkInscricaoEvento,
    };

    const newPost = {
      ...post,
      evento: newEvent,
    };
    this.feedService.savePost(newPost).then(() => {
      window.location.reload();
    });
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
}
