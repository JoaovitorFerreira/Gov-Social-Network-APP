import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Job } from 'src/app/core/models/job.model';

import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Usuario } from 'src/app/core/models/usuario.model';
import { SectorService } from 'src/app/modules/sector/sector.service';
import { SingleUserModalComponent } from '../pge-modal/single-user-modal/single-user-modal.component';
import { UserDetailsService } from 'src/app/modules/user-details/user-details.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'promotion-dialog',
  templateUrl: './promotion-modal.component.html',
  styleUrls: ['./promotion-modal.component.css'],
  providers: [UserDetailsService],
})
export class PromotionModalComponent implements OnInit {
  public resultado: Usuario[];
  public formGroup: FormGroup;
  public notSearchedYet = true;
  public addUserList: Usuario[] = [];

  constructor(
    public dialogRef: MatDialogRef<PromotionModalComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sectorService: SectorService,
    private fb: FormBuilder,
    private userService: UserDetailsService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.formGroup = this.fb.group({
      search: [null, Validators.required],
    });
  }

  public search(userText: string) {
    /*this.sectorService
      .getUsersFromName(userText)
      .then(async (usuarios) => {
        for (const pessoa of usuarios) {
          pessoa.profilePicture = await this.getPhoto(pessoa.profilePicture);
        }
        this.resultado = usuarios;
        this.notSearchedYet = false;
      })
      .catch((error) => {
        console.log(error);
      });
      */
  }

  public userListNames(userId: string): boolean {
    return this.addUserList.some((user) => user.id === userId);
  }

  public promoteUser(pessoa: Usuario): void {
    const dialogRef = this.dialog.open(SingleUserModalComponent, {
      width: '600px',
      height: '70%',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === false) {
        return;
      }
      this.savePromotedUser(pessoa, result);
    });
  }

  public savePromotedUser(pessoa: Usuario, result: any) {
    const newJob: Job = {
      empresa: 'PGE - RJ',
      setor: result.setor,
      cargo: result.cargo,
      descricao: result.descricao,
      dataInicio: result.dataInicio,
    };
    const atualizacaoPessoa = pessoa;
    atualizacaoPessoa.jobs.push(newJob);
    atualizacaoPessoa.currentJob = newJob;
    this.userService
      .saveUsuario({ ...atualizacaoPessoa })
      .then((result) => this.openSnackBar(true))
      .catch((error) => {
        this.openSnackBar(false);
      });
  }

  public get searchedYet() {
    return this.notSearchedYet;
  }

  private getPhoto(path: string): Promise<string> {
    if (!path) {
      return Promise.resolve(
        'https://www.donkey.bike/wp-content/uploads/2020/12/user-member-avatar-face-profile-icon-vector-22965342-e1608640557889.jpg'
      );
    }
    return Promise.resolve(path);
  }

  submitSearch(): void {
    this.search(this.formGroup.get('search').value);
  }

  openSnackBar(userUpdated: boolean) {
    const message = userUpdated
      ? 'Usuario promovido com sucesso, pode fechar esse modal'
      : 'Tivemos um problema, tente novamente mais tarde';
    this.snackBar.open(message, 'close', {
      duration: 2000,
      panelClass: userUpdated ? ['green-snackbar'] : ['red-snackbar'],
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
