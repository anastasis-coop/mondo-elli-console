import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MenuItem } from '../components/sidebar/sidebar.component';
import { DialogsService } from '../dialogs/dialogs.service';
import { UtenteService } from '../services/utente.service';
import { UtenteDto } from '../dto/utente-dto';
import { forkJoin } from 'rxjs';
import { PercorsoDto } from '../dto/percorso-dto';
import { QUARTIERI } from '../constants/QUARTIERE';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.scss']
})
export class MonitorComponent implements OnInit {

  idUtente: number = 0;
  sidebarMenu: MenuItem[] = [
    { icon: 'directions_run', label: 'Percorso' },
    { icon: 'sports_esports', label: 'Sessioni' },
    { icon: 'turn_sharp_left', label: 'Esplorazione (Coding)' },
    { icon: 'gpp_maybe', label: 'Controllo Interferenza' },
    { icon: 'ac_unit', label: 'Inibizione Risposta' },
    { icon: 'backpack', label: 'Memoria di Lavoro' },
    { icon: 'visibility', label: 'Flessibilità Cognitiva' },
    { icon: 'quiz', label: 'Quiz' }
  ];
  current: number = 0;
  utente?: UtenteDto;
  percorso?: PercorsoDto;

  bigIcon: string = '';

  archivio: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute, private location: Location,
    private utenteService: UtenteService,
    private dialogsService: DialogsService) { }

  ngOnInit(): void {
    this.archivio = this.router.url.startsWith('/monitor/archivio');
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.idUtente = Number(params.get('idUtente'));
      forkJoin({
        utente: this.utenteService.getUtente(this.idUtente),
        percorso: this.utenteService.getPercorsoUtente(this.idUtente)
      }).subscribe({
        next: results => {
          this.utente = results.utente;
          this.percorso = results.percorso;
        }
      });
    });
  }

  sidebarSelect(selected: number): void {
    this.current = selected;
    this.bigIcon = (selected > 1 && selected < 7) ? '/assets/percorso/' + QUARTIERI[selected - 2].toLowerCase() + '.png' : '';
  }

  editUtente(): void {
    this.dialogsService.editUtente(this.utente!).then(
      utente => { this.utente = utente; },
      () => { }
    );
  }

  goBack(): void {
    this.location.back();
  }

}
