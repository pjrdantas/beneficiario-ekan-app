import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  mostrarBenificiario!: boolean;

  ngOnInit(): void {
    this.mostrarBenificiario = false
  }

  logIn(){
   this.mostrarBenificiario = true;
  }

  logOut(){
    this.mostrarBenificiario = false;
  }
}
