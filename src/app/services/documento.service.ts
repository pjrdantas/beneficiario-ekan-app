import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { ConfigService } from './config.service';
import { Documento } from '../dominios/documento';

@Injectable({
  providedIn: 'root'
})
export class DocumentoService {
  private baseUrlService = '';
  loading = false;

  constructor(
    private httpClient: HttpClient,
    public configService: ConfigService
  ) {
    this.baseUrlService = configService.getUrlService() + '/documento/';
  }

  getAllDocumentoByBeneficiarioId(beneficiarioId: number): Observable<Documento[]> {
    this.loading = true;
    return this.httpClient.get<Documento[]>(this.baseUrlService + `findAllByBeneficiarioId/${beneficiarioId}`).pipe(
      finalize(() => this.loading = false)
    );
  }

  getDocumento(id: number) {
    return this.httpClient.get<Documento>(this.baseUrlService + `findById/${id}`);
  }

  deleteDocumento(id: number) {
    return this.httpClient.delete<Documento>(this.baseUrlService + `delete/${id}`);
  }

  addDocumento(documento: Documento) {
    return this.httpClient.post(this.baseUrlService + 'create/', documento);
  }

  updateDocumento(documento: Documento) {
    return this.httpClient.put<Documento>(this.baseUrlService + 'update/', documento);
  }
}
