import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoAuthGuard } from 'src/app/core/guards/noauth.guard';
import { LoginComponent } from './login.component';

const routes: Routes = [
  { path: '', canActivate: [NoAuthGuard], component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
