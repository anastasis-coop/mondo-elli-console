import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GIORNI_INTRODUZIONE, GIORNI_MEDIA_LITERACY } from 'src/app/constants/GIORNI';
import { QUARTIERE, QUARTIERI } from 'src/app/constants/QUARTIERE';
import { PercorsoDto } from 'src/app/dto/percorso-dto';
import { AgendaPercorsoService, Periodo } from 'src/app/services/agenda-percorso.service';

@Component({
  selector: 'app-timeline-percorso',
  templateUrl: './timeline-percorso.component.html',
  styleUrls: ['./timeline-percorso.component.scss']
})
export class TimelinePercorsoComponent {

  private _percorso?: PercorsoDto;
  get percorso(): PercorsoDto | undefined {
    return this._percorso;
  }
  @Input() set percorso(percorso: PercorsoDto | undefined) {
    if (percorso) {
      this._percorso = percorso;
      this.update();
    }
  }

  @Output() onChange: EventEmitter<Date> = new EventEmitter<Date>();

  periodi: Periodo[] = [];
  giorniTotali: number = 0;
  giornoCorrente: number = 0;

  constructor(private agendaPercorsoService: AgendaPercorsoService) { }

  private update(): void {
    if (this.percorso) {
      this.periodi = this.agendaPercorsoService.calcolaDatePercorso(this.percorso.periodoIntroduzione,
        this.percorso.inizioPercorsoEffettivo, GIORNI_INTRODUZIONE, this.percorso.durataFunzioneEsecutivaGiorni,
        this.percorso.mediaLiteracy, GIORNI_MEDIA_LITERACY);
      this.giorniTotali = this.agendaPercorsoService.calcolaGiorniTotali(this.percorso.periodoIntroduzione,
        GIORNI_INTRODUZIONE, this.percorso.durataFunzioneEsecutivaGiorni,
        this.percorso.mediaLiteracy, GIORNI_MEDIA_LITERACY);
      this.giornoCorrente = this.agendaPercorsoService.calcolaGiornoCorrente(this.percorso.inizioPercorsoEffettivo, this.giorniTotali);
    } else {
      this.periodi = [];
      this.giorniTotali = 0;
      this.giornoCorrente = 0;
    }
  }

  get sliderEnabled(): boolean {
    if (this.percorso) {
      return (this.percorso.inizioPercorso instanceof Date) || (typeof (this.percorso.inizioPercorso) === 'string' && this.percorso.inizioPercorso != '');
    } else {
      return false;
    }
  }

  get quartieri(): string[] {
    let result: string[];
    if (this.percorso?.periodoIntroduzione) {
      result = QUARTIERI;
    } else {
      result = QUARTIERI.filter(q => q != QUARTIERE.INTRODUZIONE);
    }
    if (!this.percorso?.mediaLiteracy) {
      result = result.filter(q => q != QUARTIERE.MEDIA_LITERACY);
    }
    return result;
  }

  getSettimaneQuartiere(quartiere: string): number {
    if (quartiere == QUARTIERE.INTRODUZIONE) {
      return 1;
    } else if (quartiere == QUARTIERE.MEDIA_LITERACY) {
      return 2;
    } else {
      if (this.percorso) {
        return this.percorso!.durataFunzioneEsecutivaGiorni / 7;
      } else {
        return 1;
      }
    }
  }

  oggi(): string {
    return 'OGGI';
  }

  onSliderChange(value: number) {
    this.percorso!.inizioPercorsoEffettivo = this.agendaPercorsoService.calcolaInizioPercorso(value);
    this.onChange.emit(this.percorso!.inizioPercorsoEffettivo);
    this.update();
  }

}
