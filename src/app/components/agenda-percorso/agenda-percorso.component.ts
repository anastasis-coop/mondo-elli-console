import { Component, Input, OnInit } from '@angular/core';
import { QUARTIERE, QUARTIERE_LABEL } from 'src/app/constants/QUARTIERE';
import { AgendaPercorsoService, Periodo } from 'src/app/services/agenda-percorso.service';

@Component({
  selector: 'app-agenda-percorso',
  templateUrl: './agenda-percorso.component.html',
  styleUrls: ['./agenda-percorso.component.scss']
})
export class AgendaPercorsoComponent implements OnInit {

  private _periodi: Periodo[] = [];
  get periodi(): Periodo[] {
    return this._periodi;
  }
  @Input() set periodi(periodi: Periodo[]) {
    this._periodi = periodi;
    this.update();
  }

  @Input() futuro: boolean = false;

  periodiFiltrati: Periodo[] = [];

  constructor(private agendaPercorsoService: AgendaPercorsoService) { }

  ngOnInit(): void {
    this.update();
  }

  update(): void {
    this.periodiFiltrati = this.futuro ? this.agendaPercorsoService.soloFuturo(this.periodi) : this.periodi;
  }

  isIntroduzione(quartiere: string): boolean {
    return quartiere === QUARTIERE.INTRODUZIONE;
  }

  getLabel(quartiere: string): string {
    return QUARTIERE_LABEL[quartiere];
  }

}
