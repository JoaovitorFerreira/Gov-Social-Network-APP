import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'event-dialog',
  templateUrl: './event-modal.component.html',
  styleUrls: ['./event-modal.component.css'],
})
export class EventModalComponent implements OnInit {
  public formGroup: UntypedFormGroup;
  public notSearchedYet = true;
  public selectedImg: { file: File; id: string; path: string };
  public hasImgSaved = false;
  constructor(
    public dialogRef: MatDialogRef<EventModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: UntypedFormBuilder
  ) {}

  ngOnInit() {
    this.formGroup = this.fb.group({
      image: [null, Validators.required],
      name: [null, Validators.required],
      description: [null, Validators.required],
      startDate: [null, Validators.required],
      startTime: [null, Validators.required],
      endDate: [null, Validators.required],
      endTime: [null, Validators.required],
      sameDate: [false],
      transmissionLink: [null],
      subscriptionLink: [null],
    });
  }

  setEndDate() {
    const startDateValue = this.formGroup.get('startDate').value;
    if (this.formGroup.get('sameDate').value) {
      this.formGroup.get('endDate').setValue(startDateValue);
    } else {
      this.formGroup.get('endDate').reset();
    }
  }

  public uploadImage(ref: HTMLInputElement) {
    ref.click();
  }

  public imageSelected(event, ref) {
    this.uploadImage(ref);
    if (!event.target.files[0]) {
      this.hasImgSaved = false;
      return;
    }
    const file: File = event.target.files[0];
    let date = new Date();
    const timestamp = date.toDateString();
    const fileObj = {
      file,
      id: 'postImg' + file.name.split('.').pop() + timestamp,
      path: 'posts-pictures/',
    };
    this.selectedImg = fileObj;
    this.hasImgSaved = true;
  }

  public removeImage() {
    for (const prop of Object.getOwnPropertyNames(this.selectedImg)) {
      delete this.selectedImg[prop];
    }
    this.hasImgSaved = false;
  }

  onSubmit(): void {
    const event = {
      descricao: this.formGroup.get('description').value,
      imagensAnexadas: this.selectedImg ?? null,
      evento: {
        dataInicioEvento: this.formGroup.get('startDate').value,
        dataFimEvento: this.formGroup.get('endDate').value,
        horarioInicio: this.formGroup.get('startTime').value,
        horarioFim: this.formGroup.get('endTime').value,
        nomeEvento: this.formGroup.get('name').value,
        linkTransmissaoEvento:
          this.formGroup.get('transmissionLink').value ?? null,
        linkInscricaoEvento:
          this.formGroup.get('subscriptionLink').value ?? null,
      },
    };
    this.dialogRef.close(event);
  }

  onClose(): void {
    this.dialogRef.close(false);
  }
}
