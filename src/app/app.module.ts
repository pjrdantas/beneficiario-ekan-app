import { NgModule, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from "@angular/flex-layout";

import { AppRoutingModule } from './app-routing.module';
import { CommonModule, DatePipe } from '@angular/common';
import { A11yModule } from '@angular/cdk/a11y';
import { CdkTableModule } from '@angular/cdk/table';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { registerLocaleData } from '@angular/common';
import Localept from '@angular/common/locales/pt';
registerLocaleData(Localept);

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { KzMaskDirective } from './shared/util/kz-mask.directive';
import { SortDirective } from './shared/util/sort.directive';
import { CPFPipe } from './shared/util/cpf.pipe';
import { TextMaskModule } from 'angular2-text-mask';
import { NgxMaskModule, IConfig } from 'ngx-mask';

import { AppComponent } from './app.component';
import { HomeComponent } from './paginas/home/home.component';
import { BeneficiarioCadastroComponent } from './paginas/beneficiario/cadastro/beneficiario-cadastro.component';
import { BeneficiarioConsultaComponent } from './paginas/beneficiario/consulta/beneficiario-consulta.component';
import { DialogDocumentoComponent } from './paginas/beneficiario/dialog-documento/dialog-documento.component';
import { ErrorDialogComponent } from './shared/error-dialog/error-dialog.component';
import { ConfigService } from './services/config.service';
import { BeneficiarioService } from './services/beneficiario.service';
import { DocumentoService } from './services/documento.service';
import { InputMaskDirective } from './shared/util/InputMaskDirective.directive';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = {};

@NgModule({
  declarations: [
    CPFPipe,
    InputMaskDirective,
    SortDirective,
    KzMaskDirective,
    AppComponent,
    HomeComponent,
    BeneficiarioCadastroComponent,
    BeneficiarioConsultaComponent,
    DialogDocumentoComponent,
    ErrorDialogComponent,



  ],
  imports: [

    BrowserModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    NgbModule,
    CommonModule,
    A11yModule,
    CdkTableModule,
    PortalModule,
    ScrollingModule,
    HttpClientModule,
    NgxPaginationModule,
    NgxMaskModule,
    Ng2SearchPipeModule,
    TextMaskModule,
    AppRoutingModule,
    NgxMaskModule,
    NgxMaskModule.forRoot()

  ],
  exports: [InputMaskDirective

  ],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }, ConfigService, BeneficiarioService, DocumentoService, DatePipe],
  bootstrap: [AppComponent],
  entryComponents: [ErrorDialogComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
