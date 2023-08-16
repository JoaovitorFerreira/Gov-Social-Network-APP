import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/core/services/auth.service';
import { HeaderService } from '../header/header.service';
import { Router } from '@angular/router';
import { MONGODB_DATABASE } from 'src/environments/environment.dev';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'pge-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  constructor(
    private fb: UntypedFormBuilder,
    private router: Router,
    private headerService: HeaderService,
    private snack: MatSnackBar,
    private http: HttpClient,
    private authService: AuthService
  ) {}
  public formGroup: UntypedFormGroup;

  ngOnInit(): void {
    if (!this.headerService.dadosUsuario.firstAccess) {
      this.router.navigateByUrl('feed');
    }
    this.formGroup = this.fb.group({
      password: [null, [Validators.required, Validators.minLength(8)]],
    });
  }
  public get userName() {
    return this.headerService.dadosUsuario.username;
  }

  public get userId() {
    return this.headerService.dadosUsuario.id;
  }

  public async saveNewPass() {
    this.http
      .put(`${MONGODB_DATABASE}auth/change-pass`, {
        userId: this.authService.getUserId,
        passToChange: this.formGroup.getRawValue().password,
      })
      .pipe()
      .subscribe((subscriptionResult: any) => {
        if (subscriptionResult) {
          this.snack.open('Nova senha cadastrada com sucesso', null, {
            duration: 5000,
          });
          this.authService.getUserData(this.authService.getUserId);
          setTimeout(() => this.router.navigateByUrl('feed'), 3000);
        } else {
          this.snack.open(
            'Erro ao cadastrar nova senha. Por favor tente novamente.',
            null,
            { duration: 5000 }
          );
        }
      });
  }
}
