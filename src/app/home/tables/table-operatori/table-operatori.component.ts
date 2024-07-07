import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { OperatoreDto } from 'src/app/dto/operatore-dto';
import { UserService } from 'src/app/security/user.service';

@Component({
  selector: 'app-table-operatori',
  templateUrl: './table-operatori.component.html',
  styleUrls: ['../table.component.scss', './table-operatori.component.scss']
})
export class TableOperatoriComponent {

  @ViewChild(MatSort) sort: MatSort | null = null;

  @Input() operatori: OperatoreDto[] = [];
  @Input() selectable: boolean = false;
  @Input() editable: boolean = false;

  @Output() selected: EventEmitter<OperatoreDto> = new EventEmitter<OperatoreDto>();

  @Output() onEdit: EventEmitter<OperatoreDto> = new EventEmitter<OperatoreDto>();
  @Output() onEditPercorsi: EventEmitter<OperatoreDto> = new EventEmitter<OperatoreDto>();

  displayOnlyColumns: string[] = ['nome', 'cognome', 'username', 'referente'];
  editableColumns: string[] = ['percorsi', 'edit'];

  dataSource?: MatTableDataSource<OperatoreDto>;

  private canSelectRow: boolean = true;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.update(this.operatori);
  }

  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.sort = this.sort;
    }
  }

  getEditIcon(operatore: OperatoreDto): string {
    return operatore.id == this.userService.userId ? 'account_circle' : 'edit';
  }

  get displayedColumns(): string[] {
    return this.editable ? this.displayOnlyColumns.concat(this.editableColumns) : this.displayOnlyColumns;
  }

  update(operatori: OperatoreDto[]): void {
    this.operatori = operatori;
    this.dataSource = new MatTableDataSource(operatori);
  }

  selectRow(operatore: OperatoreDto): void {
    if (this.canSelectRow) {
      this.selected.emit(operatore);
    } else {
      this.canSelectRow = true;
    }
  }

  edit(operatore: OperatoreDto): void {
    this.onEdit.emit(operatore);
    this.canSelectRow = false;
  }

  editPercorsi(operatore: OperatoreDto): void {
    this.onEditPercorsi.emit(operatore);
    this.canSelectRow = false;
  }

}
