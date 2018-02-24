import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  networkOnline:Boolean = true;


  constructor(private flashMessage:FlashMessagesService){
  }

  ngOnInit(){
    window.addEventListener('online' , ()=>{
      this.flashMessage.show(`You're back online now` , {cssClass: 'alert-success', timeout: 3000});
    });
    window.addEventListener('offline', ()=>{
      this.networkOnline=false;
      this.flashMessage.show(`You've lost network connection` , {cssClass: 'alert-danger', timeout: 3000});
    });
  }

}
