import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'pge-post-dialog',
  templateUrl: './pge-post-modal.component.html',
  styleUrls: ['./pge-post-modal.component.css'],
})
export class PostModalPGEComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<PostModalPGEComponent>,
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
