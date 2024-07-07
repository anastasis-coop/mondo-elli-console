import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { QUARTIERE_LABEL } from 'src/app/constants/QUARTIERE';
import { PercorsoDto } from 'src/app/dto/percorso-dto';

@Component({
  selector: 'app-table-percorsi-operatore',
  templateUrl: './table-percorsi-operatore.component.html',
  styleUrls: ['../table.component.scss', './table-percorsi-operatore.component.scss']
})
export class TablePercorsiOperatoreComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort) sort: MatSort | null = null;

  @Input() tipo: string = '';
  @Input() percorsi: PercorsoDto[] = [];
  @Input() selectable: boolean = false;
  @Input() editable: boolean = false;

  @Output() selected: EventEmitter<PercorsoDto> = new EventEmitter<PercorsoDto>();

  @Output() onEdit: EventEmitter<PercorsoDto> = new EventEmitter<PercorsoDto>();
  @Output() onArchive: EventEmitter<PercorsoDto> = new EventEmitter<PercorsoDto>();

  displayedColumns: string[] = ['nome', 'numeroUtenti', 'numeroOperatori', 'agenda', 'quartiere', 'stato', 'archivia'];

  dataSource?: MatTableDataSource<PercorsoDto>;

  private canSelectRow: boolean = true;

  constructor() { }

  ngOnInit(): void {
    this.update(this.percorsi);
  }

  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.sort = this.sort;
    }
  }

  getLabelQuartiere(quartiere: string): string {
    return QUARTIERE_LABEL[quartiere];
  }

  update(percorsi: PercorsoDto[]): void {
    this.percorsi = percorsi;
    this.dataSource = new MatTableDataSource(percorsi);
  }

  selectRow(percorso: PercorsoDto) {
    if (this.canSelectRow) {
      this.selected.emit(percorso);
    } else {
      this.canSelectRow = true;
    }
  }

  edit(percorso: PercorsoDto): void {
    this.onEdit.emit(percorso);
    this.canSelectRow = false;
  }

  canArchive(percorso: PercorsoDto): boolean {
    return percorso.stato == 'TERMINATO';
  }

  archive(percorso: PercorsoDto): void {
    this.onArchive.emit(percorso);
    this.canSelectRow = false;
  }

}
