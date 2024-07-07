import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CentroDto } from '../../../dto/centro-dto';
import { CentroService } from 'src/app/services/centro.service';
import { PercorsoDto } from 'src/app/dto/percorso-dto';
import { OperatoreDto } from 'src/app/dto/operatore-dto';
import { forkJoin } from 'rxjs';
import { DialogsService } from 'src/app/dialogs/dialogs.service';

@Component({
  selector: 'app-dettaglio-centro',
  templateUrl: './dettaglio-centro.component.html',
  styleUrls: ['../dettaglio.component.scss']
})
export class DettaglioCentroComponent implements OnInit {

  idCentro?: number;

  centro?: CentroDto;
  percorsi: PercorsoDto[] = [];
  operatori: OperatoreDto[] = [];

  datiCaricati: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute,
    private centroService: CentroService,
    private dialogsService: DialogsService) { }

  ngOnInit(): void {
    this.update();
  }

  update(): void {
    if (this.idCentro) {
      this.load(this.idCentro);
    } else {
      this.route.paramMap.subscribe((params: ParamMap) => {
        this.load(Number(params.get('id')));
      });
    }
  }

  load(id: number) {
    forkJoin({
      centro: this.centroService.getCentro(id),
      percorsi: this.centroService.getPercorsiCentro(id),
      operatori: this.centroService.getOperatoriCentro(id)
    }).subscribe({
      next: results => {
        this.centro = results.centro;
        this.percorsi = results.percorsi;
        this.operatori = results.operatori;
        this.datiCaricati = true;
      },
      error: () => {
        this.datiCaricati = true;
      }
    });
  }

  getDescrizioneTipo(tipo: string) {
    switch (tipo) {
      case 'GRUPPO': return 'Gruppo';
      case 'SINGOLO': return 'Individuale';
      default: return '';
    }
  }

  editCentro(): void {
    this.dialogsService.editCentro(this.centro!).then(
      centro => { this.centro = centro; },
      () => { }
    );
  }

  createOperatore(): void {
    let referentiCount = this.operatori.filter(o => o.referente).length;
    this.dialogsService.createOperatore(this.centro!, referentiCount < 2).then(
      () => { this.reloadOperatori(); },
      () => { }
    );
  }

  createPercorsoGruppo(): void {
    this.dialogsService.createPercorsoGruppo(this.centro!, null).then(
      () => {
        this.reloadCentro();
        this.reloadPercorsi();
      },
      () => { }
    );
  }

  createPercorsoSingolo(): void {
    this.dialogsService.createPercorsoSingolo(this.centro!, null).then(
      () => {
        this.reloadCentro();
        this.reloadPercorsi();
      },
      () => { }
    );
  }

  reloadCentro(): void {
    this.centroService.getCentro(this.centro!.id).subscribe({
      next: centro => { this.centro = centro; },
      error: () => { }
    });
  }

  reloadOperatori(): void {
    this.centroService.getOperatoriCentro(this.centro!.id).subscribe({
      next: operatori => { this.operatori = operatori; },
      error: () => { }
    });
  }

  reloadPercorsi(): void {
    this.centroService.getPercorsiCentro(this.centro!.id).subscribe({
      next: percorsi => { this.percorsi = percorsi; },
      error: () => { }
    });
  }

  gotoOperatore(id: number) {
    this.router.navigate(['admin/operatore/' + id]);
  }

  gotoPercorso(id: number) {
    this.router.navigate(['admin/percorso/' + id]);
  }

}
