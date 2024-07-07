import { Component } from '@angular/core';
import { CentroDto } from 'src/app/dto/centro-dto';
import { PercorsoDto } from 'src/app/dto/percorso-dto';
import { UtenteDto } from 'src/app/dto/utente-dto';
import { OperatoreDto } from 'src/app/dto/operatore-dto';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PercorsoService } from 'src/app/services/percorso.service';
import { Observable, forkJoin, zip } from 'rxjs';
import { DialogSceltaOperatoriComponent } from '../../../dialogs/dialog-scelta-operatori/dialog-scelta-operatori.component';
import { CentroService } from 'src/app/services/centro.service';
import { OperatoreService } from 'src/app/services/operatore.service';
import { DialogsService } from 'src/app/dialogs/dialogs.service';

@Component({
  selector: 'app-dettaglio-percorso',
  templateUrl: './dettaglio-percorso.component.html',
  styleUrls: ['../dettaglio.component.scss']
})
export class DettaglioPercorsoComponent {

  idPercorso?: number;

  percorso?: PercorsoDto;
  centro?: CentroDto;
  operatori: OperatoreDto[] = [];
  utenti: UtenteDto[] = [];

  datiCaricati: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute, private dialog: MatDialog,
    private percorsoService: PercorsoService,
    private centroService: CentroService,
    private operatoreService: OperatoreService,
    private dialogsService: DialogsService) { }

  ngOnInit(): void {
    this.update();
  }

  update(): void {
    if (this.idPercorso) {
      this.load(this.idPercorso);
    } else {
      this.route.paramMap.subscribe((params: ParamMap) => {
        this.load(Number(params.get('id')));
      });
    }
  }

  load(id: number) {
    forkJoin({
      percorso: this.percorsoService.getPercorso(id),
      centro: this.percorsoService.getCentroPercorso(id),
      operatori: this.percorsoService.getOperatoriPercorso(id),
      utenti: this.percorsoService.getUtentiPercorso(id)
    }).subscribe({
      next: results => {
        this.percorso = results.percorso;
        this.centro = results.centro;
        this.operatori = results.operatori;
        this.utenti = results.utenti;
        this.datiCaricati = true;
      },
      error: () => {
        this.datiCaricati = true;
      }
    });
  }

  editPercorso(): void {
    this.dialogsService.editPercorso(this.percorso!).then(
      percorso => { this.percorso = percorso; },
      () => { }
    );
  }

  toggleMediaLiteracy(): void {
    this.percorsoService.setFlagMediaLiteracyForPercorso(this.percorso!.id, !this.percorso!.mediaLiteracy).subscribe(() => {
      this.percorso!.mediaLiteracy = !this.percorso!.mediaLiteracy;
    });
  }

  toggleArchiviazione(): void {
    this.percorsoService.setFlagArchiviatoForPercorso(this.percorso!.id, !this.percorso!.mediaLiteracy).subscribe(() => {
      this.percorso!.archiviato = !this.percorso!.archiviato;
    });
  }

  selectOperatori(): void {
    this.centroService.getOperatoriCentro(this.centro!.id).subscribe(operatoriCentro => {
      let operatoriPercorso: number[] = this.operatori.map(o => o.id);
      this.dialog.open(DialogSceltaOperatoriComponent, {
        disableClose: true,
        data: {
          centro: this.centro,
          operatoriPercorso,
          operatoriCentro
        }
      }).afterClosed().subscribe((selezione: number[]) => {
        if (selezione) {
          this.applyChangesOperatori(operatoriPercorso, selezione);
        }
      });
    });
  }

  applyChangesOperatori(before: number[], after: number[]): void {
    let operazioni: Observable<void>[] = [];
    after.forEach(id => {
      if (!before.includes(id)) {
        operazioni.push(this.operatoreService.addPercorsoToOperatore(this.percorso!.id, id));
      }
    });
    before.forEach(id => {
      if (!after.includes(id)) {
        operazioni.push(this.operatoreService.removePercorsoFromOperatore(this.percorso!.id, id));
      }
    });
    zip(operazioni).subscribe(() => {
      this.reloadOperatori();
    });
  }

  createUtente(): void {
    let gruppoVuoto: boolean = (this.percorso?.tipo == 'GRUPPO') && (this.utenti.length == 0);
    this.dialogsService.createUtente(this.percorso!, gruppoVuoto).then(
      () => { this.reloadUtenti(); },
      () => { }
    );
  }

  reloadOperatori(): void {
    this.percorsoService.getOperatoriPercorso(this.percorso!.id).subscribe(operatori => {
      this.operatori = operatori;
    });
  }

  reloadUtenti(): void {
    this.percorsoService.getUtentiPercorso(this.percorso!.id).subscribe(utenti => {
      this.utenti = utenti;
    });
  }

  gotoCentro(id: number) {
    this.router.navigate(['admin/centro/' + id]);
  }

  gotoOperatore(id: number) {
    this.router.navigate(['admin/operatore/' + id]);
  }

  gotoUtente(id: number) {
    this.router.navigate(['admin/utente/' + id]);
  }

}
