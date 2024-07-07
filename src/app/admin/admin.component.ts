import { Component, ViewChild } from '@angular/core';
import { AdminTableUtentiComponent } from './tables/admin-table-utenti/admin-table-utenti.component';
import { AdminTableOperatoriComponent } from './tables/admin-table-operatori/admin-table-operatori.component';
import { AdminTableCentriComponent } from './tables/admin-table-centri/admin-table-centri.component';
import { SearchUtentiComponent } from './search/search-utenti/search-utenti.component';
import { SearchOperatoriComponent } from './search/search-operatori/search-operatori.component';
import { SearchCentriComponent } from './search/search-centri/search-centri.component';
import { QueryCentroDto } from './dto/query-centro-dto';
import { QueryOperatoreDto } from './dto/query-operatore-dto';
import { QueryUtenteDto } from './dto/query-utente-dto';
import { Router } from '@angular/router';
import { DialogsService } from '../dialogs/dialogs.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

  @ViewChild(SearchCentriComponent) searchCentri?: SearchCentriComponent;
  @ViewChild(SearchOperatoriComponent) searchOperatori?: SearchOperatoriComponent;
  @ViewChild(SearchUtentiComponent) searchUtenti?: SearchUtentiComponent;
  @ViewChild(AdminTableCentriComponent) tableCentri?: AdminTableCentriComponent;
  @ViewChild(AdminTableOperatoriComponent) tableOperatori?: AdminTableOperatoriComponent;
  @ViewChild(AdminTableUtentiComponent) tableUtenti?: AdminTableUtentiComponent;

  queryCentro?: QueryCentroDto;
  queryOperatore?: QueryOperatoreDto;
  queryUtente?: QueryUtenteDto;

  centriSearched: boolean = false;
  operatoriSearched: boolean = false;
  utentiSearched: boolean = false;

  constructor(private router: Router, private dialogsService: DialogsService) { }

  createCentro(): void {
    this.dialogsService.createCentro().then(
      centro => {
        this.dialogsService.createOperatore(centro, true).then(
          () => {
            this.dialogsService.showAlert('Operazione riuscita', `Centro ${centro.nome} creato con successo.`);
          },
          () => {
            this.dialogsService.showAlert('Operazione annullata', 'Creare operatore manualmente.');
          }
        );
      },
      () => { }
    );
  }

  cercaCentri(queryCentro: QueryCentroDto): void {
    this.centriSearched = false;
    this.queryCentro = queryCentro;
    setTimeout(() => {
      this.tableCentri!.loadData().then(() => {
        this.centriSearched = true;
      });
    });
  }

  cercaOperatori(queryOperatore: QueryOperatoreDto): void {
    this.operatoriSearched = false;
    this.queryOperatore = queryOperatore;
    setTimeout(() => {
      this.tableOperatori!.loadData().then(() => {
        this.operatoriSearched = true;
      });
    });
  }

  cercaUtenti(queryUtente: QueryUtenteDto): void {
    this.utentiSearched = false;
    this.queryUtente = queryUtente;
    setTimeout(() => {
      this.tableUtenti!.loadData().then(() => {
        this.utentiSearched = true;
      });
    });
  }

  selectedCentro(id: number) {
    this.router.navigate(['admin/centro/' + id]);
  }

  selectedOperatore(id: number) {
    this.router.navigate(['admin/operatore/' + id]);
  }

  selectedUtente(id: number) {
    this.router.navigate(['admin/utente/' + id]);
  }

}
