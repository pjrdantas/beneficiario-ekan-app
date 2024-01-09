import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './paginas/home/home.component';
import { BeneficiarioComponent } from './paginas/cadastro/beneficiario/beneficiario.component';
import { DialogDocumentoComponent } from './paginas/cadastro/beneficiario/dialog-documento/dialog-documento.component';



const routes: Routes = [
  {path: 'home', component: HomeComponent},
  { path: 'beneficiario', component: BeneficiarioComponent },
  { path: 'documento', component: DialogDocumentoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
