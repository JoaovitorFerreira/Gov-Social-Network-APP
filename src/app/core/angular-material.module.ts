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
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  imports: [
    MatDialogModule,
    MatListModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatTabsModule,
    MatSnackBarModule,
    MatChipsModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatRadioModule,
    MatGridListModule,
    MatDatepickerModule,
    MatSelectModule,
    MatExpansionModule,
  ],
  exports: [
    MatProgressSpinnerModule,
    MatDialogModule,
    MatListModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatSnackBarModule,
    MatTabsModule,
    MatChipsModule,
    MatSidenavModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatRadioModule,
    MatGridListModule,
    MatDatepickerModule,
    MatSelectModule,
    MatExpansionModule,
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }],
})
export class AngularMaterialModule {}
