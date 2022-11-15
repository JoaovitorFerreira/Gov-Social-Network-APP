import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import {Router} from '@angular/router';
import { delay, Subject, takeUntil } from 'rxjs';
import { Usuario } from '../../core/models/usuario.model';
import { HeaderService } from '../../shared/header/header.service';
import { FeedService } from './feed.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
  providers: [FeedService]
})
export class FeedComponent implements OnInit, OnDestroy {
  public user: Usuario;
  public setor: Usuario[];
  public formGroup: FormGroup;
  public messageFormGroup: FormGroup;
  private destroy: Subject<any> = new Subject();
  public posts: any[] = []

  constructor(private router: Router, private fb: FormBuilder, private headerService: HeaderService, private feedService: FeedService) { }

  async ngOnInit() {
    if (!this.headerService.dadosUsuario) {
      await new Promise((complete) => setTimeout(() => complete(true), 2000));
    }
    this.loadUserInfo()
    this.formGroup = this.fb.group({
      message: ''
    });
    this.messageFormGroup = this.fb.group({
      comment:''
    })
    this.checkFirstLogin()
    this.getPhoto(this.headerService.dadosUsuario.id)
    this.posts = this.feedService.getPosts()
  }

  ngOnDestroy(): void {
      this.destroy.next(null)
      this.destroy.complete()
  }

  public loadUserInfo() {
    this.user = this.headerService.dadosUsuario
  }

  public postMessage(){
    console.log(this.formGroup.value)

    return true;
  }

  public postComment(){
    return true;
  }

  private getPhoto(path: string): Promise<string> {
    if (!path) {
      return Promise.resolve('https://www.donkey.bike/wp-content/uploads/2020/12/user-member-avatar-face-profile-icon-vector-22965342-e1608640557889.jpg');
    }
    return this.feedService.getPhoto(path);
  }

  public openProfile(pessoa: Usuario) {
    if (this.headerService.dadosUsuario.id === pessoa.id) {
      this.router.navigateByUrl('usuario/self');
    } else {
      this.router.navigateByUrl('usuario/' + pessoa.id);
    }
  }

  private checkFirstLogin(){
    if(this.headerService.dadosUsuario.firstAccess){
      this.router.navigateByUrl('change-password');
    }
  }

}
