import { Documento } from "./documento";

export class Beneficiario {

  idBeneficiario!: number;
  beneficiarioNome!: string;
  beneficiarioTelefone!: string;
  beneficiarioDataAtualizacao!: Date;
  beneficiarioDataInclusao!: Date;
  beneficiarioDataNascimento!: Date;

  tbDocumentos: Documento[] = []; // Agora é um array para armazenar múltiplos documentos


}

