export interface PercorsoDto {
    id: number;
    tipo: string;
    nome: string;
    inizioPercorso: Date;
    inizioPercorsoEffettivo: Date;
    finePercorso: Date;
    durataFunzioneEsecutivaGiorni: number;
    periodoIntroduzione: boolean;
    mediaLiteracy: boolean;
    archiviato: boolean;
    numeroUtenti: number;
    numeroOperatori: number;
    stato: string;
}