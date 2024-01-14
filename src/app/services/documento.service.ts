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

  deleteDocumento(id: number): Observable<Documento> {
    return this.httpClient.delete<Documento>(this.baseUrlService + 'delete/' + id);
  }


}
