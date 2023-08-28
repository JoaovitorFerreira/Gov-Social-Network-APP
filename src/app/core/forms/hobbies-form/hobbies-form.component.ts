import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Hobbies } from '../../models/hobbies.model';


@Component({
  selector: 'pge-hobbies-form',
  templateUrl: './hobbies-form.component.html',
  styleUrls: ['./hobbies-form.component.scss']
})
export class HobbiesFormComponent implements OnInit {
  public formGroup: UntypedFormGroup;
  public outrosInput: UntypedFormGroup;
  public padroes = [
    'artes',
    'esportes',
    'livros',
    'musica',
    'surfar',
    'violino',
    'violão',
  ];
  constructor(@Inject(MAT_DIALOG_DATA) private data: Hobbies, private matRef: MatDialogRef<HobbiesFormComponent>, private fb: UntypedFormBuilder) { }

  ngOnInit(): void {
    this.createForms(this.data);
  }

  private createForms(hobbies?: Hobbies) {
    this.outrosInput = this.fb.group({
      outros: [null]
    });
    if (hobbies) {
      this.formGroup = this.fb.group({
        artes: [hobbies.artes],
        esportes: [hobbies.esportes],
        livros: [hobbies.livros],
        musica: [hobbies.musica],
        surfar: [hobbies.surfar],
        violino: [hobbies.violino],
        violao: [hobbies.violao],
      });
      for (const key in hobbies.outros) {
        this.addControl(key);
      }
    } else {
      this.formGroup = this.fb.group({
        artes: [false],
        esportes: [false],
        livros: [false],
        musica: [false],
        surfar: [false],
        violino: [false],
        violao: [false],
      });
    }
  }

  private addControl(key: string) {
    this.formGroup.addControl(key, new UntypedFormControl(true));
  }

  public addConhecimento() {
    const valor = this.outrosInput.get('outros').value;
    const key = valor.split(' ').join('_');
    this.addControl(key);
    this.outrosInput.get('outros').reset();
  }

  public salvarInformacoes() {
    const form = this.formGroup.getRawValue();
    const hobbies: Hobbies = {...form, outros: {}};
    for (const padrao in hobbies) {
      if (padrao === 'outros') { continue; }
      if (!this.padroes.includes(padrao)) {
        if (!hobbies[padrao]) { delete hobbies[padrao]; continue; }
        hobbies.outros[padrao] = hobbies[padrao];
        delete hobbies[padrao];
      }
    }
    this.matRef.close(hobbies);
  }

}
