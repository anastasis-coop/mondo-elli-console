import { Component, Input, OnInit } from '@angular/core';

import { MonitorFunzioneCanaleDto } from '../dto/monitor-funzione-canale-dto';

@Component({
  selector: 'app-monitor-funzione-canale',
  templateUrl: './monitor-funzione-canale.component.html',
  styleUrls: ['./monitor-funzione-canale.component.scss']
})
export class MonitorFunzioneCanaleComponent implements OnInit {

  @Input() canale?: MonitorFunzioneCanaleDto;

  columnsToDisplay = ['data', 'livello', 'corretti', 'errati', 'saltati', 'accuratezza', 'stato-livello'];

  constructor() { }

  ngOnInit(): void {
  }

  channelToString(channel: string): string {
    return channel.toLowerCase();
  }

  levelToNumber(level: string): string {
    return level.substring(6, 7) + '.' + level.substring(7, 8);
  }

  levelToString(level: string): string {
    return 'livello ' + this.levelToNumber(level);
  }

  statusToString(status: string): string {
    switch (status) {
      case 'PASSATO': return 'SUPERATO';
      case 'IN_CORSO': return 'IN_CORSO';
      case 'FALLITO': return 'NON_SUPERATO';
    }
    return '';
  }

}
