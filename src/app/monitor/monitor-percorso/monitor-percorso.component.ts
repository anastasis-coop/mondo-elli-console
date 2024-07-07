import { Component, Input, OnInit } from '@angular/core';

import { MonitorPercorsoDto } from '../dto/monitor-percorso-dto';
import { MonitorService } from '../monitor.service';

@Component({
  selector: 'app-monitor-percorso',
  templateUrl: './monitor-percorso.component.html',
  styleUrls: ['./monitor-percorso.component.scss']
})
export class MonitorPercorsoComponent implements OnInit {

  @Input() idUtente?: number;

  columnsToDisplay = ['quartiere', 'completato', 'visivo', 'verbale', 'numero_sessioni'];

  datiCaricati: boolean = false;

  percorso: MonitorPercorsoDto[] = [];

  constructor(private monitorService: MonitorService) { }

  ngOnInit(): void {
    this.monitorService.getPercorso(this.idUtente!).subscribe({
      next: percorso => {
        this.percorso = percorso;
        this.datiCaricati = true;
      },
      error: error => {
        console.error(error);
        this.datiCaricati = true;
      }
    });
  }

  levelToString(level: string): string {
    return level ? 'livello ' + level.substring(6, 7) + '.' + level.substring(7, 8) : '';
  }

}
