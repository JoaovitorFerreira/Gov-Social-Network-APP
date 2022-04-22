import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioComponent } from './usuario.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AngularMaterialModule } from 'src/app/core/angular-material.module';
import { UsuarioService } from './usuario.service';

@NgModule({
  declarations: [
    UsuarioComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AngularMaterialModule
  ],
  providers: [
    UsuarioService
  ]
})
export class UsuarioModule { }
