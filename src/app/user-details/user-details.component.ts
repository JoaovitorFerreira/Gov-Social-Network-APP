import { SkillsAndExperience } from './../model/skills-experience';
import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { Router } from '@angular/router';
import { UserDetails } from '../model/user-details';
import { Connection } from '../model/connection';
import { UserDetailsService } from './user-details.service';
import { Usuario } from '../core/models/usuario.model';
import { HeaderService } from '../header/header.service';
import { MatDialog } from '@angular/material/dialog';
import { FormacaoFormComponent } from '../formacao-form/formacao-form.component';
import { JobFormComponent } from '../job-form/job-form.component';
import { EspecialidadesFormComponent } from '../especialidades-form/especialidades-form.component';
import { take } from 'rxjs';
import { Especialidades } from '../core/models/especialidades.model';
import { Job } from '../core/models/job.model';
import { Formacao } from '../core/models/formacao.model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
  providers: [UserDetailsService]
})
export class UserDetailsComponent implements OnInit {
  isSelfUser: boolean = false;
  user: Usuario;
  skillsexperience: SkillsAndExperience = new SkillsAndExperience();
  validprofphoto = true;
  changeButton = false;
  userDetails: UserDetails;
  userNetwork: User[] = new Array<User>();
  requestConnectButton = false;
  connectPendingButton = false;
  connectedButton = false;
  networkButton = false;

  usersFollowing:  Connection[] = new Array<Connection>();
  userFollowedBy:  Connection[] = new Array<Connection>();
  especialidades: string[] = [];
  closeResult = '';

  constructor(
    private router: Router, 
    private headerService: HeaderService,
    private userService: UserDetailsService,
    private dialog: MatDialog
    ) {
      const id = router.url.split('/').pop();
      console.log('user details --> ', router.url, id);
      this.isSelfUser = id === 'self';
      this.loadUser(id);
    }

  ngOnInit(): void {
  }

  private async loadUser(id: string) {
    if (this.isSelfUser) {
      this.user = this.headerService.dadosUsuario;
      this.user.profilePicture = await this.getPhoto(this.user.profilePicture);
      this.createSkillsArray();
    } else {
      this.userService.getUsuario(id).then(async usuario => {
        usuario.profilePicture = await this.getPhoto(usuario.profilePicture);
        this.user = usuario;
        this.createSkillsArray();
      }).catch(error => {
        console.log('error getting user --> ', error);
      });
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

  private getPhoto(path: string): Promise<string> {
    if (!path) {
      return Promise.resolve('https://www.donkey.bike/wp-content/uploads/2020/12/user-member-avatar-face-profile-icon-vector-22965342-e1608640557889.jpg');
    }
    return this.userService.getPhoto(path);
  }

  private redefineCurrentJob(job: Job) {
    this.user.currentJob = job;
  }

  open(tipo: 'job' | 'skills' | 'formacao', index?: number) {
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
    } else if (tipo === 'job') {
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
    } else {
      this.dialog.open(EspecialidadesFormComponent, {data: index}).afterClosed().pipe(take(1)).subscribe((especialidades: Especialidades) => {
        if (!especialidades) { return; }
        this.user.especialidades = especialidades;
        this.createSkillsArray();
        this.userService.saveUsuario({...this.user});  
      });
    }
  }
  
}
