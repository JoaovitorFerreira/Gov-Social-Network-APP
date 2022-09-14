import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../model/user';
import {UserDetails} from '../../model/user-details';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  user: User = new User();
  loading = false;
  returnUrl: string;
  signuperror: any ;
  dangerBox = false;
  submitattempt = false;
  profilePhoto: File;

  constructor(
    private router: Router,
  ) {}

  ngOnInit() {
  }

  redirect(userDetails: UserDetails): string{
    let redirectUrl: string = null;
    if(this.hasRole('PROFESSIONAL', userDetails)) 
      redirectUrl = '/feed';
    else if(this.hasRole('ADMIN', userDetails))
      redirectUrl = '/admin';

    return redirectUrl;
  }

  hasRole(rolename: string , userDetails: UserDetails): boolean{
    let flag = false;
    if(userDetails) {
      userDetails.roles.forEach((role) => {
        if (role === rolename)
          flag = true;
      });
    }
    return flag;
  }

  setProfilePhoto(inputElement){
    this.profilePhoto = inputElement.files[0];
  }
  
  signup(signupForm) {
    if (signupForm.form.valid  && (this.user.password === this.user.passwordConfirm)) {

      const formWrapper = new FormData();
      
      const userBlob = new Blob([JSON.stringify(this.user)], { type: 'application/json'});
      if (this.profilePhoto) {
        formWrapper.append('imageFile' , this.profilePhoto , 'profilePhoto');
      }
      
      formWrapper.append('object', userBlob );
      this.loading = true;
    }
    else{
      this.submitattempt = true;
      this.dangerBox = false;
    }
  }
}
