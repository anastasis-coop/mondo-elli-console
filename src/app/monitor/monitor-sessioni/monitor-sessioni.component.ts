import { Component, Input, OnInit } from '@angular/core';

import { MonitorSessioneDto } from '../dto/monitor-sessione-dto';
import { MonitorService } from '../monitor.service';

@Component({
  selector: 'app-monitor-sessioni',
  templateUrl: './monitor-sessioni.component.html',
  styleUrls: ['./monitor-sessioni.component.scss']
})
export class MonitorSessioniComponent implements OnInit {

  @Input() idUtente?: number;

  columnsToDisplay = ['data', 'quartiere', 'tempo_netto', 'completata', 'score'];

  datiCaricati: boolean = false;

  sessioni: MonitorSessioneDto[] = [];

  constructor(private monitorService: MonitorService) { }

  ngOnInit(): void {
    this.monitorService.getSessioni(this.idUtente!).subscribe({
      next: sessioni => {
        this.sessioni = sessioni;
        this.datiCaricati = true;
      },
      error: error => {
        console.error(error);
        this.datiCaricati = true;
      }
    });
  }

}
