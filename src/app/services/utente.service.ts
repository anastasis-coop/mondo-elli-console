import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtenteDto } from '../dto/utente-dto';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PercorsoDto } from '../dto/percorso-dto';

const BASE_URL = environment.server;

@Injectable({
  providedIn: 'root'
})
export class UtenteService {

  constructor(private http: HttpClient) { }

  getUtente(id: number): Observable<UtenteDto> {
    return this.http.get<UtenteDto>(`${BASE_URL}/utenti/${id}`);
  }

  updateUtente(id: number, utente: UtenteDto): Observable<UtenteDto> {
    return this.http.put<UtenteDto>(`${BASE_URL}/utenti/${id}`, utente);
  }

  deleteUtente(id: number): Observable<void> {
    return this.http.delete<void>(`${BASE_URL}/utenti/${id}`);
  }

  getPercorsoUtente(id: number): Observable<PercorsoDto> {
    return this.http.get<PercorsoDto>(`${BASE_URL}/utenti/${id}/percorso`);
  }

}
