import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Job } from '../../models/job.model';

@Component({
  selector: 'pge-job-form',
  templateUrl: './job-form.component.html',
  styleUrls: ['./job-form.component.scss']
})
export class JobFormComponent implements OnInit {
  public formGroup: UntypedFormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) private data: Job, private matRef: MatDialogRef<JobFormComponent>, private fb: UntypedFormBuilder) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      empresa: [this.data ? this.data.empresa : null, [Validators.required]],
      setor: [this.data ? this.data.setor : null, [Validators.required]],
      cargo: [this.data ? this.data.cargo : null, [Validators.required]],
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
