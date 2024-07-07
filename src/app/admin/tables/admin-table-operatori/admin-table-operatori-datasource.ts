import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { PagedDto } from '../../dto/paged-dto';
import { QueryOperatoreDto } from '../../dto/query-operatore-dto';
import { AdminService } from '../../admin.service';
import { OperatoreDto } from 'src/app/dto/operatore-dto';

/**
 * Data source for the TableOperatori view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class AdminTableOperatoriDataSource extends DataSource<OperatoreDto> {
  paginator?: MatPaginator;

  private operatoriSubject = new BehaviorSubject<OperatoreDto[]>([]);
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
  connect(collectionViewer: CollectionViewer): Observable<OperatoreDto[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    return this.operatoriSubject.asObservable();
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(collectionViewer: CollectionViewer): void {
    this.operatoriSubject.complete();
    this.loadingSubject.complete();
  }

  loadOperatori(filter: QueryOperatoreDto, sortDirection = 'asc', pageIndex = 0, pageSize = 3): Promise<void> {
    return new Promise<void>(resolve => {
      this.loadingSubject.next(true);
      this.adminService.findOperatori(filter, sortDirection, pageIndex, pageSize).pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      ).subscribe((res: PagedDto<OperatoreDto> | never[]) => {
        res = res as PagedDto<OperatoreDto>;
        this.operatoriSubject.next(res.content);
        this.numberOfElements = res.numberOfElements;
        this.totalPages = res.totalPages;
        this.totalElements = res.totalElements;
        resolve();
      });
    });
  }

}
