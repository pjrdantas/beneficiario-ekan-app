import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';  // Importe finalize corretamente
import { ConfigService } from './config.service';
import { Beneficiario } from '../dominios/beneficiario';

@Injectable({
  providedIn: 'root',
})
export class BeneficiarioService {
  private baseUrlService = '';
  loading = false;

  constructor(private httpClient: HttpClient, public configService: ConfigService) {
    this.baseUrlService = configService.getUrlService() + '/beneficiario/';
  }

  getAllBeneficiario(): Observable<Beneficiario[]> {
    this.loading = true;
    return this.httpClient.get<Beneficiario[]>(this.baseUrlService + 'findAll/')
      .pipe(finalize(() => this.loading = false));  // Corrija a aplicação do finalize
  }

  getBeneficiarioByID(idBeneficiario: number): Observable<Beneficiario> {
    return this.httpClient.get<Beneficiario>(this.baseUrlService + 'findById/' + idBeneficiario);
  }

  getBeneficiarioByNome(beneficiarioNome: string): Observable<Beneficiario> {
    const url = `${this.baseUrlService}findByNome/${beneficiarioNome}`;
    return this.httpClient.get<Beneficiario>(url);
  }

  deleteBeneficiario(idBeneficiario: number): Observable<Beneficiario> {
    return this.httpClient.delete<Beneficiario>(this.baseUrlService + 'delete/' + idBeneficiario);
  }

  addBeneficiario(beneficiario: Beneficiario): Observable<any> {
    return this.httpClient.post(this.baseUrlService + 'create/', beneficiario);
  }

  updateBeneficiario(beneficiario: Beneficiario): Observable<any> {
    return this.httpClient.put(this.baseUrlService + 'update/', beneficiario);
  }
}
