import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './auth/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './auth/signup/signup.component';
import { AdminComponent } from './admin/admin.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { FeedComponent } from './feed/feed.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { NgxPaginationModule } from 'ngx-pagination';
import { NetworkComponent } from './network/network.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { environment } from 'src/environments/environment';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAuth } from '@angular/fire/auth';
import { provideStorage } from '@angular/fire/storage';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import { AngularMaterialModule } from './core/angular-material.module';
import { HeaderComponent } from './header/header.component';
import { AuthService } from './core/services/auth.service';
import { HeaderService } from './header/header.service';
import { SidebarComponent } from './sidebar/sidebar.component';
import { EspecialidadesFormComponent } from './especialidades-form/especialidades-form.component';
import { JobFormComponent } from './job-form/job-form.component';
import { FormacaoFormComponent } from './formacao-form/formacao-form.component';
import { ConhecimentoPipe } from './pipes/conhecimento.pipe';
import { TimestampPipe } from './pipes/timestamp.pipe';
import { ChangePasswordComponent } from './shared/change-password/change-password.component';
import { FooterComponent } from './shared/footer/footer.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'usuario',
    children: [
      {
        path: ':id',
        children: [
          { path: '', component: UserDetailsComponent },
          // {path: 'passwordchange', component: ChangePasswordComponent, canActivate: [UserGuard]},
          // {path: 'edit', component: UserEditComponent, canActivate: [UserGuard]},
          // { path: 'messages', component: MessagePageComponent, canActivate: [UserGuard]}
        ],
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'feed',
    component: FeedComponent,
  },
  { path: 'change-password', component: ChangePasswordComponent },
  {
    path: 'admin',
    children: [
      { path: '', component: AdminComponent },
      // {path: 'exportdata', component: AppDataExportComponent }
    ], //, canActivate: [AdminGuard]
  },
  { path: 'network', component: NetworkComponent },
  { path: 'notifications', component: NotificationsComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    AdminComponent,
    UserDetailsComponent,
    FeedComponent,
    NetworkComponent,
    NotificationsComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    EspecialidadesFormComponent,
    JobFormComponent,
    FormacaoFormComponent,
    ConhecimentoPipe,
    TimestampPipe,
    ChangePasswordComponent
  ],
  imports: [
    NgxPaginationModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    AngularMaterialModule,
    RouterModule.forRoot(appRoutes),
    TooltipModule.forRoot(),
  ],
  providers: [AuthService, HeaderService],
  bootstrap: [AppComponent],
})
export class AppModule {}
