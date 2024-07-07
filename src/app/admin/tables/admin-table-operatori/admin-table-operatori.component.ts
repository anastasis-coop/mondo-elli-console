import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { tap } from 'rxjs/operators';

import { AdminTableOperatoriDataSource } from './admin-table-operatori-datasource';
import { AdminService } from '../../admin.service';
import { QueryOperatoreDto } from '../../dto/query-operatore-dto';
import { OperatoreDto } from 'src/app/dto/operatore-dto';

@Component({
  selector: 'app-admin-table-operatori',
  templateUrl: './admin-table-operatori.component.html',
  styleUrls: ['../admin-table.component.scss']
})
export class AdminTableOperatoriComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatTable) table?: MatTable<OperatoreDto>;

  dataSource?: AdminTableOperatoriDataSource;

  @Input() queryOperatore?: QueryOperatoreDto;
  @Output() onSelect: EventEmitter<number> = new EventEmitter<number>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'username', 'nome', 'cognome'];

  constructor(private adminService: AdminService) {
  }

  ngOnInit() {
    this.dataSource = new AdminTableOperatoriDataSource(this.adminService);
  }

  ngAfterViewInit() {
    if (this.dataSource && this.table && this.paginator) {
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
      this.paginator.page.pipe(
        tap(() => {
          if (this.dataSource && this.queryOperatore && this.paginator) {
            this.dataSource.loadOperatori(this.queryOperatore, 'asc', this.paginator.pageIndex, this.paginator.pageSize);
          }
        })
      ).subscribe();
    }
  }

  loadData(): Promise<void> {
    if (this.dataSource && this.queryOperatore && this.paginator) {
      this.paginator.firstPage();
      return this.dataSource.loadOperatori(this.queryOperatore, 'asc', this.paginator.pageIndex, this.paginator.pageSize);
    } else {
      return new Promise<void>(resolve => resolve());
    }
  }

  select(row: OperatoreDto) {
    this.onSelect.emit(row.id);
  }

}
