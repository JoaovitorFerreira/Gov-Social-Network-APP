import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'pge-event-dialog',
  templateUrl: './pge-event-modal.component.html',
  styleUrls: ['./pge-event-modal.component.css'],
})
export class EventModalPGEComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<EventModalPGEComponent>,
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
