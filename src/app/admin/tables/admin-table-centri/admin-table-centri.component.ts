import { AfterViewInit, Component, EventEmitter, Inject, Input, LOCALE_ID, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { tap } from 'rxjs/operators';

import { AdminTableCentriDataSource } from './admin-table-centri-datasource';
import { QueryCentroDto } from '../../dto/query-centro-dto';
import { AdminService } from '../../admin.service';
import { CentroDto } from 'src/app/dto/centro-dto';

@Component({
  selector: 'app-admin-table-centri',
  templateUrl: './admin-table-centri.component.html',
  styleUrls: ['../admin-table.component.scss']
})
export class AdminTableCentriComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatTable) table?: MatTable<CentroDto>;

  dataSource?: AdminTableCentriDataSource;

  @Input() queryCentro?: QueryCentroDto;
  @Output() onSelect: EventEmitter<number> = new EventEmitter<number>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'nome', 'codice', 'comune'];

  constructor(private adminService: AdminService, @Inject(LOCALE_ID) private locale: string) {
  }

  ngOnInit() {
    this.dataSource = new AdminTableCentriDataSource(this.adminService);
  }

  ngAfterViewInit() {
    if (this.dataSource && this.table && this.paginator) {
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
      this.paginator.page.pipe(
        tap(() => {
          if (this.dataSource) {
            if (this.dataSource && this.queryCentro && this.paginator) {
              this.dataSource.loadCentri(this.queryCentro, 'asc', this.paginator.pageIndex, this.paginator.pageSize);
            }
          }
        })
      ).subscribe();
    }
  }

  loadData(): Promise<void> {
    if (this.dataSource && this.queryCentro && this.paginator) {
      this.paginator.firstPage();
      return this.dataSource.loadCentri(this.queryCentro, 'asc', this.paginator.pageIndex, this.paginator.pageSize);
    } else {
      return new Promise<void>(resolve => resolve());
    }
  }

  getComune(row: CentroDto) {
    return row.comune ? `${row.comune.nome} (${row.comune.targa})` : '';
  }

  select(row: CentroDto) {
    this.onSelect.emit(row.id);
  }

}
