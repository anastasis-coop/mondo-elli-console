export interface MonitorEsercizioStanzaDto {

    inizio: Date;
    durata: number;
    livello: string;
    funzioneEsecutiva: string;
    canale: string;
    numeroStimoliCorretti: number;
    numeroStimoliErrati: number;
    numeroStimoliSaltati: number;
    tempoReazioneMedio: number; // in ms
    tempoEsposizioneOggetti: number; // in ms
    feedbackAttenzione: number;
    fine: Date;
    statoLivello: string;
    accuratezza: number;

}