import { ActivatedRoute, Router } from '@angular/router';
import { ValidateService } from './../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss']
})
export class EmailVerificationComponent implements OnInit {

  token:String;

  constructor(private authService:AuthService,
    private flashMessage:FlashMessagesService,
    private validateService:ValidateService,
    private route: ActivatedRoute,
    private router: Router,
  ){}

  ngOnInit() {
    this.route.params.subscribe(params=>{
    this.token = params.token;
  })
    console.log(this.token);
  }

}
