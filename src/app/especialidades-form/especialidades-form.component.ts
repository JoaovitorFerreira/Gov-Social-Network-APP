import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Especialidades } from '../core/models/especialidades.model';

@Component({
  selector: 'pge-especialidades-form',
  templateUrl: './especialidades-form.component.html',
  styleUrls: ['./especialidades-form.component.scss']
})
export class EspecialidadesFormComponent implements OnInit {
  public formGroup: FormGroup;
  public outrosInput: FormGroup;
  public padroes = [
    'direito_administrativo',
    'direito_civil',
    'direito_empresarial',
    'propriedade_intelectual',
    'direito_ambiental',
    'direito_financeiro_tributário',
    'direito_processual',
    'direito_trabalho',
    'direito_previdenciário',
    'direito_constitucional',
    'direito_econômico_concorrencial',
    'direito_penal',
    'filosofia_direito',
    'liderança',
    'negociação',
    'mediação',
    'arbitragem',
    'gestão',
    'rh'
  ];
  constructor(@Inject(MAT_DIALOG_DATA) private data: Especialidades, private matRef: MatDialogRef<EspecialidadesFormComponent>, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createForms(this.data);
  }

  private createForms(especialidades?: Especialidades) {
    console.log('especialides create forms --> ', especialidades);
    this.outrosInput = this.fb.group({
      outros: [null]
    });
    if (especialidades) {
      this.formGroup = this.fb.group({
        direito_administrativo: [especialidades.direito_administrativo],
        direito_civil: [especialidades.direito_civil],
        direito_empresarial: [especialidades.direito_empresarial],
        propriedade_intelectual: [especialidades.propriedade_intelectual],
        direito_ambiental: [especialidades.direito_ambiental],
        direito_financeiro_tributário: [especialidades.direito_financeiro_tributário],
        direito_processual: [especialidades.direito_processual],
        direito_trabalho: [especialidades.direito_trabalho],
        direito_previdenciário: [especialidades.direito_previdenciário],
        direito_constitucional: [especialidades.direito_constitucional],
        direito_econômico_concorrencial: [especialidades.direito_econômico_concorrencial],
        direito_penal: [especialidades.direito_penal],
        filosofia_direito: [especialidades.filosofia_direito],
        liderança: [especialidades.liderança],
        negociação: [especialidades.negociação],
        mediação: [especialidades.mediação],
        arbitragem: [especialidades.arbitragem],
        gestão: [especialidades.gestão],
        rh: [especialidades.rh]
      });
      for (const key in especialidades.outros) {
        this.addControl(key);
      }
    } else {
      this.formGroup = this.fb.group({
        direito_administrativo: [false],
        direito_civil: [false],
        direito_empresarial: [false],
        propriedade_intelectual: [false],
        direito_ambiental: [false],
        direito_financeiro_tributário: [false],
        direito_processual: [false],
        direito_trabalho: [false],
        direito_previdenciário: [false],
        direito_constitucional: [false],
        direito_econômico_concorrencial: [false],
        direito_penal: [false],
        filosofia_direito: [false],
        liderança: [false],
        negociação: [false],
        mediação: [false],
        arbitragem: [false],
        gestão: [false],
        rh: [false]
      });
    }
  }

  private addControl(key: string) {
    this.formGroup.addControl(key, new FormControl(true));
  }

  public addConhecimento() {
    const valor = this.outrosInput.get('outros').value;
    const key = valor.split(' ').join('_');
    this.addControl(key);
    this.outrosInput.get('outros').reset();
  }

  public salvarInformacoes() {
    const form = this.formGroup.getRawValue();
    const especialidades: Especialidades = {...form, outros: {}};
    for (const padrao in especialidades) {
      if (padrao === 'outros') { continue; }
      if (!this.padroes.includes(padrao)) {
        if (!especialidades[padrao]) { delete especialidades[padrao]; continue; }
        especialidades.outros[padrao] = especialidades[padrao];
        delete especialidades[padrao];
      }
    }
    this.matRef.close(especialidades);
  }

}
