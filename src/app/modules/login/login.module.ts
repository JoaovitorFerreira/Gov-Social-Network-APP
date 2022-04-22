import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { AngularMaterialModule } from 'src/app/core/angular-material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginRoutingModule } from './login.routes';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    SharedModule,
    LoginRoutingModule
  ]
})
export class LoginModule { }
