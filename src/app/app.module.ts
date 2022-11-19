import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './modules/auth/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './modules/auth/signup/signup.component';
import { AdminComponent } from './modules/admin/admin.component';
import { UserDetailsComponent } from './modules/user-details/user-details.component';
import { FeedComponent } from './modules/feed/feed.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { NgxPaginationModule } from 'ngx-pagination';
import { environment } from 'src/environments/environment';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAuth } from '@angular/fire/auth';
import { provideStorage } from '@angular/fire/storage';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import { AngularMaterialModule } from './core/angular-material.module';
import { HeaderComponent } from './shared/header/header.component';
import { AuthService } from './core/services/auth.service';
import { HeaderService } from './shared/header/header.service';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { EspecialidadesFormComponent } from './core/forms/especialidades-form/especialidades-form.component';
import { HobbiesFormComponent } from './core/forms/hobbies-form/hobbies-form.component';
import { JobFormComponent } from './core/forms/job-form/job-form.component';
import { FormacaoFormComponent } from './core/forms/formacao-form/formacao-form.component';
import { ConhecimentoPipe } from './pipes/conhecimento.pipe';
import { TimestampPipe } from './pipes/timestamp.pipe';
import { ChangePasswordComponent } from './shared/change-password/change-password.component';
import { FooterComponent } from './shared/footer/footer.component';
import { IdiomasFormComponent } from './core/forms/idiomas-form/idiomas-form.component';
import { SectorComponent } from './modules/sector/sector.component';
import { IdealLocationFormComponent } from './core/forms/locacao-ideal-form/locacao-ideal-form.component';
import { ChatComponent } from './core/chat/chat.component';
import { UserChatComponent } from './core/chat/user-chat/user-chat.component';

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
  {
    path: 'sector',
    component: SectorComponent,
  },
  {
    path:'chat',
    component: ChatComponent
  },
  { path: 'change-password', component: ChangePasswordComponent },
  {
    path: 'admin',
    children: [
      { path: '', component: AdminComponent },
      // {path: 'exportdata', component: AppDataExportComponent }
    ], //, canActivate: [AdminGuard]
  },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    AdminComponent,
    UserDetailsComponent,
    FeedComponent,
    UserChatComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    EspecialidadesFormComponent,
    HobbiesFormComponent,
    IdiomasFormComponent,
    JobFormComponent,
    IdealLocationFormComponent,
    FormacaoFormComponent,
    ConhecimentoPipe,
    TimestampPipe,
    ChangePasswordComponent,
    SectorComponent,
    ChatComponent
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
