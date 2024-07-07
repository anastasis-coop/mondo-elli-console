import { MonitorFunzioneCanaleDto } from './monitor-funzione-canale-dto';

export interface MonitorFunzioneDto {

    funzione: string;
    canaleVisivo: MonitorFunzioneCanaleDto;
    canaleUditivoVerbale: MonitorFunzioneCanaleDto;

}