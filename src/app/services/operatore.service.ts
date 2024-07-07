import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OperatoreDto } from '../dto/operatore-dto';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CentroDto } from '../dto/centro-dto';
import { PercorsoDto } from '../dto/percorso-dto';

const BASE_URL = environment.server;

@Injectable({
  providedIn: 'root'
})
export class OperatoreService {

  constructor(private http: HttpClient) { }

  getOperatore(id: number): Observable<OperatoreDto> {
    return this.http.get<OperatoreDto>(`${BASE_URL}/operatori/${id}`);
  }

  updateOperatore(id: number, operatore: OperatoreDto): Observable<OperatoreDto> {
    return this.http.put<OperatoreDto>(`${BASE_URL}/operatori/${id}`, operatore);
  }

  deleteOperatore(id: number): Observable<void> {
    return this.http.delete<void>(`${BASE_URL}/operatori/${id}`);
  }

  getCentroOperatore(id: number): Observable<CentroDto> {
    return this.http.get<CentroDto>(`${BASE_URL}/operatori/${id}/centro`);
  }

  getPercorsiOperatore(id: number): Observable<PercorsoDto[]> {
    return this.http.get<PercorsoDto[]>(`${BASE_URL}/operatori/${id}/percorsi`);
  }

  getPercorsiOperatoreArchiviati(id: number): Observable<PercorsoDto[]> {
    return this.http.get<PercorsoDto[]>(`${BASE_URL}/operatori/${id}/percorsi/archiviati`);
  }

  addPercorsoToOperatore(gid: number, oid: number): Observable<void> {
    return this.http.post<void>(`${BASE_URL}/operatori/${oid}/percorsi/${gid}`, null);
  }

  removePercorsoFromOperatore(gid: number, oid: number): Observable<void> {
    return this.http.delete<void>(`${BASE_URL}/operatori/${oid}/percorsi/${gid}`);
  }

  invioMailPrimoAccesso(id: number): Observable<void> {
    return this.http.post<void>(`${BASE_URL}/operatori/${id}/invia-mail`, null);
  }

  invioMailAssistenza(id: number, messaggio: string): Observable<void> {
    return this.http.post<void>(`${BASE_URL}/operatori/${id}/assistenza`, { messaggio });
  }

}
