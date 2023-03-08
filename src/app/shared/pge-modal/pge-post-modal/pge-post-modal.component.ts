import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Timestamp } from 'firebase/firestore';
import { Usuario } from 'src/app/core/models/usuario.model';
import { Post, tipoRealizacaoPost } from 'src/app/model/post';
import { FeedService } from 'src/app/modules/feed/feed.service';
import { AddContactComponent } from '../../add-contact-modal/add-contact-modal.component';

@Component({
  selector: 'pge-post-dialog',
  templateUrl: './pge-post-modal.component.html',
  styleUrls: ['./pge-post-modal.component.css'],
  providers: [FeedService]
})
export class PostModalPGEComponent implements OnInit {
  public formGroup: FormGroup;
  public selectedImg: { file: File; id: string; path: string };
  public usuariosMarcados: Usuario[];
  public hasImgSaved = false;
  constructor(
    public dialogRef: MatDialogRef<PostModalPGEComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private feedService: FeedService,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.formGroup = this.fb.group({
      message: [null, Validators.required],
    });
  }

  public async savePost() {
    let date = Timestamp.fromDate(new Date());
    let imgPath =
      this.selectedImg == undefined
        ? null
        : await this.feedService.savePostImg(this.selectedImg);
    let newPost: Post = {
      id: `pge-rh-posts-post-${date.seconds}`,
      donoPost: this.data,
      descricao: this.formGroup.getRawValue().message,
      dataPost: date,
      ...(this.usuariosMarcados && { usuariosMarcados: this.usuariosMarcados }),
    };
    if (imgPath != null) {
      newPost = {
        ...newPost,
        imagensAnexadas: imgPath,
      };
    }
    this.feedService.savePost(newPost).then((result)=>
      this.dialogRef.close(result)
    ).catch(error => {

    });
  }

  public removeImage() {
    console.log('antes da remoção', this.selectedImg);
    for (const prop of Object.getOwnPropertyNames(this.selectedImg)) {
      delete this.selectedImg[prop];
    }
    this.hasImgSaved = false;
    console.log('apos a remocao', this.selectedImg);
  }
  
  public addContact() {
    const dialogRef = this.dialog.open(AddContactComponent, {
      width: '600px',
      height: '300px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.usuariosMarcados = result;
    });
  }

  public uploadImage(ref: HTMLInputElement) {
    ref.click();
  }

  public imageSelected(event) {
    if (!event.target.files[0]) {
      this.hasImgSaved = false;
      return;
    }
    const file: File = event.target.files[0];
    let date = new Date();
    const timestamp = Timestamp.fromDate(date);
    const fileObj = {
      file,
      id: 'postImg' + file.name.split('.').pop() + timestamp,
      path: 'posts-pictures/',
    };
    this.selectedImg = fileObj;
    this.hasImgSaved = true;
  }

  onClose(): void {
    this.dialogRef.close(false);
  }
}
