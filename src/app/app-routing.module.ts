import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './paginas/home/home.component';
import { BeneficiarioCadastroComponent } from './paginas/beneficiario/cadastro/beneficiario-cadastro.component';
import { BeneficiarioConsultaComponent } from './paginas/beneficiario/consulta/beneficiario-consulta.component';
import { DialogDocumentoComponent } from './paginas/beneficiario/dialog-documento/dialog-documento.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent},

  { path: 'beneficiario-consulta', component: BeneficiarioConsultaComponent },
  { path: 'beneficiario-cadastro', component: BeneficiarioCadastroComponent },
  { path: 'beneficiario-cadastro/:id', component: BeneficiarioCadastroComponent },

  { path: 'documento', component: DialogDocumentoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
