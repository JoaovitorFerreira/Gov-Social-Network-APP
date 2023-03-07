import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'promotion-dialog',
  templateUrl: './promotion-modal.component.html',
  styleUrls: ['./promotion-modal.component.css'],
})
export class PromotionModalComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<PromotionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit() {

  }

  onSubmit(): void {
    this.dialogRef.close(event);
  }

  onClose(): void {
    this.dialogRef.close(false);
  }
}
