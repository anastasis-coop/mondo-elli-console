import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CentroDto } from '../../../dto/centro-dto';
import { PercorsoDto } from 'src/app/dto/percorso-dto';
import { OperatoreDto } from 'src/app/dto/operatore-dto';
import { OperatoreService } from 'src/app/services/operatore.service';
import { forkJoin } from 'rxjs';
import { DialogsService } from 'src/app/dialogs/dialogs.service';
import { UserService } from 'src/app/security/user.service';

@Component({
  selector: 'app-dettaglio-operatore',
  templateUrl: './dettaglio-operatore.component.html',
  styleUrls: ['../dettaglio.component.scss']
})
export class DettaglioOperatoreComponent implements OnInit {

  idOperatore?: number;

  operatore?: OperatoreDto;
  centro?: CentroDto;
  percorsi: PercorsoDto[] = [];

  datiCaricati: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute,
    private userService: UserService,
    private operatoreService: OperatoreService,
    private dialogsService: DialogsService) { }

  ngOnInit(): void {
    this.update();
  }

  update(): void {
    if (this.idOperatore) {
      this.load(this.idOperatore);
    } else {
      this.route.paramMap.subscribe((params: ParamMap) => {
        this.load(Number(params.get('id')));
      });
    }
  }

  load(id: number) {
    forkJoin({
      operatore: this.operatoreService.getOperatore(id),
      centro: this.operatoreService.getCentroOperatore(id),
      percorsi: this.operatoreService.getPercorsiOperatore(id)
    }).subscribe({
      next: results => {
        this.operatore = results.operatore;
        this.centro = results.centro;
        this.percorsi = results.percorsi;
        this.datiCaricati = true;
      },
      error: () => {
        this.datiCaricati = true;
      }
    });
  }

  editOperatore(): void {
    this.dialogsService.editOperatore(this.operatore!).then(
      operatore => { this.operatore = operatore; },
      () => { }
    );
  }

  impersona(): void {
    if (this.operatore) {
      console.log("Impersona", this.operatore.nome, this.operatore.cognome);
      this.userService.impersonate(this.operatore.id);
    }
  }

  selectPercorsi(): void {
    this.dialogsService.selectPercorsi(this.centro!, this.operatore!, this.percorsi).then(
      () => { this.reloadPercorsi(); },
      () => { }
    );
  }

  reloadPercorsi(): void {
    this.operatoreService.getPercorsiOperatore(this.operatore!.id).subscribe(percorsi => {
      this.percorsi = percorsi;
    });
  }

  gotoCentro(id: number) {
    this.router.navigate(['admin/centro/' + id]);
  }

  gotoPercorso(id: number) {
    this.router.navigate(['admin/percorso/' + id]);
  }

}
