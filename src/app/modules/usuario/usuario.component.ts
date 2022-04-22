import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs';
import { Usuario } from 'src/app/core/models/usuario.model';
import { Especialidades } from 'src/app/core/models/especialidades.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { ChangePasswordComponent } from 'src/app/shared/change-password/change-password.component';
import { UsuarioService } from './usuario.service';

@Component({
  selector: 'pge-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {
  public loading: boolean = true;
  public user: Usuario;
  public formGroup: FormGroup;
  constructor(private authService: AuthService, private usuarioService: UsuarioService, private dialog: MatDialog, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.usuarioService.getUsuario(this.authService.getUserId).then(user => {
      if (user) {
        if (user.firstAccess) {
          this.dialog.open(ChangePasswordComponent, {data: {username: user.username, uid: this.authService.getUserId}}).afterClosed().pipe(take(1)).subscribe((complete) => {
            if (complete) {
              this.user = user;
              this.createForms();
              this.loading = false;
              this.usuarioService.updateUsuario(this.authService.getUserId, {firstAccess: false});
            }
          });
        } else {
          this.user = user;
          this.createForms(user.especialidades);
          this.loading = false;
        }
      }
    });
  }

  private createForms(especialidades?: Especialidades) {
    if (especialidades) {
      this.formGroup = this.fb.group({
        direito_administrativo: [especialidades.direito_administrativo],
        direito_civil: [especialidades.direito_civil],
        direito_empresarial: [especialidades.direito_empresarial],
        propriedade_intelectual: [especialidades.propriedade_intelectual],
        direito_ambiental: [especialidades.direito_ambiental],
        direito_financeiro_tributário: [especialidades.direito_financeiro_tributário],
        direito_processual: [especialidades.direito_processual],
        direito_trabalho: [especialidades.direito_trabalho],
        direito_previdenciário: [especialidades.direito_previdenciário],
        direito_constitucional: [especialidades.direito_constitucional],
        direito_econômico_concorrencial: [especialidades.direito_econômico_concorrencial],
        direito_penal: [especialidades.direito_penal],
        filosofia_direito: [especialidades.filosofia_direito],
        outros: [null]
      });
      for (const key in especialidades.outros) {
        this.addControl(key);
      }
    } else {
      this.formGroup = this.fb.group({
        direito_administrativo: [null],
        direito_civil: [null],
        direito_empresarial: [null],
        propriedade_intelectual: [null],
        direito_ambiental: [null],
        direito_financeiro_tributário: [null],
        direito_processual: [null],
        direito_trabalho: [null],
        direito_previdenciário: [null],
        direito_constitucional: [null],
        direito_econômico_concorrencial: [null],
        direito_penal: [null],
        filosofia_direito: [null],
        outros: [null]
      });
    }
  }

  public addControl(key: string) {
    this.formGroup.addControl(key, new FormControl([true]));
  }


  public trackControls(index: number, item: string) {
    return item;
  }

  public salvarInformacoes() {
    
  }

}
