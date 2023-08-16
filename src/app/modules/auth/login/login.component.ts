import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { MONGODB_DATABASE } from 'src/environments/environment.dev';

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
    private snackBar: MatSnackBar,
    private http: HttpClient
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
    const body = { email: form.email, password: form.pass };
    this.http
      .post(`${MONGODB_DATABASE}auth/login`, body)
      .pipe()
      .subscribe(
        (result: any) => {
          this.loading = false;
          this.authService.setUserInfo(result);
          this.router.navigateByUrl('feed');
        },
        (error: any) => {
          this.loading = false;
          this.snackBar.open('Email ou senha inválidos', null, {
            duration: 5000,
          });
        }
      );
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
