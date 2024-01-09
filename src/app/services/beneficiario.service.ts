import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { ConfigService } from './config.service';
import { Beneficiario } from '../dominios/beneficiario';

@Injectable({
  providedIn: 'root'
})
export class BeneficiarioService {

  static getAllBeneficiario() {
    throw new Error('Method not implemented.');
  }

  private baseUrlService = '';
  loading = false;


  constructor(
    private httpClient: HttpClient,
    public configService: ConfigService
  )

  {
    this.baseUrlService = configService.getUrlService() + '/beneficiario/';
  }

  getAllBeneficiario(): Observable<Beneficiario[]> {
    this.loading = true;
    return this.httpClient.get<Beneficiario[]>(this.baseUrlService+'findAll/')
    .pipe( finalize(() => this.loading = false));
  }

  getBeneficiario(idBeneficiario: number) {
    return this.httpClient.get<Beneficiario>(this.baseUrlService +'findById/'+ idBeneficiario);
  }

  deleteBeneficiario(idBeneficiario: number) {
    return this.httpClient.delete<Beneficiario>(this.baseUrlService+'delete/' + idBeneficiario);
  }

  addBeneficiario(idBeneficiario: Beneficiario) {
    return this.httpClient.post(this.baseUrlService +'create/', idBeneficiario);
  }

  updateBeneficiario(idBeneficiario: Beneficiario) {
    return this.httpClient.put<Beneficiario>(this.baseUrlService+'update/', idBeneficiario);
  }
}
