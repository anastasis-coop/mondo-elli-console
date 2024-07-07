import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CentroDto } from 'src/app/dto/centro-dto';
import { PercorsoDto } from 'src/app/dto/percorso-dto';
import { UtenteDto } from 'src/app/dto/utente-dto';
import { UserService } from 'src/app/security/user.service';
import { OperatoreService } from 'src/app/services/operatore.service';
import { TablePercorsiOperatoreComponent } from '../../tables/table-percorsi-operatore/table-percorsi-operatore.component';
import { TablePercorsiArchivioComponent } from '../../tables/table-percorsi-archivio/table-percorsi-archivio.component';

@Component({
  selector: 'app-gestione-archivio',
  templateUrl: './gestione-archivio.component.html',
  styleUrls: ['../gestione.component.scss', './gestione-archivio.component.scss']
})
export class GestioneArchivioComponent implements OnInit {

  @ViewChild('TablePercorsiGruppoArchiviati') tablePercorsiGruppo?: TablePercorsiArchivioComponent;
  @ViewChild('TablePercorsiSingoliArchiviati') tablePercorsiSingoli?: TablePercorsiArchivioComponent;

  @Input() centro?: CentroDto;
  @Input() referente: boolean = false;

  datiCaricati: boolean = false;
  showPercorso: boolean = false;

  percorso?: PercorsoDto;
  percorsiArchiviati: PercorsoDto[] = [];
  utentiPercorso: UtenteDto[] = [];
  utentiUsati: number = 0;
  utentiTotali: number = 0;

  selectedId: number = 0;

  constructor(private router: Router, private route: ActivatedRoute,
    private userService: UserService,
    private operatoreService: OperatoreService) { }

  ngOnInit(): void {
    this.selectedId = 0;
    this.route.paramMap.subscribe((params: ParamMap) => {
      let idp = params.get('id');
      if (idp) {
        let id = Number(idp);
        if (id) {
          this.showPercorso = true;
          this.selectedId = id;
        }
      }
    });
    this.loadPercorsiOperatore();
  }

  loadPercorsiOperatore(): void {
    this.operatoreService.getPercorsiOperatoreArchiviati(this.userService.userId).subscribe({
      next: percorsiArchiviati => {
        this.percorsiArchiviati = percorsiArchiviati;
        this.datiCaricati = true;
        this.findSelected(this.selectedId);
      }
    });
  }

  findSelected(id: number): void {
    if (id) {
      let percorso = this.percorsiArchiviati.find(percorso => percorso.id == id);
      if (percorso) {
        this.setPercorso(percorso);
      }
    }
  }

  setPercorso(percorso: PercorsoDto): void {
    this.percorso = percorso;
  }

  selectPercorso(percorso: PercorsoDto): void {
    this.setPercorso(percorso);
    this.router.navigate(['/home/archivio/' + percorso.id]);
  }

  deselect(): void {
    this.percorso = undefined;
  }

  goBack() {
    this.router.navigate(['/home/archivio']);
  }

}
