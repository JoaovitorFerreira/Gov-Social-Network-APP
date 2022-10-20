import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {Router} from '@angular/router';
import { delay, Subject, takeUntil } from 'rxjs';
import { Usuario } from '../core/models/usuario.model';
import { HeaderService } from '../header/header.service';
import { FeedService } from './feed.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
  providers: [FeedService]
})
export class FeedComponent implements OnInit, OnDestroy {

  public setor: Usuario[];
  public formGroup: FormGroup;
  private destroy: Subject<any> = new Subject();

  constructor(private router: Router, private fb: FormBuilder, private headerService: HeaderService, private feedService: FeedService) { }

  async ngOnInit() {
    this.formGroup = this.fb.group({
      search: [null],
      filterType: ''
    });
    if (!this.headerService.dadosUsuario) {
      await new Promise((complete) => setTimeout(() => complete(true), 2000));
    }
    this.checkFirstLogin()
    const setor = this.headerService.dadosUsuario.currentJob.setor || '';
    this.feedService.getUsersFromSetor(setor).then(async usuarios => {
      for (const pessoa of usuarios) {
        pessoa.profilePicture = await this.getPhoto(pessoa.profilePicture);
      }
      this.setor = usuarios;
    });
    this.handleSearch()
  }

  ngOnDestroy(): void {
      this.destroy.next(null)
      this.destroy.complete()
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

  public handleSearch() {
    return this.formGroup.get('search').valueChanges.pipe(delay(1000),takeUntil(this.destroy)).subscribe((obs)=>{
      let type = this.formGroup.get('filterType').value
      this.search(obs, type)
    })
    
  }

  private checkFirstLogin(){
    console.log(this.headerService.dadosUsuario.firstAccess)
    if(this.headerService.dadosUsuario.firstAccess){
      this.router.navigateByUrl('change-password');
    }
  }

  private search(userText: string, filterType: string) {
    switch (filterType) {
      case 'role':
        this.feedService.getUsersFromCargo(userText && userText !== '' ? userText : 
        this.headerService.dadosUsuario.currentJob.setor).then(async usuarios => {
          for (const pessoa of usuarios) {
            pessoa.profilePicture = await this.getPhoto(pessoa.profilePicture);
          }
          this.setor = usuarios;
        });
        break;
      case 'user':
        this.feedService.getUsersFromName(userText && userText !== '' ? userText : 
        this.headerService.dadosUsuario.currentJob.setor).then(async usuarios => {
          for (const pessoa of usuarios) {
            pessoa.profilePicture = await this.getPhoto(pessoa.profilePicture);
          }
          this.setor = usuarios;
        });
        break;
      case 'knowhow':
        this.feedService.getUsersFromEspecialidade(userText && userText !== '' ? userText : 
        this.headerService.dadosUsuario.currentJob.setor).then(async usuarios => {
          for (const pessoa of usuarios) {
            pessoa.profilePicture = await this.getPhoto(pessoa.profilePicture);
          }
          this.setor = usuarios;
        });
        break;
      case 'sector':
        this.feedService.getUsersFromSetor(userText && userText !== '' ? userText : 
        this.headerService.dadosUsuario.currentJob.setor).then(async usuarios => {
          for (const pessoa of usuarios) {
            pessoa.profilePicture = await this.getPhoto(pessoa.profilePicture);
          }
          this.setor = usuarios;
        });
        break;
      default:
        break;
    }
  }
}
