import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { AdminService } from '../../admin.service';
import { PagedDto } from '../../dto/paged-dto';
import { QueryUtenteDto } from '../../dto/query-utente-dto';
import { UtenteDto } from 'src/app/dto/utente-dto';

/**
 * Data source for the TableUtente view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class AdminTableUtentiDataSource extends DataSource<UtenteDto> {
  paginator?: MatPaginator;

  private utentiSubject = new BehaviorSubject<UtenteDto[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();
  numberOfElements: number = 0;
  totalPages: number = 0;
  totalElements: number = 0;

  constructor(private assistenzaService: AdminService) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(collectionViewer: CollectionViewer): Observable<UtenteDto[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    return this.utentiSubject.asObservable();
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(collectionViewer: CollectionViewer): void {
    this.utentiSubject.complete();
    this.loadingSubject.complete();
  }

  loadUtenti(filter: QueryUtenteDto, sortDirection = 'asc', pageIndex = 0, pageSize = 3): Promise<void> {
    return new Promise<void>(resolve => {
      this.loadingSubject.next(true);
      this.assistenzaService.findUtenti(filter, sortDirection,
        pageIndex, pageSize).pipe(
          catchError(() => of([])),
          finalize(() => this.loadingSubject.next(false))
        ).subscribe((res: PagedDto<UtenteDto> | never[]) => {
          res = res as PagedDto<UtenteDto>;
          this.utentiSubject.next(res.content);
          this.numberOfElements = res.numberOfElements;
          this.totalPages = res.totalPages;
          this.totalElements = res.totalElements;
          resolve();
        });
    });
  }

}
