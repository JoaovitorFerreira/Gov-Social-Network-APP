import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { NoAuthGuard } from './core/guards/noauth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', canActivate:[NoAuthGuard], loadChildren: () => import('./modules/login/login.module').then(mod => mod.LoginModule) },
  { path: 'usuario', canActivate:[AuthGuard], loadChildren: () => import('./modules/usuario/usuario.module').then(mod => mod.UsuarioModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'corrected', preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
