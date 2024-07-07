import { Component, Input, OnInit } from '@angular/core';

import { MonitorFunzioneDto } from '../dto/monitor-funzione-dto';
import { MonitorService } from '../monitor.service';

@Component({
  selector: 'app-monitor-funzione-esecutiva',
  templateUrl: './monitor-funzione-esecutiva.component.html',
  styleUrls: ['./monitor-funzione-esecutiva.component.scss']
})
export class MonitorFunzioneEsecutivaComponent implements OnInit {

  @Input() funzione: string = '';
  @Input() idUtente?: number;

  datiCaricati: boolean = false;

  risultati?: MonitorFunzioneDto;

  constructor(private monitorService: MonitorService) { }

  ngOnInit(): void {
    this.monitorService.getFunzioneEsecutiva(this.idUtente!, this.funzione).subscribe({
      next: risultati => {
        this.risultati = risultati;
        this.datiCaricati = true;
      },
      error: error => {
        console.error(error);
        this.datiCaricati = true;
      }
    });
  }

}
