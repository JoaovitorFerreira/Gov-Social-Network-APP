import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'pge-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  public formGroup: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public data: {username: string, uid: string}, private fb: FormBuilder, private snack: MatSnackBar, private authService: AuthService, private matRef: MatDialogRef<ChangePasswordComponent>) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      password: [null, [Validators.required]]
    });
  }

  public saveNewPass() {
    const pass = this.formGroup.getRawValue().password;
    if (pass) {
      this.authService.changePassword(pass).then((value) => {
        if (value) {
          this.snack.open('Nova senha cadastrada com sucesso', null, {duration: 5000});
          this.matRef.close(true);
        } else {
          this.snack.open('Erro ao cadastrar nova senha. Por favor tente novamente.', null, {duration: 5000});
        }
      });
    } else {
      this.snack.open('Senha inválida', null, {duration: 5000});
    }
  }

}
