import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'trainings-front-app';
  isAuth = false;

  constructor(){
    if(localStorage.getItem('user')) this.isAuth = true;
  }

  ngDoCheck(){
    if(localStorage.getItem('user')) this.isAuth = true;
    else this.isAuth = false;
  }

  onDeco(){
    localStorage.removeItem('user');
  }
}
