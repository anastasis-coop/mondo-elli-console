import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { PercorsoDto } from 'src/app/dto/percorso-dto';
import { OperatoreDto } from 'src/app/dto/operatore-dto';
import { UtentePercorsoDto } from 'src/app/dto/utente-percorso-dto';
import { PercorsoService } from 'src/app/services/percorso.service';
import { TableOperatoriComponent } from '../../tables/table-operatori/table-operatori.component';
import { TableUtentiComponent } from '../../tables/table-utenti/table-utenti.component';
import { DialogsService } from 'src/app/dialogs/dialogs.service';
import { CentroDto } from 'src/app/dto/centro-dto';
import { AgendaPercorsoService, Periodo } from 'src/app/services/agenda-percorso.service';
import { GIORNI_INTRODUZIONE, GIORNI_MEDIA_LITERACY } from 'src/app/constants/GIORNI';
import { AuthService } from 'src/app/security/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-gestione-percorso',
  templateUrl: './gestione-percorso.component.html',
  styleUrls: ['../gestione.component.scss', './gestione-percorso.component.scss']
})
export class GestionePercorsoComponent implements OnInit {

  @ViewChild('TableOperatori') tableOperatori?: TableOperatoriComponent;
  @ViewChild('TableUtenti') tableUtenti?: TableUtentiComponent;

  @Input() archivio?: boolean;
  @Input() centro?: CentroDto;
  @Input() percorso?: PercorsoDto;

  @Input() referente: boolean = false;

  @Output() reloadCentro: EventEmitter<void> = new EventEmitter<void>();

  datiCaricati: boolean = false;

  operatoriPercorso: OperatoreDto[] = [];
  utentiPercorso: UtentePercorsoDto[] = [];
  periodi: Periodo[] = [];

  constructor(private router: Router,
    private percorsoService: PercorsoService,
    private agendaPercorsoService: AgendaPercorsoService,
    private dialogsService: DialogsService,
    private authService: AuthService) { }

  ngOnInit(): void {
    if (this.percorso) {
      this.updatePeriodi(this.percorso);
      forkJoin({
        utentiPercorso: this.percorsoService.getUtentiPercorsoFull(this.percorso!.id),
        operatoriPercorso: this.percorsoService.getOperatoriPercorso(this.percorso!.id)
      }).subscribe({
        next: results => {
          this.operatoriPercorso = results.operatoriPercorso;
          this.utentiPercorso = results.utentiPercorso;
          if (this.percorso?.tipo == 'SINGOLO' && this.utentiPercorso.length == 0) {
            this.createUtente();
          }
          this.datiCaricati = true;
        }
      });
    }
  }

  updatePeriodi(percorso: PercorsoDto): void {
    this.periodi = this.agendaPercorsoService.calcolaDatePercorso(percorso.periodoIntroduzione,
      percorso.inizioPercorsoEffettivo, GIORNI_INTRODUZIONE, percorso.durataFunzioneEsecutivaGiorni,
      percorso.mediaLiteracy, GIORNI_MEDIA_LITERACY);
  }

  editPercorso(): void {
    this.dialogsService.editPercorso(this.percorso!).then(
      percorso => {
        this.percorso = percorso;
        this.updatePeriodi(percorso);
        this.reloadUtenti();
      },
      () => { }
    );
  }

  reloadOperatori(): void {
    this.percorsoService.getOperatoriPercorso(this.percorso!.id).subscribe(operatoriPercorso => {
      this.operatoriPercorso = operatoriPercorso;
      this.tableOperatori?.update(operatoriPercorso);
    });
  }

  reloadUtenti(): void {
    this.percorsoService.getUtentiPercorsoFull(this.percorso!.id).subscribe(utentiPercorso => {
      this.utentiPercorso = utentiPercorso;
      this.tableUtenti?.update(utentiPercorso);
    });
  }

  selectOperatori(): void {
    this.dialogsService.selectOperatori(this.centro!, this.percorso!, this.operatoriPercorso).then(
      () => { this.reloadOperatori(); },
      () => { }
    );
  }

  createUtente(): void {
    let gruppoVuoto: boolean = (this.percorso?.tipo == 'GRUPPO') && (this.utentiPercorso.length == 0);
    this.dialogsService.createUtente(this.percorso!, gruppoVuoto).then(
      () => {
        this.reloadCentro.emit();
        this.reloadUtenti();
      },
      () => { }
    );
  }

  createSerieUtenti(): void {
    let gruppoVuoto: boolean = (this.percorso?.tipo == 'GRUPPO') && (this.utentiPercorso.length == 0);
    this.dialogsService.createSerieUtenti(this.percorso!, gruppoVuoto).then(
      () => {
        this.reloadCentro.emit();
        this.reloadUtenti();
      },
      () => {
        this.dialogsService.showAlert('Operazione non riuscita',
          'Probabilmente i nomi generati esistono già. Provare con un altro prefisso username.')
      }
    );
  }

  selectUtente(utente: UtentePercorsoDto): void {
    this.router.navigate(['/monitor/' + (this.archivio ? 'archivio/' : '') + utente.id]);
  }

  playUtente(utente: UtentePercorsoDto): void {
    this.authService.gameLogin({ username: utente.username, password: utente.password }).subscribe({
      next: result => {
        window.open(environment.play + '?token=' + result.token, '_blank');
      },
      error: error => {
        console.error(error);
      }
    });
  }

}
