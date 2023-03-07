import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EventModalPGEComponent } from 'src/app/shared/pge-modal/pge-event-modal/pge-event-modal.component';
import { PostModalPGEComponent } from 'src/app/shared/pge-modal/pge-post-modal/pge-post-modal.component';
import { RemoveEventModalComponent } from 'src/app/shared/pge-modal/pge-remove-modal/pge-remove-modal.component';
import { PromotionModalComponent } from 'src/app/shared/promotion-modal/promotion-modal.component';

@Component({
  selector: 'rh-admin',
  templateUrl: './rh-admin.component.html',
  styleUrls: ['./rh-admin.component.css'],
})
export class RhAdminComponent implements OnInit, OnDestroy {
  constructor(private dialog: MatDialog) {}

  async ngOnInit() {}

  ngOnDestroy(): void {}

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
    });
  }

  public openRemoveModalPGE(){
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

  public openPostModalPGE(){
    const dialogRef = this.dialog.open(PostModalPGEComponent, {
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

  public openPromotionModal(){
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
