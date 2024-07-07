import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PercorsoDto } from 'src/app/dto/percorso-dto';

@Component({
  selector: 'app-table-percorsi-archivio',
  templateUrl: './table-percorsi-archivio.component.html',
  styleUrls: ['../table.component.scss', './table-percorsi-archivio.component.scss']
})
export class TablePercorsiArchivioComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort) sort: MatSort | null = null;

  @Input() percorsi: PercorsoDto[] = [];

  @Output() selected: EventEmitter<PercorsoDto> = new EventEmitter<PercorsoDto>();

  displayedColumns: string[] = ['nome', 'tipo'];

  dataSource?: MatTableDataSource<PercorsoDto>;

  constructor() { }

  ngOnInit(): void {
    this.update(this.percorsi);
  }

  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.sort = this.sort;
    }
  }

  update(percorsi: PercorsoDto[]): void {
    this.percorsi = percorsi;
    this.dataSource = new MatTableDataSource(percorsi);
  }

  getDescrizioneTipo(tipo: string) {
    switch (tipo) {
      case 'GRUPPO': return 'Gruppo';
      case 'SINGOLO': return 'Individuale';
      default: return '';
    }
  }

  selectRow(percorso: PercorsoDto) {
    this.selected.emit(percorso);
  }

}
