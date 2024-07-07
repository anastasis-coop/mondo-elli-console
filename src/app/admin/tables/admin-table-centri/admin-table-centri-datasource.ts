import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { CentroDto } from '../../../dto/centro-dto';
import { AdminService } from '../../admin.service';
import { PagedDto } from '../../dto/paged-dto';
import { QueryCentroDto } from '../../dto/query-centro-dto';

/**
 * Data source for the TableCentro view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class AdminTableCentriDataSource extends DataSource<CentroDto> {

  paginator?: MatPaginator;

  private centriSubject = new BehaviorSubject<CentroDto[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();
  numberOfElements: number = 0;
  totalPages: number = 0;
  totalElements: number = 0;

  constructor(private adminService: AdminService) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(collectionViewer: CollectionViewer): Observable<CentroDto[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    return this.centriSubject.asObservable();
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(collectionViewer: CollectionViewer): void {
    this.centriSubject.complete();
    this.loadingSubject.complete();
  }

  loadCentri(filter: QueryCentroDto, sortDirection = 'asc', pageIndex = 0, pageSize = 3): Promise<void> {
    return new Promise<void>(resolve => {
      this.loadingSubject.next(true);
      this.adminService.findCentri(filter, sortDirection, pageIndex, pageSize).pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      ).subscribe((res: PagedDto<CentroDto> | never[]) => {
        res = res as PagedDto<CentroDto>;
        this.centriSubject.next(res.content);
        this.numberOfElements = res.numberOfElements;
        this.totalPages = res.totalPages;
        this.totalElements = res.totalElements;
        resolve();
      });
    });
  }

}
