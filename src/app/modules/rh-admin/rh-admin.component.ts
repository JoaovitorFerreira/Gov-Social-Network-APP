import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
  public pgeEvents;
  constructor(
    private dialog: MatDialog,
    private feedService: FeedService,
    private headerService: HeaderService
  ) {}

  async ngOnInit() {
    this.user = this.headerService.dadosUsuario;
    this.pgeEvents = await this.feedService.getPGEPosts();
  }

  ngOnDestroy(): void {}

  public openEventModalPGE() {
    const dialogRef = this.dialog.open(EventModalPGEComponent, {
      width: '600px',
      height: '70%',
      disableClose: true,
      data: this.user,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === false) {
        return;
      }
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
      data: this.user,
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
