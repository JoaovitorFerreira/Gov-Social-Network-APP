import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAuth } from '@angular/fire/auth';
import { provideStorage } from '@angular/fire/storage';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import { environment } from 'src/environments/environment';
import { LoginModule } from './modules/login/login.module';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AngularMaterialModule } from './core/angular-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    AngularMaterialModule,
    CoreModule,
    SharedModule,
    LoginModule,
    UsuarioModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
