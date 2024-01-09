import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, of } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { Beneficiario } from 'src/app/dominios/beneficiario';
import { BeneficiarioService } from 'src/app/services/beneficiario.service';
import { ErrorDialogComponent } from 'src/app/shared/error-dialog/error-dialog.component';
import { DialogDocumentoComponent } from './dialog-documento/dialog-documento.component';

export interface DialogData {
  idBeneficiario: number;
}

@Component({
  selector: 'app-beneficiario',
  templateUrl: './beneficiario.component.html',
  styleUrls: ['./beneficiario.component.scss']
})
export class BeneficiarioComponent implements OnInit {


  titulo!: string;
  filter: string = '';
  paginaAtual: number = 1;
  contador = 10;

  beneficiario: Beneficiario = new Beneficiario();
  beneficiarioLista: Beneficiario[] = new Array();

  constructor(
    private snackBar: MatSnackBar,
    public beneficiarioService: BeneficiarioService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.titulo = 'Cadastro de Beneficiario';
    this.filter = '';
     this.getList();
  }

  onError(errorMsg: string, showContactAdminMessage: boolean) {
    this.dialog.open(ErrorDialogComponent, {
      data: { message: errorMsg, showContactAdminMessage: showContactAdminMessage },
    });
  }

  getList(): void {
    this.beneficiarioService.getAllBeneficiario().pipe(
      catchError((error) => {
        let errorMessage = 'Ocorreu um erro ao tentar carregar a Lista de Beneficiario.';

        if (error.status === 404) {
          errorMessage = 'A Lista de Beneficiario está vazia.';
        }

        this.onError(errorMessage, error.status !== 404);

        // Retorna um observable vazio para não quebrar a cadeia de observáveis
        return of([]);
      }),
      finalize(() => {
        // Lógica a ser executada após a conclusão (sucesso ou falha) da chamada assíncrona
        // Pode ser útil para parar carregamentos ou ocultar indicadores de carregamento
      })
    )
    .subscribe((res) => {
      // Atribui a resposta à propriedade beneficiarioLista
      this.beneficiarioLista = res;
    });
  }

  onAdd() {
    const dialogRef = this.dialog.open(DialogDocumentoComponent, {
     width: '410px',
     height: '440px',
     data: { idBeneficiario: 0 },
   });

   dialogRef.afterClosed().subscribe((result) => {
     this.getList();
   });
 }

 onEditar(idBeneficiario: number, index: number): void {
  const dialogRef = this.dialog.open(DialogDocumentoComponent, {
   width: '500px',
   height: '400px',
   data: { idBeneficiario: idBeneficiario },
 });

 dialogRef.afterClosed().subscribe((result) => {
   this.getList();
 });
}

onRemove(idBeneficiario: number, index: number): void {
  this.beneficiarioService.deleteBeneficiario(idBeneficiario).pipe(
    catchError(error => {
      let errorMessage = '';
      errorMessage = 'Não foi possível excluir o cadastro.';
          this.onError(errorMessage, true);
      return of([])})
  ).subscribe(
    (response) => {
      this.beneficiarioService.getAllBeneficiario().subscribe((res) => (this.beneficiarioLista = res));
      this.snackBar.open('Beneficiario excluido com Sucesso!', '', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
    }
  );
}

}
