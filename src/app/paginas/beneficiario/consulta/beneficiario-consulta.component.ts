import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, of } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { MatDialog } from '@angular/material/dialog';
import { Beneficiario } from 'src/app/dominios/beneficiario';
import { BeneficiarioService } from 'src/app/services/beneficiario.service';
import { ErrorDialogComponent } from 'src/app/shared/error-dialog/error-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-beneficiario-consulta',
  templateUrl: './beneficiario-consulta.component.html',
  styleUrls: ['./beneficiario-consulta.component.scss']
})
export class BeneficiarioConsultaComponent implements OnInit {


  public beneficiarioLista: Beneficiario[] = new Array();
  public beneficiario: Beneficiario = new Beneficiario();

  titulo!: string;
  filter: string = '';
  paginaAtual: number = 1;
  contador = 10;

  constructor(
    private snackBar: MatSnackBar,
    public beneficiarioService: BeneficiarioService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit() {
    this.titulo = 'Beneficiarios';
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
        return of([]);
      }),
      finalize(() => {
      })
    )
      .subscribe((res) => {
        this.beneficiarioLista = res;
      });
  }

  onAdd(): void {
    this.router.navigate(['/beneficiario-cadastro']);
  }


  onEditar(id: number, index: number): void {
    this.router.navigate(['/beneficiario-cadastro', id]);
  }

  onRemove(id: number, index: number): void {
    this.beneficiarioService.deleteBeneficiario(id).pipe(
      catchError(error => {
        let errorMessage = '';
        errorMessage = 'Não foi possível excluir o cadastro.';
        this.onError(errorMessage, true);
        return of([])
      })
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
