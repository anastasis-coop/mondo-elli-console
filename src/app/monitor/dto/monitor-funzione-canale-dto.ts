import { MonitorEsercizioStanzaDto } from './monitor-esercizio-stanza-dto';

export interface MonitorFunzioneCanaleDto {

    livelloRaggiunto: string;
    canale: string;
    esercizi: MonitorEsercizioStanzaDto[];

}