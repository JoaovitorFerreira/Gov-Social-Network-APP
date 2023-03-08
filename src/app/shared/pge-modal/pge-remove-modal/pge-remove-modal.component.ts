import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'pge-remove-dialog',
  templateUrl: './pge-remove-modal.component.html',
  styleUrls: ['./pge-remove-modal.component.css'],
})
export class RemoveEventModalComponent implements OnInit {
  public formGroup: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<RemoveEventModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.formGroup = this.fb.group({
      message: [null, Validators.required],
    });
  }

  submitSearch(): void {}

  onSubmit(): void {
    this.dialogRef.close(event);
  }

  onClose(): void {
    this.dialogRef.close(false);
  }
}
