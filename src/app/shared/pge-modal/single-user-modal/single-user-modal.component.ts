import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'single-user-modal-dialog',
  templateUrl: './single-user-modal.component.html',
  styleUrls: ['./single-user-modal.component.css'],
})
export class SingleUserModalComponent implements OnInit {
  public formGroup: UntypedFormGroup;
  public promotionGroup: UntypedFormGroup;

  constructor(
    public dialogRef: MatDialogRef<SingleUserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: UntypedFormBuilder
  ) {}

  ngOnInit() {
    this.formGroup = this.fb.group({
      message: [null, Validators.required],
    });
    this.promotionGroup = this.fb.group({
        setor: [null, [Validators.required]],
        cargo: [null, [Validators.required]],
        descricao: [null, [Validators.required]],
        dataInicio: [null, [Validators.required]],
      });
  }

  submitSearch(): void {}

  onSubmit(): void {
    const dados = this.promotionGroup.getRawValue();
    this.dialogRef.close(dados);
  }

  onClose(): void {
    this.dialogRef.close(false);
  }
}
