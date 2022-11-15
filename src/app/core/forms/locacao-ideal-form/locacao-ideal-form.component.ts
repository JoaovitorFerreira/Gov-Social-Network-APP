import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IdealLocation } from '../../models/idealLocation.model';

@Component({
  selector: 'pge-ideal-location-form',
  templateUrl: './locacao-ideal-form.component.html',
  styleUrls: ['./locacao-ideal-form.component.scss']
})
export class IdealLocationFormComponent implements OnInit {
  public formGroup: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) private data: IdealLocation, private matRef: MatDialogRef<IdealLocationFormComponent>, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      maiorInteresse: [this.data ? this.data.maiorInteresse : null, [Validators.required]],
      interesse: [this.data ? this.data.interesse : null],
    });
  }

  public salvarInformacoes() {
    const dados = this.formGroup.getRawValue();
    this.matRef.close(dados);
  }

}
