import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  powerOn!: boolean;
  powerOff!: boolean;


  constructor(private appComponent: AppComponent) { }

  ngOnInit(): void {
    this.powerOn=true;
    this.powerOff=false;
  }

  entrar(){
    this.powerOn=false;
    this.powerOff=true;
    this.appComponent.logIn();
  }

  sair(){
    this.powerOn=true;
    this.powerOff=false;
    this.appComponent.logOut();
  }

}
