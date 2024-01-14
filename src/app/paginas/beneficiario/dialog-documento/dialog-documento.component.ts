import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

import { Documento } from 'src/app/dominios/documento';

import { Beneficiario } from 'src/app/dominios/beneficiario';
import { BeneficiarioService } from 'src/app/services/beneficiario.service';


export interface DialogData {
  id: number;
  beneficiarioNome: string;
  beneficiarioTelefone: string;
  beneficiarioDataAtualizacao: string;
  beneficiarioDataInclusao: string;
  beneficiarioDataNascimento: string;
}

@Component({
  selector: 'app-dialog-documento',
  templateUrl: './dialog-documento.component.html',
  styleUrls: ['./dialog-documento.component.scss']
})
export class DialogDocumentoComponent implements OnInit {

  documento: Documento = new Documento();
  documentoLista: Documento[] = new Array();
  beneficiario: Beneficiario = new Beneficiario();
  beneficiarioLista: Beneficiario[] = new Array();

  titulo!: string;
  hide = true;
  durationInSeconds = 5;

  form: FormGroup = new FormGroup({
    idDocumento: new FormControl(null),
    documentoTipoDocumento: new FormControl('', [Validators.required]),
    documentoDescricao: new FormControl('', [Validators.required]),
    documentoDataInclusao: new FormControl('', [Validators.required]),
    documentoDataAtualizacao: new FormControl('', [Validators.required]),
  });


  initializeFormGroup() {
    this.form.setValue({
      idDocumento: null,
      documentoTipoDocumento: ' ',
      documentoDescricao: ' ',
      documentoDataInclusao: ' ',
      documentoDataAtualizacao: ' ',
    });
  }



  constructor(

    public beneficiarioService: BeneficiarioService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DialogDocumentoComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: DialogData
  ) { }


  ngOnInit(): void {
    this.titulo = 'Cadastrar Documento';
    this.initializeFormGroup();
    const beneficiario = new Beneficiario();
    this.beneficiario.id = this.data.id;
    this.beneficiario.beneficiarioNome = this.data.beneficiarioNome;
    this.beneficiario.beneficiarioTelefone = this.data.beneficiarioTelefone;

    this.beneficiario.beneficiarioDataNascimento = this.data.beneficiarioDataNascimento;
    this.beneficiario.beneficiarioDataInclusao = this.data.beneficiarioDataInclusao;
    this.beneficiario.beneficiarioDataAtualizacao = this.data.beneficiarioDataAtualizacao;
  }

  onNextDocumento(): void {
    const documento1 = new Documento();
    documento1.documentoTipoDocumento = this.documento.documentoTipoDocumento;
    documento1.documentoDescricao = this.documento.documentoDescricao;
    documento1.documentoDataAtualizacao = this.documento.documentoDataAtualizacao;
    documento1.documentoDataInclusao = this.documento.documentoDataInclusao;
    documento1.id = 0;
    this.beneficiario.documentos.push(documento1);
    this.titulo = 'Cadastrar Documento';
    this.initializeFormGroup();
  }

  onAdd(): void {
    this.onNextDocumento();
    console.info('onAdd() - this.beneficiario.id :',this.beneficiario.id);
    const operation$ = this.beneficiario.id
      ? this.beneficiarioService.updateBeneficiario(this.beneficiario)
      : this.beneficiarioService.addBeneficiario(this.beneficiario);

    operation$.subscribe(
      (response) => {
        const res: any = response;
        const successMessage = this.beneficiario.id
          ? 'Documento atualizado com Sucesso!'
          : 'Documento cadastrado com Sucesso!';

        this.handleSuccessResponse(res, successMessage);
      },
      (error) => {
        this.handleError(error, this.beneficiario.id ? 'atualizar' : 'cadastrar');
      }
    );
  }

  private handleSuccessResponse(res: any, successMessage: string): void {
    if (!res) {
      this.beneficiarioService.getAllBeneficiario().subscribe(
        (beneficiarios) => (this.beneficiarioLista = beneficiarios),
        (error) => this.handleError(error, 'carregar a lista de beneficiários')
      );
      this.snackBar.open(successMessage, '', {
        duration: this.beneficiario.id ? 3000 : 4000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
    } else {
      let errorMessage = 'Ocorreu um erro desconhecido.';
      if (res instanceof HttpErrorResponse && res.error && res.error.message) {
        errorMessage = res.error.message;
      }
      this.snackBar.open('ATENÇÃO:', `Ocorreu um erro. Detalhes: ${errorMessage}`, {
        duration: 4000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
      console.error(res);
    }
  }

  private handleError(error: any, action: string): void {
    let errorMessage = 'Ocorreu um erro ao';

    if (error instanceof HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
        errorMessage += ` ${action}. Detalhes: ${error.error.message}`;
      } else {
        if (error.status !== 201) {
          errorMessage += ` ${action} o Documento! Detalhes: ${error.status} - ${error.statusText}`;
        } else {
          errorMessage = '';
        }
      }
    }

    if (errorMessage !== '') {
      this.snackBar.open('ATENÇÃO:', errorMessage, {
        duration: 4000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });

      console.error(error);
    }
  }

}
