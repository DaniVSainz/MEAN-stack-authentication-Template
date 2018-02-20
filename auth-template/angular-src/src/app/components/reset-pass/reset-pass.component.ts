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
  constructor(private authService:AuthService){}

  ngOnInit() {

  }

  resetPwSubmit(){
    this.authService.resetPassword(this.email).subscribe(res=>{
      console.log(res);
    })
  }

}
