import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs';
import { Usuario } from 'src/app/core/models/usuario.model';
import { Especialidades } from 'src/app/core/models/especialidades.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { ChangePasswordComponent } from 'src/app/shared/change-password/change-password.component';
import { UsuarioService } from './usuario.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'pge-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {
  public loading: boolean = true;
  public user: Usuario;
  public formGroup: FormGroup;
  public outrosInput: FormGroup;
  constructor(private authService: AuthService, private usuarioService: UsuarioService, private dialog: MatDialog, private fb: FormBuilder, private snack: MatSnackBar) { }

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
    this.outrosInput = this.fb.group({
      outros: [null]
    });
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
      });
      for (const key in especialidades.outros) {
        this.addControl(key);
      }
    } else {
      this.formGroup = this.fb.group({
        direito_administrativo: [false],
        direito_civil: [false],
        direito_empresarial: [false],
        propriedade_intelectual: [false],
        direito_ambiental: [false],
        direito_financeiro_tributário: [false],
        direito_processual: [false],
        direito_trabalho: [false],
        direito_previdenciário: [false],
        direito_constitucional: [false],
        direito_econômico_concorrencial: [false],
        direito_penal: [false],
        filosofia_direito: [false],
      });
    }
  }

  private addControl(key: string) {
    this.formGroup.addControl(key, new FormControl([true]));
  }

  public addConhecimento(input: HTMLInputElement) {
    const valor = input.value;
    const key = valor.split(' ').join('_');
    this.addControl(key);
    input.value = '';
  }


  public trackControls(index: number, item: string) {
    return item;
  }

  public salvarInformacoes() {
    const padroes = [
      'direito_administrativo',
      'direito_civil',
      'direito_empresarial',
      'propriedade_intelectual',
      'direito_ambiental',
      'direito_financeiro_tributário',
      'direito_processual',
      'direito_trabalho',
      'direito_previdenciário',
      'direito_constitucional',
      'direito_econômico_concorrencial',
      'direito_penal',
      'filosofia_direito'
    ];
    const form = this.formGroup.getRawValue();
    const especialidades: Especialidades = {...form};
    for (const padrao in especialidades) {
      if (!padroes.includes(padrao)) {
        especialidades.outros[padrao] = especialidades[padrao];
        delete especialidades[padrao];
      }
    }
    this.usuarioService.updateUsuario(this.authService.getUserId, {especialidades: especialidades}).then(ret => {
      if (ret) {
        this.snack.open('Alterações salvas com sucesso', null, {duration: 5000});
      } else {
        this.snack.open('Erro ao salvar alterações. Por favor tente novamente', null, {duration: 5000});
      }
    }); 
  }

}
