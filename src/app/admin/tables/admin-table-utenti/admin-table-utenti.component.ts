import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { tap } from 'rxjs/operators';

import { AdminTableUtentiDataSource } from './admin-table-utenti-datasource';
import { AdminService } from '../../admin.service';
import { QueryUtenteDto } from '../../dto/query-utente-dto';
import { UtenteDto } from 'src/app/dto/utente-dto';

@Component({
  selector: 'app-admin-table-utenti',
  templateUrl: './admin-table-utenti.component.html',
  styleUrls: ['../admin-table.component.scss']
})
export class AdminTableUtentiComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatTable) table?: MatTable<UtenteDto>;

  dataSource?: AdminTableUtentiDataSource;

  @Input() queryUtente?: QueryUtenteDto;
  @Output() onSelect: EventEmitter<number> = new EventEmitter<number>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'username'];

  constructor(private adminService: AdminService) {
  }

  ngOnInit() {
    this.dataSource = new AdminTableUtentiDataSource(this.adminService);
  }

  ngAfterViewInit() {
    if (this.dataSource && this.table && this.paginator) {
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
      this.paginator.page.pipe(
        tap(() => {
          if (this.dataSource && this.queryUtente && this.paginator) {
            this.dataSource.loadUtenti(this.queryUtente, 'asc', this.paginator.pageIndex, this.paginator.pageSize);
          }
        })
      ).subscribe();
    }
  }

  loadData(): Promise<void> {
    if (this.dataSource && this.queryUtente && this.paginator) {
      this.paginator.firstPage();
      return this.dataSource.loadUtenti(this.queryUtente, 'asc', this.paginator.pageIndex, this.paginator.pageSize);
    } else {
      return new Promise<void>(resolve => resolve());
    }
  }

  select(row: UtenteDto) {
    this.onSelect.emit(row.id);
  }

}
