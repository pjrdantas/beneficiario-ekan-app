import { Documento } from "./documento";

export class Beneficiario {

  id!: number;
  beneficiarioNome!: string;
  beneficiarioTelefone!: string;
  beneficiarioDataAtualizacao!: Date;
  beneficiarioDataInclusao!: Date;
  beneficiarioDataNascimento!: Date;

  documentos: Documento[] = [];
}

