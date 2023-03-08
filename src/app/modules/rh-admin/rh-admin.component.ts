import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Timestamp } from 'firebase/firestore';
import { Usuario } from 'src/app/core/models/usuario.model';
import { Post } from 'src/app/model/post';
import { HeaderService } from 'src/app/shared/header/header.service';
import { EventModalPGEComponent } from 'src/app/shared/pge-modal/pge-event-modal/pge-event-modal.component';
import { PostModalPGEComponent } from 'src/app/shared/pge-modal/pge-post-modal/pge-post-modal.component';
import { RemoveEventModalComponent } from 'src/app/shared/pge-modal/pge-remove-modal/pge-remove-modal.component';
import { PromotionModalComponent } from 'src/app/shared/promotion-modal/promotion-modal.component';
import { FeedService } from '../feed/feed.service';

@Component({
  selector: 'rh-admin',
  templateUrl: './rh-admin.component.html',
  styleUrls: ['./rh-admin.component.css'],
  providers: [FeedService],
})
export class RhAdminComponent implements OnInit, OnDestroy {
  public user: Usuario;
  constructor(
    private dialog: MatDialog,
    private feedService: FeedService,
    private headerService: HeaderService
  ) {}

  ngOnInit() {
    this.user = this.headerService.dadosUsuario;
  }

  ngOnDestroy(): void {}

  public async savePGEEventPost(eventoAcriar: any) {
    let date = Timestamp.fromDate(new Date());
    let imgPath =
      eventoAcriar.imagensAnexadas === null
        ? null
        : await this.feedService.savePostImg(eventoAcriar.imagensAnexadas);
    let newPost: Post = {
      id: `pge-rh-posts-${date.seconds}`,
      //alterar o dono post eventualmente
      donoPost: this.user,
      descricao: eventoAcriar.descricao,
      dataPost: date,
      evento: {
        nomeEvento: eventoAcriar.evento.nomeEvento,
        dataInicioEvento: eventoAcriar.evento.dataInicioEvento,
        dataFimEvento: eventoAcriar.evento.dataFimEvento,
        horarioInicio: eventoAcriar.evento.horarioInicio,
        horarioFim: eventoAcriar.evento.horarioFim,
      },
    };
    if (imgPath != null) {
      newPost = {
        ...newPost,
        imagensAnexadas: imgPath,
      };
    }
    this.feedService.savePost(newPost);
  }

  public openEventModalPGE() {
    const dialogRef = this.dialog.open(EventModalPGEComponent, {
      width: '600px',
      height: '70%',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === false) {
        return;
      }
      this.savePGEEventPost(result);
    });
  }

  public openRemoveModalPGE() {
    const dialogRef = this.dialog.open(RemoveEventModalComponent, {
      width: '600px',
      height: '70%',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === false) {
        return;
      }
    });
  }

  public openPostModalPGE() {
    const dialogRef = this.dialog.open(PostModalPGEComponent, {
      width: '600px',
      height: '50%',
      disableClose: true,
      data: this.user
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === false) {
        return;
      }
    });
  }

  public openPromotionModal() {
    const dialogRef = this.dialog.open(PromotionModalComponent, {
      width: '600px',
      height: '70%',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === false) {
        return;
      }
    });
  }
}
