import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private flashMessage:FlashMessagesService){

  }

  networkStatusMessage(){
    if (navigator.onLine){
      this.flashMessage.show(`You're back online now` , {cssClass: 'alert-success', timeout: 3000});
    } else {
      this.flashMessage.show(`You're lost network connection` , {cssClass: 'alert-success', timeout: 3000});
    }
  }

  ngOnInit(){
    this.networkStatusMessage();
    window.addEventListener('online' , this.networkStatusMessage);
    window.addEventListener('offline', this.networkStatusMessage);
  }
}
