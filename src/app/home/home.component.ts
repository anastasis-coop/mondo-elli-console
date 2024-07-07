import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { OperatoreService } from '../services/operatore.service';
import { UserService } from '../security/user.service';
import { GestioneCentroComponent } from './gestione/gestione-centro/gestione-centro.component';
import { MenuItem } from '../components/sidebar/sidebar.component';
import { forkJoin } from 'rxjs';
import { CentroDto } from '../dto/centro-dto';
import { CentroService } from '../services/centro.service';
import { DialogsService } from '../dialogs/dialogs.service';
import { OperatoreDto } from '../dto/operatore-dto';

const NOVE_MESI = 275 * 24 * 60 * 60 * 1000; // 275 giorni (=9*30+5)

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('GestionePercorsi') gestionePercorsi?: GestioneCentroComponent;
  @ViewChild('GestioneCentro') gestioneCentro?: GestioneCentroComponent;

  datiCaricati: boolean = false;
  centro?: CentroDto;
  operatore?: OperatoreDto;
  sidebarMenu: MenuItem[] = [
    { icon: 'directions_run', label: 'Percorsi' },
    { icon: 'menu_book', label: 'Materiali e Formazione' },
    { icon: 'inventory', label: 'Percorsi archiviati' },
    { icon: 'business', label: 'Centro' }
  ];
  targetPage: string[] = ['percorsi', 'materiali', 'archivio', 'centro'];
  current: number = 0;

  constructor(private router: Router,
    private userService: UserService,
    private operatoreService: OperatoreService) { }

  ngOnInit(): void {
    if (this.userService.isAdmin) {
      this.router.navigate(['/admin']);
    } else {
      if (this.userService.mustAcceptPrivacy) {
        this.router.navigate(['/home/privacy']);
      } else {
        this.targetPage.forEach((page, index) => {
          if (this.router.url.startsWith('/home/' + page)) {
            this.current = index;
          }
        });
        forkJoin({
          centro: this.operatoreService.getCentroOperatore(this.userService.userId),
          operatore: this.operatoreService.getOperatore(this.userService.userId)
        }).subscribe({
          next: results => {
            this.centro = results.centro;
            this.operatore = results.operatore;
            this.datiCaricati = true;
          }
        });
      }
    }
  }

  sidebarSelect(selected: number): void {
    this.current = selected;
    this.router.navigate(['/home/' + this.targetPage[selected]]);
  }

}
