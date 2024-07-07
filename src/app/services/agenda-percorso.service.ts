import { Injectable } from '@angular/core';
import { QUARTIERE, QUARTIERI } from '../constants/QUARTIERE';

export interface Periodo {
  quartiere: string;
  inizio: Date;
  fine: Date;
}

const DAY_MS = 24 * 60 * 60 * 1000;

@Injectable({
  providedIn: 'root'
})
export class AgendaPercorsoService {

  constructor() { }

  addDays(date: Date, days: number): Date {
    return new Date(date.getTime() + days * DAY_MS);
  }

  calcolaDatePercorsoSenzaIntroduzione(inizioPercorso: Date, giorniFunzioneEsecutiva: number): Periodo[] {
    let periodi: Periodo[] = [];
    let current: Date = inizioPercorso;
    QUARTIERI.forEach(quartiere => {
      if (quartiere !== QUARTIERE.INTRODUZIONE && quartiere !== QUARTIERE.MEDIA_LITERACY) {
        let inizio: Date = current;
        let fine: Date = this.addDays(inizio, giorniFunzioneEsecutiva - 1);
        current = this.addDays(fine, 1);
        periodi.push({ quartiere, inizio, fine });
      }
    });
    return periodi;
  }

  calcolaDatePercorsoConIntroduzione(inizioPercorso: Date, giorniIntroduzione: number, giorniFunzioneEsecutiva: number): Periodo[] {
    let periodi: Periodo[] = [];
    let inizio: Date = inizioPercorso;
    let fine: Date = this.addDays(inizio, giorniIntroduzione - 1);
    let current: Date = this.addDays(fine, 1);
    periodi.push({ quartiere: QUARTIERE.INTRODUZIONE, inizio, fine });
    periodi = periodi.concat(this.calcolaDatePercorsoSenzaIntroduzione(current, giorniFunzioneEsecutiva));
    return periodi;
  }

  calcolaDatePercorso(introduzione: boolean, inizioPercorso: Date, giorniIntroduzione: number, giorniFunzioneEsecutiva: number,
    mediaLiteracy: boolean, giorniMediaLiteracy: number): Periodo[] {
    let periodi: Periodo[] = [];
    if (!(inizioPercorso instanceof Date)) {
      if (!inizioPercorso) return [];
      inizioPercorso = new Date(inizioPercorso);
    }
    if (introduzione) {
      periodi = this.calcolaDatePercorsoConIntroduzione(inizioPercorso, giorniIntroduzione, giorniFunzioneEsecutiva);
    } else {
      periodi = this.calcolaDatePercorsoSenzaIntroduzione(inizioPercorso, giorniFunzioneEsecutiva);
    }
    if (mediaLiteracy) {
      let inizio: Date = this.addDays(periodi[periodi.length - 1].fine, 1);
      let fine: Date = this.addDays(inizio, giorniMediaLiteracy - 1);
      periodi.push({ quartiere: QUARTIERE.MEDIA_LITERACY, inizio, fine });
    }
    return periodi;
  }

  calcolaGiorniTotali(introduzione: boolean, giorniIntroduzione: number, giorniFunzioneEsecutiva: number,
    mediaLiteracy: boolean, giorniMediaLiteracy: number): number {
    let result = giorniFunzioneEsecutiva * (QUARTIERI.length - 2);
    if (introduzione) {
      result += giorniIntroduzione;
    }
    if (mediaLiteracy) {
      result += giorniMediaLiteracy;
    }
    return result;
  }

  private getToday(): Date {
    let today: Date = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  }

  calcolaInizioPercorso(giorno: number): Date {
    return new Date(this.getToday().getTime() - giorno * DAY_MS);
  }

  calcolaGiornoCorrente(inizioPercorso: Date, giorniTotali: number): number {
    if (!(inizioPercorso instanceof Date)) {
      if (!inizioPercorso) return 0;
      inizioPercorso = new Date(inizioPercorso);
    }
    if (giorniTotali == 0) {
      return 0;
    } else {
      return Math.min(Math.max((this.getToday().getTime() - inizioPercorso.getTime()) / DAY_MS, 0), giorniTotali);
    }
  }

  soloFuturo(periodi: Periodo[]): Periodo[] {
    let oggi: Date = this.getToday();
    periodi = periodi.filter(periodo => periodo.fine.getTime() >= oggi.getTime());
    if (periodi.length > 0) {
      periodi[0].inizio = oggi;
      return periodi;
    } else {
      return [];
    }
  }

}
