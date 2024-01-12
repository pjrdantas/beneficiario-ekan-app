import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, of } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { Beneficiario } from 'src/app/dominios/beneficiario';
import { BeneficiarioService } from 'src/app/services/beneficiario.service';
import { Documento } from 'src/app/dominios/documento';
import { DocumentoService } from 'src/app/services/documento.service';
import { ErrorDialogComponent } from 'src/app/shared/error-dialog/error-dialog.component';
import { DialogDocumentoComponent } from './dialog-documento/dialog-documento.component';

export interface DialogData {
  idBeneficiario: number;
  beneficiarioNome: string;
  beneficiarioTelefone: string;
  beneficiarioDataAtualizacao: Date;
  beneficiarioDataInclusao: Date;
  beneficiarioDataNascimento: Date;
}

@Component({
  selector: 'app-beneficiario',
  templateUrl: './beneficiario.component.html',
  styleUrls: ['./beneficiario.component.scss']
})
export class BeneficiarioComponent implements OnInit {

  beneficiario: Beneficiario = new Beneficiario();
  beneficiarioLista: Beneficiario[] = new Array();

  documento: Documento = new Documento();
  documentoLista: Documento[] = new Array();

  titulo!: string;
  filter: string = '';
  paginaAtual: number = 1;
  contador = 5;

  form: FormGroup = new FormGroup({
    idBeneficiario: new FormControl(null),
    beneficiarioNome: new FormControl('', [Validators.required]),
    beneficiarioTelefone: new FormControl('', [Validators.required]),
    beneficiarioDataNascimento: new FormControl('', [Validators.required]),
    beneficiarioDataAtualizacao: new FormControl('', [Validators.required]),
    beneficiarioDataInclusao: new FormControl('', [Validators.required]),

  });

  initializeFormGroup() {
    this.form.setValue({
      idBeneficiario: null,
      beneficiarioNome: ' ',
      beneficiarioTelefone: ' ',
      beneficiarioDataNascimento: ' ',
      beneficiarioDataAtualizacao: ' ',
      beneficiarioDataInclusao: ' ',
    });
  }


  constructor(
    private snackBar: MatSnackBar,
    public beneficiarioService: BeneficiarioService,
    public documentoService: DocumentoService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.titulo = 'Cadastro de Beneficiario';
    this.filter = '';
    this.getList();
  }

  addDocumento(): void {
    const dialogRef = this.dialog.open(DialogDocumentoComponent, {
      width: '460px',
      height: '430px',
      data: {
        idBeneficiario: 0,
        beneficiarioNome: this.beneficiario.beneficiarioNome,
        beneficiarioTelefone: this.beneficiario.beneficiarioTelefone,
        beneficiarioDataNascimento: this.beneficiario.beneficiarioDataNascimento,
        beneficiarioDataAtualizacao: this.beneficiario.beneficiarioDataAtualizacao,
        beneficiarioDataInclusao: this.beneficiario.beneficiarioDataInclusao
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getList();
    });
  }

  onError(errorMsg: string, showContactAdminMessage: boolean) {
    this.dialog.open(ErrorDialogComponent, {
      data: { message: errorMsg, showContactAdminMessage: showContactAdminMessage },
    });
  }


  getList(): void {
    console.log("O NOME CARREGADO AQUI É :", this.beneficiario.beneficiarioNome);
    if (this.beneficiario.beneficiarioNome !== undefined) {
      this.getBeneficiarioPorNome(this.beneficiario.beneficiarioNome);
    }
    this.beneficiarioService.getAllBeneficiario().pipe(
      catchError((error) => {
        let errorMessage = 'Ocorreu um erro ao tentar carregar a Lista de Beneficiario.';

        if (error.status === 404) {
          errorMessage = 'A Lista de Beneficiario está vazia.';
        }
        this.onError(errorMessage, error.status !== 404);
        return of([]);
      }),
      finalize(() => {
      })
    )
      .subscribe((res) => {
        this.beneficiarioLista = res;
      });
  }


  onRemove(idBeneficiario: number, index: number): void {
    this.beneficiarioService.deleteBeneficiario(idBeneficiario).pipe(
      catchError(error => {
        let errorMessage = '';
        errorMessage = 'Não foi possível excluir o cadastro.';
        this.onError(errorMessage, true);
        return of([])
      })
    ).subscribe(
      (response) => {
        this.beneficiarioService.getAllBeneficiario().subscribe((res) => (this.beneficiarioLista = res));
        this.initializeFormGroup();
        this.snackBar.open('Beneficiario excluido com Sucesso!', '', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      }
    );
  }

  getBeneficiarioPorNome(beneficiarioNome: string): void {
    this.beneficiarioService.getBeneficiarioByNome(beneficiarioNome).pipe(
      catchError((error) => {
        let errorMessage = 'Ocorreu um erro ao tentar carregar o beneficiário.';
        console.error(errorMessage);
        return of(null);
      }),
      finalize(() => {
      })
    )
      .subscribe((beneficiario) => {
        if (beneficiario !== null && beneficiario !== undefined) {
          this.beneficiario = beneficiario;
          if (this.beneficiario.hasOwnProperty('id')) {
            console.error('Beneficiário id:', this.beneficiario.id);
            this.getListDocumentoByBeneficiarioId(this.beneficiario.id);
          } else {
            console.error('Beneficiário não possui a propriedade idBeneficiario.');
          }
        } else {
          console.error('Beneficiário é nulo ou indefinido.');
        }
      });
  }

  getListDocumentoByBeneficiarioId(beneficiarioId: number): void {
    this.documentoService.getAllDocumentoByBeneficiarioId(this.beneficiario.id).pipe(
      catchError((error) => {
        let errorMessage = 'Ocorreu um erro ao tentar carregar a lista de documentos.';
        if (error.status === 404) {
          errorMessage = 'A lista de documentos está vazia.';
        }
        this.onError(errorMessage, error.status !== 404);
        return of([]);
      }),
      finalize(() => {
      })
    )
      .subscribe((res) => {
        this.documentoLista = res;
      });
  }











  onSelect(idBeneficiario: number, index: number): void {

  }

  onEditar(idBeneficiario: number, index: number): void {/*
  const dialogRef = this.dialog.open(DialogDocumentoComponent, {
   width: '700px',
   height: '340px',
   data: { idBeneficiario: idBeneficiario },
 });

 dialogRef.afterClosed().subscribe((result) => {
   this.getList();
 }); */
  }



  salvar(): void { /*
  if (this.beneficiario.idBeneficiario === undefined) {
    this.beneficiarioService.addBeneficiario(this.beneficiario).subscribe(
        (response) => {
          const res: Response = response as Response;
          if (res === null) {
            this.beneficiarioService.getAllBeneficiario().subscribe((res) => (this.beneficiarioLista = res));
            this.snackBar.open('Beneficiario cadastrado com Sucesso!','',
              {
                duration: 4000,
                horizontalPosition: 'right',
                verticalPosition: 'top',
              }
            );
          } else {
            this.snackBar.open('ATENÇÃO:','Ocorreu um erro ao Cadastrar o Beneficiario!',
              {
                duration: 4000,
                horizontalPosition: 'right',
                verticalPosition: 'top',
              }
            );
            console.error(res);
          }
        },
        (erro) => {
          this.snackBar.open('ATENÇÃO:','Ocorreu um erro ao Cadastrar o Beneficiario!',
            {
              duration: 4000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
            }
          );
          console.error(erro);
        }
      );
  } else {
    this.beneficiarioService
      .updateBeneficiario(this.beneficiario)
      .subscribe(
        (response) => {
          const res: Response = response as unknown as Response;
          if (res === null) {
            this.beneficiarioService.getAllBeneficiario().subscribe((res) => (this.beneficiarioLista = res));
            this.snackBar.open('Beneficiario atualizado com Sucesso!','',
              {
                duration: 3000,
                horizontalPosition: 'right',
                verticalPosition: 'top',
              }
            );
          } else {
            this.snackBar.open('ATENÇÃO:','Ocorreu um erro ao Cadastrar o Beneficiario!',
              {
                duration: 4000,
                horizontalPosition: 'right',
                verticalPosition: 'top',
              }
            );
            console.error(res);
          }
        },
        (erro) => {
          this.snackBar.open(
            'ATENÇÃO:','Ocorreu um erro ao Cadastrar o Beneficiario!',
            {
              duration: 4000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
            }
          );
          console.error(erro);
        }
      );
      }
    */}
/*
    onErrorRemove(errorMessage: string, isError: boolean): void {
      console.error(errorMessage);
    }
  */

    /*
    onErrorDocumento(errorMsg: string, showContactAdminMessage: boolean) {
      this.dialog.open(ErrorDialogComponent, {
        data: { message: errorMsg, showContactAdminMessage: showContactAdminMessage },
      });
    }

*/
  onRemoveDocumento(idDocumento: number, index: number): void { /*
  this.documentoService.deleteDocumento(idDocumento).pipe(
    catchError(error => {
      let errorMessage = 'Não foi possível excluir o cadastro.';
      this.onErrorRemove(errorMessage, true);
      return of([]);
    })
  ).subscribe(
    () => {
      this.documentoService.getAllDocumento().subscribe((res) => {
        this.documentoLista = res;
        this.snackBar.open('Documento excluído com sucesso!', '', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      });
    }
  ); */
  }

  /*
    getListDocumento(): void {
      this.documentoService.getAllDocumento().pipe(
        catchError((error) => {
          let errorMessage = 'Ocorreu um erro ao tentar carregar a Lista de Documentos do Beneficiario.';
          if (error.status === 404) {
            errorMessage = 'A Lista de documentos do Beneficiario está vazia.';
          }
          this.onErrorDocumento(errorMessage, error.status !== 404);
          return of([]);
        }),
        finalize(() => {
        })
      )
      .subscribe((res) => {
        this.documentoLista = res;
      });
    }

  */

}
