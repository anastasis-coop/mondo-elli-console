import { Component, Input, OnInit } from '@angular/core';

import { MonitorEsplorazioneDto } from '../dto/monitor-esplorazione-dto';
import { MonitorService } from '../monitor.service';

@Component({
  selector: 'app-monitor-esplorazione',
  templateUrl: './monitor-esplorazione.component.html',
  styleUrls: ['./monitor-esplorazione.component.scss']
})
export class MonitorEsplorazioneComponent implements OnInit {

  @Input() idUtente?: number;

  columnsToDisplay = ['inizio', 'quartiere', 'corretto', 'tempo-impiegato', 'ombra', 'prospettiva'];

  datiCaricati: boolean = false;

  esplorazioni: MonitorEsplorazioneDto[] = [];

  constructor(private monitorService: MonitorService) { }

  ngOnInit(): void {
    this.monitorService.getEsplorazioni(this.idUtente!).subscribe({
      next: esplorazioni => {
        this.esplorazioni = esplorazioni;
        this.datiCaricati = true;
      },
      error: error => {
        console.error(error);
        this.datiCaricati = true;
      }
    });
  }

  getProspettiva(prospettiva: string) {
    switch (prospettiva) {
      case 'BACK_NEAR': return "Posteriore vicina";
      case 'BACK_MID': return "Posteriore media";
      case 'BACK_FAR': return "Posteriore lontana";
      case 'TOP_DOWN_NEAR': return "Dall'alto vicina";
      case 'TOP_DOWN_MID': return "Dall'alto media";
      case 'TOP_DOWN_FAR': return "Dall'alto lontana";
    }
    return '';
  }

}
