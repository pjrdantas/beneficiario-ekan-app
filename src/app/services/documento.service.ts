import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { ConfigService } from './config.service';
import { Documento } from '../dominios/documento';

@Injectable({
  providedIn: 'root'
})
export class DocumentoService {

  static getAllDocumento() {
    throw new Error('Method not implemented.');
  }

  private baseUrlService = '';
  loading = false;


  constructor(
    private httpClient: HttpClient,
    public configService: ConfigService
  ) {
    this.baseUrlService = configService.getUrlService() + '/documento/';
  }

  getAllDocumento(): Observable<Documento[]> {
    this.loading = true;
    return this.httpClient.get<Documento[]>(this.baseUrlService+'findAll/')
    .pipe( finalize(() => this.loading = false));
  }

  getDocumento(id: number) {
    return this.httpClient.get<Documento>(this.baseUrlService +'findById/'+ id);
  }

  deleteDocumento(id: number) {
    return this.httpClient.delete<Documento>(this.baseUrlService+'delete/' + id);
  }

  addDocumento(id: Documento) {
    return this.httpClient.post(this.baseUrlService +'create/', id);
  }

  updateDocumento(id: Documento) {
    return this.httpClient.put<Documento>(this.baseUrlService+'update/', id);
  }
}
