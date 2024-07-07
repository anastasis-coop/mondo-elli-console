import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { delay, startWith, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { ComuneDto } from '../dto/comune-dto';

export function ComuneDisplayValueFn(comune: ComuneDto) {
  let label = comune.nome ? comune.nome : '';
  if (comune.nome) {
    label = `${label} (${comune.targa})`;
  }
  return label;
};

@Injectable({
  providedIn: 'root'
})
export class IstatService {

  constructor(private http: HttpClient) { }

  public getComuni(): Observable<ComuneDto[]> {
    return this.http.get<ComuneDto[]>(environment.server + '/istat/comuni');
  }

  public getComuniCheInizianoPer(filtro: string): Observable<ComuneDto[]> {
    return this.http.get<ComuneDto[]>(environment.server + '/istat/comuni/quicksearch/' + filtro);
  }

  public setupComuneAutocomplete(comuneControl: AbstractControl | null): Observable<any[]> | undefined {
    return comuneControl?.valueChanges.pipe(startWith(null), switchMap(
      name => {
        if (typeof name === 'string') {
          return this.getComuniCheInizianoPer(name).pipe(delay(800));
        }
        return of([]);
      }
    ));
  }

}
