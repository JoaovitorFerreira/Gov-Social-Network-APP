import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'pge-remove-dialog',
  templateUrl: './pge-remove-modal.component.html',
  styleUrls: ['./pge-remove-modal.component.css'],
})
export class RemoveEventModalComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<RemoveEventModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {}

  onSubmit(): void {
    this.dialogRef.close(event);
  }

  onClose(): void {
    this.dialogRef.close(false);
  }
}
