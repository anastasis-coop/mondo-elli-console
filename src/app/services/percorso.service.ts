import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PercorsoDto } from '../dto/percorso-dto';
import { Observable } from 'rxjs';
import { CentroDto } from '../dto/centro-dto';
import { OperatoreDto } from '../dto/operatore-dto';
import { UtenteDto } from '../dto/utente-dto';
import { SerieUtentiDto } from '../dto/serie-utenti-dto';
import { UtentePercorsoDto } from '../dto/utente-percorso-dto';

const BASE_URL = environment.server;

@Injectable({
  providedIn: 'root'
})
export class PercorsoService {

  constructor(private http: HttpClient) { }

  getPercorso(id: number): Observable<PercorsoDto> {
    return this.http.get<PercorsoDto>(`${BASE_URL}/percorsi/${id}`);
  }

  updatePercorso(id: number, percorso: PercorsoDto): Observable<PercorsoDto> {
    return this.http.put<PercorsoDto>(`${BASE_URL}/percorsi/${id}`, percorso);
  }

  deletePercorso(id: number): Observable<void> {
    return this.http.delete<void>(`${BASE_URL}/percorsi/${id}`);
  }

  getCentroPercorso(id: number): Observable<CentroDto> {
    return this.http.get<CentroDto>(`${BASE_URL}/percorsi/${id}/centro`);
  }

  getOperatoriPercorso(id: number): Observable<OperatoreDto[]> {
    return this.http.get<OperatoreDto[]>(`${BASE_URL}/percorsi/${id}/operatori`);
  }

  addOperatoreToPercorso(oid: number, gid: number): Observable<void> {
    return this.http.post<void>(`${BASE_URL}/percorsi/${gid}/operatori/${oid}`, null);
  }

  removeOperatoreFromPercorso(oid: number, gid: number): Observable<void> {
    return this.http.delete<void>(`${BASE_URL}/percorsi/${gid}/operatori/${oid}`);
  }

  getUtentiPercorso(id: number): Observable<UtenteDto[]> {
    return this.http.get<UtenteDto[]>(`${BASE_URL}/percorsi/${id}/utenti`);
  }

  getUtentiPercorsoFull(id: number): Observable<UtentePercorsoDto[]> {
    return this.http.get<UtentePercorsoDto[]>(`${BASE_URL}/percorsi/${id}/utenti/full`);
  }

  createUtente(id: number, utente: UtenteDto): Observable<UtenteDto> {
    return this.http.post<UtenteDto>(`${BASE_URL}/percorsi/${id}/utenti`, utente);
  }

  createSerieUtenti(id: number, serieUtenti: SerieUtentiDto): Observable<void> {
    return this.http.post<void>(`${BASE_URL}/percorsi/${id}/utenti/serie`, serieUtenti);
  }

  setFlagMediaLiteracyForPercorso(id: number, mediaLiteracy: boolean): Observable<void> {
    return this.http.post<void>(`${BASE_URL}/percorsi/${id}/media-literacy/${mediaLiteracy}`, null);
  }

  setFlagArchiviatoForPercorso(id: number, archiviato: boolean): Observable<void> {
    return this.http.post<void>(`${BASE_URL}/percorsi/${id}/archiviato/${archiviato}`, null);
  }

  archiviaPercorso(id: number): Observable<void> {
    return this.setFlagArchiviatoForPercorso(id, true);
  }

}
