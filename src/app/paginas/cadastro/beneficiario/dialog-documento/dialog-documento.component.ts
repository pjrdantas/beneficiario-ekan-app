import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, of } from 'rxjs';

import { Beneficiario } from 'src/app/dominios/beneficiario';
import { BeneficiarioService } from 'src/app/services/beneficiario.service';
import { ErrorDialogComponent } from 'src/app/shared/error-dialog/error-dialog.component';



export interface DialogData {
  idBeneficiario: number;
}


@Component({
  selector: 'app-dialog-documento',
  templateUrl: './dialog-documento.component.html',
  styleUrls: ['./dialog-documento.component.scss']
})
export class DialogDocumentoComponent implements OnInit {

  beneficiario: Beneficiario = new Beneficiario();
  beneficiarioLista: Beneficiario[] = new Array();

  titulo!: string;
  hide = true;
  durationInSeconds = 5;



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
      beneficiarioNome: '',
      beneficiarioTelefone: '',
      beneficiarioDataNascimento: '',
      beneficiarioDataAtualizacao: '',
      beneficiarioDataInclusao: '',
    });
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg,
    });
  }

  constructor(
    private beneficiarioService: BeneficiarioService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<DialogDocumentoComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: DialogData
  ) { }

  ngOnInit(): void {



    if (this.data.idBeneficiario === 0) {
      this.titulo = 'Cadastrar Beneficiario';
      this.initializeFormGroup();
    } else {
      this.titulo = 'Editar Beneficiario';
      this.beneficiarioService.getBeneficiario(Number(this.data.idBeneficiario)).subscribe((res) => (this.beneficiario = res));
    }
  }



  salvar(): void {
    if (this.beneficiario.idBeneficiario === undefined) {
      this.beneficiarioService
        .addBeneficiario(this.beneficiario)
        .subscribe(
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
  }
}
