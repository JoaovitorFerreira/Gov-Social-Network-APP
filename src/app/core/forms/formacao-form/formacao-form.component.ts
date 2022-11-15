import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Formacao, TipoFormacao } from '../../models/formacao.model';

@Component({
  selector: 'pge-formacao-form',
  templateUrl: './formacao-form.component.html',
  styleUrls: ['./formacao-form.component.scss']
})
export class FormacaoFormComponent implements OnInit {
  public formGroup: FormGroup;
  public tipos: TipoFormacao[] = [
    'Curso',
    'Doutorado',
    'Especialização',
    'Graduação',
    'Mestrado',
    'Palestra',
    'Pós-Graduação',
    'Workshop'
  ];
  constructor(@Inject(MAT_DIALOG_DATA) private data: Formacao, private matRef: MatDialogRef<FormacaoFormComponent>, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      instituicao: [this.data ? this.data.instituicao : null, [Validators.required]],
      tipo: [this.data ? this.data.tipo : null, [Validators.required]],
      curso: [this.data ? this.data.curso : null, [Validators.required]],
      descricao: [this.data ? this.data.descricao : null, [Validators.required]],
      dataInicio: [this.data ? this.data.dataInicio : null, [Validators.required]],
      dataFim: [this.data ? this.data.dataFim : null],
    });
  }

  public salvarInformacoes() {
    const dados = this.formGroup.getRawValue();
    this.matRef.close(dados);
  }

}
