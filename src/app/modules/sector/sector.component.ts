import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { delay, Subject, takeUntil } from 'rxjs';
import { Usuario } from '../../core/models/usuario.model';
import { HeaderService } from 'src/app/shared/header/header.service';
import { SectorService } from './sector.service';

@Component({
  selector: 'app-sector',
  templateUrl: './sector.component.html',
  styleUrls: ['./sector.component.css'],
  providers: [SectorService],
})
export class SectorComponent implements OnInit, OnDestroy {
  public setor: Usuario[];
  public formGroup: UntypedFormGroup;
  private destroy: Subject<any> = new Subject();
  public notSearchedYet: boolean;
  constructor(
    private router: Router,
    private fb: UntypedFormBuilder,
    private headerService: HeaderService,
    private sectorService: SectorService
  ) {}

  async ngOnInit() {
    this.formGroup = this.fb.group({
      search: [null],
      filterType: '',
    });
    if (!this.headerService.dadosUsuario) {
      await new Promise((complete) => setTimeout(() => complete(true), 2000));
    }
    const setor = this.headerService.dadosUsuario.currentJob.setor || '';
    /*this.sectorService.getUsersFromSetor(setor).then(async (usuarios) => {
      for (const pessoa of usuarios) {
        pessoa.profilePicture = await this.getPhoto(pessoa.profilePicture);
      }
      this.setor = usuarios;
      this.handleSearch();
      this.notSearchedYet = true;
    });
    */
  }

  ngOnDestroy(): void {
    this.destroy.next(null);
    this.destroy.complete();
  }

  private getPhoto(path: string): Promise<string> {
    if (!path) {
      return Promise.resolve(
        'https://www.donkey.bike/wp-content/uploads/2020/12/user-member-avatar-face-profile-icon-vector-22965342-e1608640557889.jpg'
      );
    }
    return Promise.resolve(path);
  }

  public openProfile(pessoa: Usuario) {
    if (this.headerService.dadosUsuario.id === pessoa.id) {
      this.router.navigateByUrl('usuario/self');
    } else {
      this.router.navigateByUrl('usuario/' + pessoa.id);
    }
  }

  public handleSearch() {
    return this.formGroup
      .get('search')
      .valueChanges.pipe(delay(1000), takeUntil(this.destroy))
      .subscribe((obs) => {
        let type = this.formGroup.get('filterType').value;
        this.search(obs, type);
        this.notSearchedYet = false;
      });
  }

  public get seachedYet() {
    let searchString = this.formGroup.getRawValue().search;
    if (searchString == '' || searchString == null) {
      return false;
    }
    return true;
  }

  private search(userText: string, filterType: string) {
    /*switch (filterType) {
      case 'role':
        this.sectorService
          .getUsersFromCargo(
            userText && userText !== ''
              ? userText
              : this.headerService.dadosUsuario.currentJob.setor
          )
          .then(async (usuarios) => {
            for (const pessoa of usuarios) {
              pessoa.profilePicture = await this.getPhoto(
                pessoa.profilePicture
              );
            }
            this.setor = usuarios;
          });
        break;
      case 'user':
        this.sectorService
          .getUsersFromName(
            userText && userText !== ''
              ? userText
              : this.headerService.dadosUsuario.currentJob.setor
          )
          .then(async (usuarios) => {
            for (const pessoa of usuarios) {
              pessoa.profilePicture = await this.getPhoto(
                pessoa.profilePicture
              );
            }
            this.setor = usuarios;
          });
        break;
      case 'knowhow':
        this.sectorService
          .getUsersFromEspecialidade(
            userText && userText !== ''
              ? userText
              : this.headerService.dadosUsuario.currentJob.setor
          )
          .then(async (usuarios) => {
            for (const pessoa of usuarios) {
              pessoa.profilePicture = await this.getPhoto(
                pessoa.profilePicture
              );
            }
            this.setor = usuarios;
          });
        break;
      case 'sector':
        this.sectorService
          .getUsersFromSetor(
            userText && userText !== ''
              ? userText
              : this.headerService.dadosUsuario.currentJob.setor
          )
          .then(async (usuarios) => {
            for (const pessoa of usuarios) {
              pessoa.profilePicture = await this.getPhoto(
                pessoa.profilePicture
              );
            }
            this.setor = usuarios;
          });
        break;
      default:
        this.notSearchedYet = true;
        break;
    }
    */
  }
}
