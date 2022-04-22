import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioComponent } from './usuario.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AngularMaterialModule } from 'src/app/core/angular-material.module';
import { UsuarioService } from './usuario.service';
import { UsuarioRoutingModule } from './usuario.routes';

@NgModule({
  declarations: [
    UsuarioComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AngularMaterialModule,
    UsuarioRoutingModule
  ],
  providers: [
    UsuarioService
  ]
})
export class UsuarioModule { }
