import { Injectable, OnInit } from '@angular/core';
import {
  Firestore,
  getDocs,
  collection,
  setDoc,
  doc,
  query,
  orderBy,
} from '@angular/fire/firestore';
import {
  Storage,
  getDownloadURL,
  ref,
  uploadBytes,
} from '@angular/fire/storage';
import { Post } from 'src/app/model/post';

@Injectable()
export class FeedService implements OnInit {
  constructor(private firestore: Firestore, private storage: Storage) {}

  ngOnInit(): void {}

  public getPosts() {
    let q = query(
      collection(this.firestore, 'posts'),
      orderBy('dataPost', 'desc')
    );
    const docsArray = [];
    getDocs(q).then((querySnapshot) => {
      if (!querySnapshot.empty) {
        querySnapshot.forEach((docs) => {
          let result: any = {
            ...docs.data(),
            dataTratada: docs
              .data()
              .dataPost.toDate()
              .toLocaleDateString('pt-BR'),
          };
          if (docs.data().imagensAnexadas!) {
            result = {
              ...result,
              imagemCarregada: this.getPhoto(docs.data().imagensAnexadas),
            };
          }
          docsArray.push(result);
        });
      }
    });
    return docsArray;
  }

  public getPhoto(path: string) {
    return getDownloadURL(ref(this.storage, path));
  }

  public savePost(post: Post): Promise<boolean> {
    const uid = post.id;

    return setDoc(doc(this.firestore, 'posts/' + uid), post).then(() => {
      return true;
    });
  }

  public async savePostImg(archive: {
    id: string;
    file: Blob;
    path: string;
  }): Promise<string> {
    const id: string = archive.id;
    const file: Blob = archive.file;
    const path: string = archive.path;
    const reference = ref(this.storage, `${path}/${id}`);
    const task = uploadBytes(reference, file);
    try {
      const res = await task;
      if (res.metadata.size > 0) {
        return res.ref.fullPath;
      }
    } catch (err) {
      console.log('error on upload file --> ', err);
      return null;
    }
    return null;
  }
}
