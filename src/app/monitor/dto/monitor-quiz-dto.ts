export interface MonitorQuizDto {
    data: Date;
    quartiere: string;
    domanda: string;
    risposta: string;
    corretto: boolean;
    tempoImpiegato: number;
}