import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PercorsoDto } from 'src/app/dto/percorso-dto';

@Component({
  selector: 'app-table-percorsi',
  templateUrl: './table-percorsi.component.html',
  styleUrls: ['../table.component.scss', './table-percorsi.component.scss']
})
export class TablePercorsiComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort) sort: MatSort | null = null;

  @Input() tipo: string = '';
  @Input() percorsi: PercorsoDto[] = [];
  @Input() selectable: boolean = false;
  @Input() editable: boolean = false;

  @Output() selected: EventEmitter<PercorsoDto> = new EventEmitter<PercorsoDto>();

  @Output() onEdit: EventEmitter<PercorsoDto> = new EventEmitter<PercorsoDto>();
  @Output() onEditOperatori: EventEmitter<PercorsoDto> = new EventEmitter<PercorsoDto>();

  displayOnlyColumns: string[] = ['nome'];
  editableColumns: string[] = ['operatori', 'edit'];

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

  get displayedColumns(): string[] {
    return this.editable ? this.displayOnlyColumns.concat(this.editableColumns) : this.displayOnlyColumns;
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

  editOperatori(percorso: PercorsoDto): void {
    this.onEditOperatori.emit(percorso);
    this.canSelectRow = false;
  }

}
