import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CentroDto } from '../dto/centro-dto';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PercorsoDto } from '../dto/percorso-dto';
import { OperatoreDto } from '../dto/operatore-dto';

const BASE_URL = environment.server;

@Injectable({
  providedIn: 'root'
})
export class CentroService {

  constructor(private http: HttpClient) { }

  public codiceExists(codice: string): Observable<boolean> {
    if (codice) {
      return this.http.post<boolean>(`${BASE_URL}/centri/exists`, { codice });
    } else {
      return new Observable<boolean>(observer => {
        observer.next(false);
        observer.complete();
      });
    }
  }

  createCentro(centro: CentroDto): Observable<CentroDto> {
    return this.http.post<CentroDto>(`${BASE_URL}/centri`, centro);
  }

  getCentro(id: number): Observable<CentroDto> {
    return this.http.get<CentroDto>(`${BASE_URL}/centri/${id}`);
  }

  updateCentro(id: number, centro: CentroDto): Observable<CentroDto> {
    return this.http.put<CentroDto>(`${BASE_URL}/centri/${id}`, centro);
  }

  deleteCentro(id: number): Observable<void> {
    return this.http.delete<void>(`${BASE_URL}/centri/${id}`);
  }

  getPercorsiCentro(id: number): Observable<PercorsoDto[]> {
    return this.http.get<PercorsoDto[]>(`${BASE_URL}/centri/${id}/percorsi`);
  }

  getOperatoriCentro(id: number): Observable<OperatoreDto[]> {
    return this.http.get<OperatoreDto[]>(`${BASE_URL}/centri/${id}/operatori`);
  }

  createPercorso(id: number, percorso: PercorsoDto): Observable<PercorsoDto> {
    return this.http.post<PercorsoDto>(`${BASE_URL}/centri/${id}/percorsi`, percorso);
  }

  createOperatore(id: number, operatore: OperatoreDto): Observable<OperatoreDto> {
    return this.http.post<OperatoreDto>(`${BASE_URL}/centri/${id}/operatori`, operatore);
  }

}
