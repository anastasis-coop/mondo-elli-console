import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { UtenteService } from 'src/app/services/utente.service';
import { PercorsoDto } from 'src/app/dto/percorso-dto';
import { UtenteDto } from 'src/app/dto/utente-dto';
import { forkJoin } from 'rxjs';
import { DialogsService } from 'src/app/dialogs/dialogs.service';

@Component({
  selector: 'app-dettaglio-utente',
  templateUrl: './dettaglio-utente.component.html',
  styleUrls: ['../dettaglio.component.scss']
})
export class DettaglioUtenteComponent implements OnInit {

  idUtente?: number;

  utente?: UtenteDto;
  percorso?: PercorsoDto;

  datiCaricati: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute,
    private utenteService: UtenteService,
    private dialogsService: DialogsService) { }

  ngOnInit(): void {
    this.update();
  }

  update(): void {
    if (this.idUtente) {
      this.load(this.idUtente);
    } else {
      this.route.paramMap.subscribe((params: ParamMap) => {
        this.load(Number(params.get('id')));
      });
    }
  }

  load(id: number) {
    forkJoin({
      utente: this.utenteService.getUtente(id),
      percorso: this.utenteService.getPercorsoUtente(id),
    }).subscribe({
      next: results => {
        this.utente = results.utente;
        this.percorso = results.percorso;
        this.datiCaricati = true;
      },
      error: () => {
        this.datiCaricati = true;
      }
    });
  }

  editUtente(): void {
    this.dialogsService.editUtente(this.utente!).then(
      utente => { this.utente = utente; },
      () => { }
    );
  }

  gotoPercorso(id: number) {
    this.router.navigate(['admin/percorso/' + id]);
  }

}
