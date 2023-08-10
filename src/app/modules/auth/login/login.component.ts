import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loading = false;
  public formGroup: UntypedFormGroup;
  constructor(
    private fb: UntypedFormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initFormGroup();
  }

  private initFormGroup() {
    this.formGroup = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      pass: [null, [Validators.required]],
    });
  }

  public login() {
    if (this.loading) {
      return;
    }
    this.loading = true;
    const form = this.formGroup.getRawValue();
    this.authService.login(form.email, form.pass).then((result) => {
      this.loading = false;
      if (result) {
        this.router.navigateByUrl('feed');
      } else {
        this.snackBar.open('Email ou senha inválidos', null, {
          duration: 5000,
        });
      }
    });
  }

  public forgotPassword() {
    return true;
    /*if (this.formGroup.get('email').invalid) {
      this.snackBar.open('Por favor preencha o campo de email para recuperar sua senha', null, {duration: 5000});
    }
    const email = this.formGroup.get('email').value;
    this.authService.emailResetPassword(email).then(() => {
      this.snackBar.open('Email de recuperação de senha enviado com sucesso', null, {duration: 5000});
    }).catch(() => {
      this.snackBar.open('Erro ao enviar email de recuperação de senha. Por favor confirme as informações e tente novamente.', null, {duration: 5000});
    });*/
  }
}
