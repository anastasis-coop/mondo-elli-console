import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DialogsService } from 'src/app/dialogs/dialogs.service';
import { CentroDto } from 'src/app/dto/centro-dto';
import { PercorsoDto } from 'src/app/dto/percorso-dto';
import { UtenteDto } from 'src/app/dto/utente-dto';
import { UserService } from 'src/app/security/user.service';
import { OperatoreService } from 'src/app/services/operatore.service';
import { TablePercorsiOperatoreComponent } from '../../tables/table-percorsi-operatore/table-percorsi-operatore.component';
import { CentroService } from 'src/app/services/centro.service';
import { PercorsoService } from 'src/app/services/percorso.service';

@Component({
  selector: 'app-gestione-percorsi',
  templateUrl: './gestione-percorsi.component.html',
  styleUrls: ['../gestione.component.scss', './gestione-percorsi.component.scss']
})
export class GestionePercorsiComponent implements OnInit {

  @ViewChild('TablePercorsiOperatoreGruppo') tablePercorsiGruppo?: TablePercorsiOperatoreComponent;
  @ViewChild('TablePercorsiOperatoreSingoli') tablePercorsiSingoli?: TablePercorsiOperatoreComponent;

  @Input() centro?: CentroDto;
  @Input() referente: boolean = false;

  datiCaricati: boolean = false;
  showPercorso: boolean = false;

  percorso?: PercorsoDto;
  percorsiOperatore: PercorsoDto[] = [];
  utentiPercorso: UtenteDto[] = [];
  utentiUsati: number = 0;
  utentiTotali: number = 0;

  constructor(private router: Router, private route: ActivatedRoute,
    private userService: UserService,
    private operatoreService: OperatoreService,
    private centroService: CentroService,
    private percorsoService: PercorsoService,
    private dialogsService: DialogsService) { }

  ngOnInit(): void {
    let id: number;
    this.route.paramMap.subscribe((params: ParamMap) => {
      let idp = params.get('id');
      if (idp) {
        id = Number(idp);
        if (id) {
          this.showPercorso = true;
        }
      }
    });
    this.operatoreService.getPercorsiOperatore(this.userService.userId).subscribe({
      next: percorsiOperatore => {
        this.percorsiOperatore = percorsiOperatore;
        this.datiCaricati = true;
        if (id) {
          let percorso = this.percorsiOperatore.find(percorso => percorso.id == id);
          if (percorso) {
            this.setPercorso(percorso);
          }
        }
      }
    });
  }

  get percorsiOperatoreGruppo(): PercorsoDto[] {
    return this.percorsiOperatore.filter(p => p.tipo == 'GRUPPO');
  }

  get percorsiOperatoreSingoli(): PercorsoDto[] {
    return this.percorsiOperatore.filter(p => p.tipo == 'SINGOLO');
  }

  setPercorso(percorso: PercorsoDto): void {
    this.percorso = percorso;
  }

  selectPercorso(percorso: PercorsoDto): void {
    this.setPercorso(percorso);
    this.router.navigate(['/home/percorsi/' + percorso.id]);
  }

  deselect(): void {
    this.percorso = undefined;
  }

  reloadCentro(): void {
    this.centroService.getCentro(this.centro!.id).subscribe({
      next: centro => { this.centro = centro; },
      error: () => { }
    });
  }

  reloadPercorsi(): void {
    this.operatoreService.getPercorsiOperatore(this.userService.userId).subscribe({
      next: percorsiOperatore => {
        this.percorsiOperatore = percorsiOperatore;
        this.tablePercorsiGruppo?.update(this.percorsiOperatoreGruppo);
        this.tablePercorsiSingoli?.update(this.percorsiOperatoreSingoli);
      },
      error: () => { }
    });
  }

  createPercorsoGruppo(): void {
    this.dialogsService.createPercorsoGruppo(this.centro!, this.userService.userId).then(
      percorso => {
        this.router.navigate(['/home/percorsi/' + percorso.id]);
      },
      () => {
        this.reloadPercorsi();
      }
    );
  }

  createPercorsoSingolo(): void {
    this.dialogsService.createPercorsoSingolo(this.centro!, this.userService.userId).then(
      percorso => {
        this.router.navigate(['/home/percorsi/' + percorso.id]);
      },
      () => {
        this.reloadPercorsi();
      }
    );
  }

  archiviaPercorso(percorso: PercorsoDto): void {
    this.dialogsService.askConfirmation('Archiviazione percorso “' + percorso.nome + '”',
      'I percorsi archiviati saranno solo consultabili, gli utenti non potranno più accedere al gioco ed il percorso non potrà più essere modificato. Procedere?').then(confirmed => {
        if (confirmed) {
          this.percorsoService.archiviaPercorso(percorso.id).subscribe({
            next: () => {
              this.reloadPercorsi();
            },
            error: () => { }
          });
        }
      });
  }

  goBack() {
    this.router.navigate(['/home/percorsi']);
  }

}
