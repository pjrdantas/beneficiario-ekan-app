import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  powerOn!: boolean;
  powerOff!: boolean;


  constructor(private router: Router) { }

  ngOnInit(): void {
    this.powerOn=true;
    this.powerOff=false;
  }

  entrar(){
    this.powerOn=false;
    this.powerOff=true;
    this.router.navigate(['/beneficiario-consulta']);
  }

  sair(){
    this.powerOn=true;
    this.powerOff=false;
    this.router.navigate(['/']);
  }

}
