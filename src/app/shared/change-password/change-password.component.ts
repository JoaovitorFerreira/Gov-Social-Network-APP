import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/core/services/auth.service';
import { HeaderService } from '../header/header.service';
import { Router } from '@angular/router';

@Component({
  selector: 'pge-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  constructor(
    //private firestore: Firestore,
    private fb: UntypedFormBuilder,
    private router: Router,
    private headerService: HeaderService,
    private snack: MatSnackBar,
    private authService: AuthService
  ) {}
  public formGroup: UntypedFormGroup;

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      password: [null, [Validators.required, Validators.minLength(8)]],
    });
    const data = {
      username: this.headerService.dadosUsuario.username,
      uid: this.headerService.dadosUsuario.id,
    };
  }
  public get userName() {
    return this.headerService.dadosUsuario.username;
  }

  public saveNewPass() {
    const pass = this.formGroup.getRawValue().password;
    /*if (pass) {
      console.log(pass)

      this.authService.changePassword(pass).then((value) => {
        console.log(value)
        if (value) {
          this.saveNewAccess()
          this.snack.open('Nova senha cadastrada com sucesso', null, {
            duration: 5000,
          });
          this.router.navigateByUrl('feed');
        } else {
          this.snack.open(
            'Erro ao cadastrar nova senha. Por favor tente novamente.',
            null,
            { duration: 5000 }
          );
        }
      });
    } else {
      this.snack.open('Senha inválida', null, { duration: 5000 });
    }
    */
  }

  private saveNewAccess() {
    /*const usuario = this.headerService.dadosUsuario;
    const uid = usuario.id;
    delete usuario.id;
    const data = usuario;
    data.firstAccess = false;
    setDoc(doc(this.firestore, 'usuarios/' + uid), {
      firstAccess: false,
      ...usuario,
    })
      .then(() => console.log('updated'))
      .catch((error) => console.log(error));
      */
  }
}
