import { Component, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { QUARTIERE_LABEL } from 'src/app/constants/QUARTIERE';
import { UtentePercorsoDto } from 'src/app/dto/utente-percorso-dto';

@Component({
  selector: 'app-table-utenti',
  templateUrl: './table-utenti.component.html',
  styleUrls: ['../table.component.scss', './table-utenti.component.scss']
})
export class TableUtentiComponent {

  @ViewChild(MatSort) sort: MatSort | null = null;

  @Input() archivio?: boolean;
  @Input() utenti: UtentePercorsoDto[] = [];
  @Input() selectable: boolean = false;
  @Input() editable: boolean = false;
  @Input() statoPercorso: string = '';

  @Output() selected: EventEmitter<UtentePercorsoDto> = new EventEmitter<UtentePercorsoDto>();

  @Output() onPlay: EventEmitter<UtentePercorsoDto> = new EventEmitter<UtentePercorsoDto>();

  displayedColumnsMain: string[] = ['username', 'password', 'nome', 'prima_sessione', 'quartiere', 'facilitato', 'play'];
  displayedColumnsArchive: string[] = ['username', 'nome', 'prima_sessione', 'quartiere', 'facilitato'];

  dataSource?: MatTableDataSource<UtentePercorsoDto>;

  hide: boolean = true;

  private canSelectRow: boolean = true;

  constructor() { }

  ngOnInit(): void {
    this.update(this.utenti);
  }

  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.sort = this.sort;
    }
  }

  get displayedColumns(): string[] {
    return this.archivio ? this.displayedColumnsArchive : this.displayedColumnsMain;
  }

  @HostListener('window:pointerup')
  mouseUp(): void {
    this.hide = true;
  }

  getLabelQuartiere(quartiere: string): string {
    return QUARTIERE_LABEL[quartiere];
  }

  update(utenti: UtentePercorsoDto[]): void {
    this.utenti = utenti;
    this.dataSource = new MatTableDataSource(utenti);
  }

  selectRow(utente: UtentePercorsoDto) {
    if (this.canSelectRow) {
      this.selected.emit(utente);
    } else {
      this.canSelectRow = true;
    }
  }

  play(utente: UtentePercorsoDto): void {
    this.onPlay.emit(utente);
    this.canSelectRow = false;
  }

  get playDisabled(): boolean {
    return this.statoPercorso != 'IN_CORSO';
  }

  get playHint(): string {
    switch (this.statoPercorso) {
      case 'NON_INIZIATO': return 'Percorso non iniziato';
      case 'TERMINATO': return 'Percorso terminato';
    }
    return '';
  }

}
