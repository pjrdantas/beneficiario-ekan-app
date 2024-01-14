import { Documento } from "./documento";

export class Beneficiario {

  id!: number;
  beneficiarioNome!: string;
  beneficiarioTelefone!: string;
  beneficiarioDataAtualizacao!: string;
  beneficiarioDataInclusao!: string;
  beneficiarioDataNascimento!: string;

  documentos: Documento[] = [];
}

