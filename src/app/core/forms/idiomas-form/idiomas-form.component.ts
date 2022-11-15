import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Idiomas } from '../../models/idiomas.models';


@Component({
  selector: 'pge-idiomas-form',
  templateUrl: './idiomas-form.component.html',
  styleUrls: ['./idiomas-form.component.scss']
})
export class IdiomasFormComponent implements OnInit {
  public formGroup: FormGroup;
  public outrosInput: FormGroup;
  public padroes = [
    'ingles',
    'frances',
    'espanhol',
    'alemao',
    'portugues',
  ];
  constructor(@Inject(MAT_DIALOG_DATA) private data: Idiomas, private matRef: MatDialogRef<IdiomasFormComponent>, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createForms(this.data);
  }

  private createForms(idiomas?: Idiomas) {
    this.outrosInput = this.fb.group({
      outros: [null]
    });
    if (idiomas) {
      this.formGroup = this.fb.group({
        ingles: [idiomas.ingles],
        portugues: [idiomas.portugues],
        frances: [idiomas.frances],
        espanhol: [idiomas.espanhol],
        alemao: [idiomas.alemao],
      });
      for (const key in idiomas.outros) {
        this.addControl(key);
      }
    } else {
      this.formGroup = this.fb.group({
        ingles: [false],
        portugues: [false],
        alemao: [false],
        frances: [false],
        espanhol: [false],
      });
    }
  }

  private addControl(key: string) {
    this.formGroup.addControl(key, new FormControl(true));
  }

  public addIdiomas() {
    const valor = this.outrosInput.get('outros').value;
    const key = valor.split(' ').join('_');
    this.addControl(key);
    this.outrosInput.get('outros').reset();
  }

  public salvarInformacoes() {
    const form = this.formGroup.getRawValue();
    const idiomas: Idiomas = {...form, outros: {}};
    for (const padrao in idiomas) {
      if (padrao === 'outros') { continue; }
      if (!this.padroes.includes(padrao)) {
        if (!idiomas[padrao]) { delete idiomas[padrao]; continue; }
        idiomas.outros[padrao] = idiomas[padrao];
        delete idiomas[padrao];
      }
    }
    this.matRef.close(idiomas);
  }

}
