import { ValidateService } from './../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-submit-password-reset',
  templateUrl: './submit-password-reset.component.html',
  styleUrls: ['./submit-password-reset.component.scss']
})
export class SubmitPasswordResetComponent implements OnInit {
  email:String;
  password:String;
  passwordB:String;
  
  constructor(private authService:AuthService,
              private flashMessage:FlashMessagesService,
              private validateService:ValidateService){}

  ngOnInit() {
  }

  passwordResetSubmit(){

    const user= {
      email:this.email,
      password:this.password,
      passwordB:this.passwordB
    }

    if(this.validateService.validatePassword(user)){
      this.authService.resetPasswordRequestSubmission(user).subscribe(res=>{
        console.log('Inside response from service');
      })
    }else{
      this.flashMessage.show('Your passwords are not identical', {cssClass: 'alert-danger', timeout: 3000});
    }
  }

}
