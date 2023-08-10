import { Component, Inject, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IdealLocation } from '../../models/idealLocation.model';

@Component({
  selector: 'pge-ideal-location-form',
  templateUrl: './locacao-ideal-form.component.html',
  styleUrls: ['./locacao-ideal-form.component.scss'],
})
export class IdealLocationFormComponent implements OnInit {
  public formGroup: UntypedFormGroup;
  public contadorCampos: number = 1;
  public arrayCampos = [1];
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: IdealLocation,
    private matRef: MatDialogRef<IdealLocationFormComponent>,
    private fb: UntypedFormBuilder
  ) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      maiorInteresse: [
        this.data ? this.data.maiorInteresse : null,
        [Validators.required],
      ],
      interesse1: [this.data ? this.data.interesse[0] : null],
    });
    this.data.interesse.forEach((valorInteresse, index) => {
      if (index === 0) {
        return;
      }
      this.adicionaCampoInteresse(valorInteresse);
    });
  }

  public adicionaCampoInteresse(valorInteresse?: string) {
    this.contadorCampos++;
    this.arrayCampos.push(this.contadorCampos);
    this.formGroup.addControl(
      `interesse${this.contadorCampos}`,
      new UntypedFormControl(valorInteresse)
    );
  }

  public salvarInformacoes() {
    const interesses = [];
    for (const key in this.formGroup.getRawValue()) {
      if (key.startsWith('interesse')) {
        if (this.formGroup.getRawValue()[key]) {
          interesses.push(this.formGroup.getRawValue()[key]);
        }
      }
    }
    const dados = {
      maiorInteresse: this.formGroup.getRawValue().maiorInteresse,
      interesse:
        interesses.length > 0
          ? interesses
          : [this.formGroup.getRawValue().interesse],
    };

    this.matRef.close(dados);
  }
}
