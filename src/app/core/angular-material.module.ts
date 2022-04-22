import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  imports: [
    MatDialogModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatTabsModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule
  ],
  exports: [
    MatProgressSpinnerModule,
    MatDialogModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatSnackBarModule,
    MatTabsModule,
    MatSidenavModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule
  ]
})
export class AngularMaterialModule { }