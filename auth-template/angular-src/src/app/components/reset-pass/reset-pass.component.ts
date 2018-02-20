import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.scss']
})
export class ResetPassComponent implements OnInit {
  email:String;
  success:Boolean;
  constructor(private authService:AuthService,
              private flashMessage:FlashMessagesService){}

  ngOnInit() {

  }

  resetPwSubmit(){
    this.authService.resetPassword(this.email).subscribe(res=>{
      this.success = res.success;
      this.flashMessage.show(res.msg, {cssClass: 'alert-danger', timeout: 3000});
    })
  }

}
