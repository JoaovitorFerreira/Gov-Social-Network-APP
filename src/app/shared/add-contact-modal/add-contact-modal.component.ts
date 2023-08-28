import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Usuario } from 'src/app/core/models/usuario.model';
import { SectorService } from 'src/app/modules/sector/sector.service';

@Component({
  selector: 'add-contact-dialog',
  templateUrl: './add-contact-modal.component.html',
  styleUrls: ['./add-contact-modal.component.css'],
})
export class AddContactComponent implements OnInit {
  public resultado: Usuario[];
  public formGroup: UntypedFormGroup;
  public notSearchedYet = true;
  public addUserList: Usuario[] = [];
  constructor(
    public dialogRef: MatDialogRef<AddContactComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sectorService: SectorService,
    private fb: UntypedFormBuilder
  ) {}

  ngOnInit() {
    this.formGroup = this.fb.group({
      search: [null, Validators.required],
    });
  }

  public search(userText: string) {

  }

  public userListNames(userId: string): boolean {
    return this.addUserList.some((user) => user.id === userId);
  }

  public handleAddUser(UserToCheck: Usuario, event: MatCheckboxChange) {
    if (event.checked) {
      const aux = [...this.addUserList, UserToCheck];
      this.addUserList = aux;
    } else {
      const index = this.addUserList.findIndex(
        (user) => user.id === UserToCheck.id
      );
      index !== -1 && this.addUserList.splice(index, 1);
    }
  }

  public get searchedYet() {
    return this.notSearchedYet;
  }

  private getPhoto(path: string): Promise<string> {
    if (!path) {
      return Promise.resolve(
        'https://www.donkey.bike/wp-content/uploads/2020/12/user-member-avatar-face-profile-icon-vector-22965342-e1608640557889.jpg'
      );
    }
    return Promise.resolve(path);
  }

  submitSearch(): void {
    this.search(this.formGroup.get('search').value);
  }

  onClose(): void {
    this.dialogRef.close(this.addUserList);
  }
}
