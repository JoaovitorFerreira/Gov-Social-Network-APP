import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDetailsService } from './user-details.service';
import { Usuario } from '../../core/models/usuario.model';
import { HeaderService } from '../../shared/header/header.service';
import { MatDialog } from '@angular/material/dialog';
import { FormacaoFormComponent } from '../../core/forms/formacao-form/formacao-form.component';
import { JobFormComponent } from '../../core/forms/job-form/job-form.component';
import { EspecialidadesFormComponent } from '../../core/forms/especialidades-form/especialidades-form.component';
import { take } from 'rxjs';
import { Especialidades } from '../../core/models/especialidades.model';
import { Job } from '../../core/models/job.model';
import { Formacao } from '../../core/models/formacao.model';
import { Hobbies } from '../../core/models/hobbies.model';
import { HobbiesFormComponent } from '../../core/forms/hobbies-form/hobbies-form.component'
import { Idiomas } from '../../core/models/idiomas.models';
import { IdiomasFormComponent } from '../../core/forms/idiomas-form/idiomas-form.component';
import { IdealLocationFormComponent } from '../../core/forms/locacao-ideal-form/locacao-ideal-form.component';
import { IdealLocation } from '../../core/models/idealLocation.model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
  providers: [UserDetailsService]
})
export class UserDetailsComponent implements OnInit {
  isSelfUser: boolean = false;
  user: Usuario;
  especialidades: string[] = [];
  hobbies: string[] = [];
  idiomas: string[] = [];
  
  constructor(
    private router: Router, 
    private headerService: HeaderService,
    private userService: UserDetailsService,
    private dialog: MatDialog
    ) {}

  ngOnInit(): void {
    const id = this.router.url.split('/').pop();
    this.isSelfUser = id === 'self';
    this.loadUser(id);
    console.log('teste 2')
  }

  private async loadUser(id: string) {
    if (this.isSelfUser) {
      this.user = this.headerService.dadosUsuario;
      this.createSkillsArray();
      this.createHobbiesArray();
      this.createLanguagesArray();
      this.user.profilePicture = await this.getPhoto(this.user.profilePicture);
    } else {
      this.userService.getUsuario(id).then(async usuario => {
        this.user = usuario;
        this.createSkillsArray();
        this.createHobbiesArray();
        this.createLanguagesArray();
        usuario.profilePicture = await this.getPhoto(usuario.profilePicture);
      })
    }
  }

  private formatLegenda(legenda: string): string {
    return legenda.split('_').join(' ');
  }

  private createSkillsArray() {
    for (const especialidade in this.user.especialidades) {
      if (especialidade === 'outros') {
        for (const outro in this.user.especialidades.outros) {
          this.especialidades.push(this.formatLegenda(outro));
        }
        continue;
      }
      if (this.user.especialidades[especialidade]) {
        this.especialidades.push(this.formatLegenda(especialidade));
      }
    }
  }  
  
  private createHobbiesArray() {
    for (const hobbie in this.user.hobbies) {
      if (hobbie === 'outros') {
        for (const outro in this.user.hobbies.outros) {
          this.hobbies.push(this.formatLegenda(outro));
        }
        continue;
      }
      if (this.user.hobbies[hobbie]) {
        this.hobbies.push(this.formatLegenda(hobbie));
      }
    }
  }

  private createLanguagesArray() {
    for (const idioma in this.user.idiomas) {
      if (idioma === 'outros') {
        for (const outro in this.user.idiomas.outros) {
          this.idiomas.push(this.formatLegenda(outro));
        }
        continue;
      }
      if (this.user.idiomas[idioma]) {
        this.idiomas.push(this.formatLegenda(idioma));
      }
    }
  }

  private getPhoto(path: string): Promise<string> {
    if (!path) {
      return Promise.resolve('https://www.donkey.bike/wp-content/uploads/2020/12/user-member-avatar-face-profile-icon-vector-22965342-e1608640557889.jpg');
    }
    return this.userService.getPhoto(path);
  }

  private redefineCurrentJob(job: Job) {
    this.user.currentJob = job;
  }

  private redefineMostAttractiveLocation(idealLocation : string){
    this.user.idealLocations.maiorInteresse = idealLocation
  }

  public open(tipo: 'idealLocation' | 'job' | 'skills' | 'hobbies' | 'formacao' | 'idiomas', index?: number) {
    if (tipo === 'formacao') {
      this.dialog.open(FormacaoFormComponent, {data: this.user.formacao[index]}).afterClosed().pipe(take(1)).subscribe((formacao: Formacao) => {
        if (!formacao) { return; }
        if (index === undefined) {
          this.user.formacao.push(formacao);
        } else {
          this.user.formacao[index] = formacao;
        }
        this.userService.saveUsuario({...this.user});
      });
    } else if(tipo === 'idealLocation'){
      this.dialog.open(IdealLocationFormComponent, {data:index}).afterClosed().pipe(take(1)).subscribe((idealLocation: IdealLocation) => {
        console.log(index)
        if (!idealLocation.interesse) { return; }
        if (index === undefined) {
          idealLocation.interesse.forEach(element => {
            this.user.idealLocations.interesse.push(element)
          });
          this.redefineMostAttractiveLocation(idealLocation.maiorInteresse);
        } else {
          idealLocation.interesse.forEach(element => {
            this.user.idealLocations.interesse.push(element)
          });
        }
        this.userService.saveUsuario({...this.user});
      });
    }
     else if (tipo === 'job') {
      this.dialog.open(JobFormComponent, {data: this.user.jobs[index]}).afterClosed().pipe(take(1)).subscribe((job: Job) => {
        if (!job) { return; }
        if (index === undefined) {
          this.user.jobs.push(job);
          this.redefineCurrentJob(job);
        } else {
          this.user.jobs[index] = job;
        }
        this.userService.saveUsuario({...this.user});
      });
    } else if (tipo === 'skills'){
      this.dialog.open(EspecialidadesFormComponent, {data: index}).afterClosed().pipe(take(1)).subscribe((especialidades: Especialidades) => {
        if (!especialidades) { return; }
        this.user.especialidades = especialidades;
        this.createSkillsArray();
        this.userService.saveUsuario({...this.user});  
      });
    } else if(tipo === 'idiomas') {
      this.dialog.open(IdiomasFormComponent, {data: index}).afterClosed().pipe(take(1)).subscribe((idiomas: Idiomas) => {
        if (!idiomas) { return; }
        this.user.idiomas = idiomas;
        console.log('teste')
        this.createLanguagesArray();
        this.userService.saveUsuario({...this.user});  
      });
    } else {
      this.dialog.open(HobbiesFormComponent, {data: index}).afterClosed().pipe(take(1)).subscribe((hobbies: Hobbies) => {
        if (!hobbies) { return; }
        this.user.hobbies = hobbies;
        this.createHobbiesArray();
        this.userService.saveUsuario({...this.user});  
      });
    }
  }

  public uploadImage(ref: HTMLInputElement) {
    ref.click();
  }

  public imageSelected(event) {
    if (!event.target.files[0]) {
      return;
    }
    const file: File = event.target.files[0];
    const fileObj = { file, id: 'profile.' + file.name.split('.').pop(), path: 'profile-pictures/' + this.user.id};
    this.userService.saveProfileImage(fileObj).then(profilePath => {
      this.userService.saveUsuario({...this.user, profilePicture: profilePath});
    });
  }
  
}
