import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;
  isVerified:Boolean = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService) { }

  ngOnInit() {
  }

  onLoginSubmit() {
    const user = {
      username: this.username,
      password: this.password
    }

    this.authService.authenticateUser(user).subscribe(
      res => {
        this.authService.storeUserData(res.token, res.user);
        this.flashMessage.show('You are now logged in', {cssClass: 'alert-success', timeout: 5000});
        this.router.navigate(['dashboard']);
      },err => {
        err=err.json();
        this.flashMessage.show(err.msg, {cssClass: 'alert-danger', timeout: 5000});
    });
  }

}
