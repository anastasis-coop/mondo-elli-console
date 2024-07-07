import { ComuneDto } from "./comune-dto";

export interface CentroDto {
    id: number;
    nome: string;
    codice: string;
    comune: ComuneDto;
}