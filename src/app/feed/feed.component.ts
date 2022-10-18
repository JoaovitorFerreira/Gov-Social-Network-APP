import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {Router} from '@angular/router';
import { Usuario } from '../core/models/usuario.model';
import { HeaderService } from '../header/header.service';
import { FeedService } from './feed.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
  providers: [FeedService]
})
export class FeedComponent implements OnInit {

  public setor: Usuario[];
  public formGroup: FormGroup;
  constructor(private router: Router, private fb: FormBuilder, private headerService: HeaderService, private feedService: FeedService) { }

  async ngOnInit() {
    this.formGroup = this.fb.group({
      search: [null],
      filterType: ''
    });
    if (!this.headerService.dadosUsuario) {
      await new Promise((complete) => setTimeout(() => complete(true), 2000));
    }
    const setor = this.headerService.dadosUsuario.currentJob.setor || '';
    this.feedService.getUsersFromSetor(setor).then(async usuarios => {
      for (const pessoa of usuarios) {
        pessoa.profilePicture = await this.getPhoto(pessoa.profilePicture);
      }
      this.setor = usuarios;
    });
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
    return this.formGroup.get('filterType').value === 'role' ? this.roleSearch : this.userSearch 
  }

  private userSearch() {
    const setor = this.formGroup.get('search').value;
    this.feedService.getUsersFromSetor(setor && setor !== '' ? setor : this.headerService.dadosUsuario.currentJob.setor).then(async usuarios => {
      for (const pessoa of usuarios) {
        pessoa.profilePicture = await this.getPhoto(pessoa.profilePicture);
      }
      this.setor = usuarios;
    });
  }

  private roleSearch() {
    const setor = this.formGroup.get('search').value;
    this.feedService.getUsersFromSetor(setor && setor !== '' ? setor : this.headerService.dadosUsuario.currentJob.cargo).then(async usuarios => {
      for (const pessoa of usuarios) {
        pessoa.profilePicture = await this.getPhoto(pessoa.profilePicture);
      }
      this.setor = usuarios;
    });
  }
}
