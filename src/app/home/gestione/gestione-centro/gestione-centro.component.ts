import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { CentroDto } from 'src/app/dto/centro-dto';
import { PercorsoDto } from 'src/app/dto/percorso-dto';
import { OperatoreDto } from 'src/app/dto/operatore-dto';
import { UserService } from 'src/app/security/user.service';
import { CentroService } from 'src/app/services/centro.service';
import { OperatoreService } from 'src/app/services/operatore.service';
import { TableOperatoriComponent } from '../../tables/table-operatori/table-operatori.component';
import { TablePercorsiComponent } from '../../tables/table-percorsi/table-percorsi.component';
import { DialogsService } from 'src/app/dialogs/dialogs.service';
import { PercorsoService } from 'src/app/services/percorso.service';

@Component({
  selector: 'app-gestione-centro',
  templateUrl: './gestione-centro.component.html',
  styleUrls: ['../gestione.component.scss']
})
export class GestioneCentroComponent implements OnInit {

  @ViewChild('TableOperatori') tableOperatori?: TableOperatoriComponent;
  @ViewChild('TablePercorsiGruppo') tablePercorsiGruppo?: TablePercorsiComponent;
  @ViewChild('TablePercorsiSingoli') tablePercorsiSingoli?: TablePercorsiComponent;

  @Input() centro?: CentroDto;
  @Input() referente: boolean = false;

  datiCaricati: boolean = false;
  showPercorso: boolean = false;

  percorso?: PercorsoDto;
  percorsi: PercorsoDto[] = [];
  operatori: OperatoreDto[] = [];

  constructor(private router: Router, private route: ActivatedRoute,
    private userService: UserService,
    private centroService: CentroService,
    private percorsoService: PercorsoService,
    private operatoreService: OperatoreService,
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
    if (this.centro) {
      forkJoin({
        percorsi: this.centroService.getPercorsiCentro(this.centro.id),
        operatori: this.centroService.getOperatoriCentro(this.centro.id)
      }).subscribe({
        next: results => {
          this.percorsi = results.percorsi;
          this.operatori = results.operatori;
          if (id) {
            let percorso = this.percorsi.find(percorso => percorso.id == id);
            if (percorso) {
              this.percorso = percorso;
              this.datiCaricati = true;
            }
          } else {
            this.datiCaricati = true;
          }
        }
      });
    }
  }

  get percorsiCentroGruppo(): PercorsoDto[] {
    return this.percorsi.filter(p => p.tipo == 'GRUPPO' && !p.archiviato);
  }

  get percorsiCentroSingoli(): PercorsoDto[] {
    return this.percorsi.filter(p => p.tipo == 'SINGOLO' && !p.archiviato);
  }

  get percorsiCentroArchivio(): PercorsoDto[] {
    return this.percorsi.filter(p => p.archiviato);
  }

  selectPercorso(percorso: PercorsoDto): void {
    this.percorso = percorso;
    this.router.navigate(['/home/centro/percorsi/' + percorso.id]);
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

  reloadOperatori(): void {
    this.centroService.getOperatoriCentro(this.centro!.id).subscribe(operatori => {
      this.operatori = operatori;
      this.tableOperatori?.update(operatori);
    });
  }

  reloadPercorsi(): void {
    this.centroService.getPercorsiCentro(this.centro!.id).subscribe(percorsiCentro => {
      this.percorsi = percorsiCentro;
      this.tablePercorsiGruppo?.update(this.percorsiCentroGruppo);
      this.tablePercorsiSingoli?.update(this.percorsiCentroSingoli);
    });
  }

  editCentro(): void {
    this.dialogsService.editCentro(this.centro!).then(
      centro => { this.centro = centro; },
      () => { }
    );
  }

  createOperatore(): void {
    this.dialogsService.createOperatore(this.centro!, false).then(
      () => { this.reloadOperatori(); },
      () => { }
    );
  }

  createPercorsoGruppo(): void {
    this.dialogsService.createPercorsoGruppo(this.centro!, null).then(
      percorso => {
        this.router.navigate(['/home/percorsi/' + percorso.id]);
      },
      () => {
        this.reloadPercorsi();
      }
    );
  }

  createPercorsoSingolo(): void {
    this.dialogsService.createPercorsoSingolo(this.centro!, null).then(
      percorso => {
        this.router.navigate(['/home/percorsi/' + percorso.id]);
      },
      () => {
        this.reloadPercorsi();
      }
    );
  }

  editOperatore(operatore: OperatoreDto): void {
    let isMyAccount: boolean = (operatore.id == this.userService.userId);
    if (isMyAccount) {
      this.router.navigate(['profilo']);
    } else {
      this.dialogsService.editOperatore(operatore).then(
        () => { this.reloadOperatori(); },
        () => { this.reloadOperatori(); }
      );
    }
  }

  editPercorsiOperatore(operatore: OperatoreDto): void {
    this.operatoreService.getPercorsiOperatore(operatore.id).subscribe({
      next: percorsiOperatore => {
        this.dialogsService.selectPercorsi(this.centro!, operatore, percorsiOperatore.filter(p => p.archiviato !== true)).then(
          () => { },
          () => { }
        );
      }
    });
  }

  editPercorso(percorso: PercorsoDto): void {
    this.dialogsService.editPercorso(percorso).then(
      () => { this.reloadPercorsi(); },
      () => { this.reloadPercorsi(); }
    );
  }

  editOperatoriPercorso(percorso: PercorsoDto): void {
    this.percorsoService.getOperatoriPercorso(percorso.id).subscribe({
      next: operatoriPercorso => {
        this.dialogsService.selectOperatori(this.centro!, percorso, operatoriPercorso).then(
          () => { },
          () => { }
        );
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/home/centro']);
  }

}
