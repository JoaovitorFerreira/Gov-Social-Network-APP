import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AngularMaterialModule } from '../core/angular-material.module';
import { ConhecimentoPipe } from './pipes/conhecimento.pipe';

@NgModule({
  declarations: [
    HeaderComponent,
    ChangePasswordComponent,
    ConhecimentoPipe
  ],
  imports: [
    CommonModule,
    AngularMaterialModule
  ],
  exports: [
    HeaderComponent,
    ChangePasswordComponent,
    ConhecimentoPipe
  ]
})
export class SharedModule { }
