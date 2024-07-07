import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { CentroDto } from '../dto/centro-dto';
import { OperatoreDto } from '../dto/operatore-dto';
import { QueryCentroDto } from './dto/query-centro-dto';
import { QueryOperatoreDto } from './dto/query-operatore-dto';
import { QueryUtenteDto } from './dto/query-utente-dto';
import { PagedDto } from './dto/paged-dto';
import { UtenteDto } from '../dto/utente-dto';

const BASE_URL = environment.server;

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  findCentri(queryCentro?: QueryCentroDto, sortOrder = 'asc', pageNumber = 0, pageSize = 20): Observable<PagedDto<CentroDto>> {
    let params: HttpParams = new HttpParams();
    if (queryCentro) {
      if (queryCentro.id) { params = params.set('id', queryCentro.id); }
      if (queryCentro.nome) { params = params.set('nome', queryCentro.nome); }
      if (queryCentro.codice) { params = params.set('codice', queryCentro.codice); }
    }
    if (sortOrder) { params = params.set('sortOrder', sortOrder); }
    if (pageNumber) { params = params.set('pageNumber', pageNumber.toString()); }
    if (pageSize) { params = params.set('pageSize', pageSize.toString()); }
    return this.http.get<PagedDto<CentroDto>>(`${BASE_URL}/centri`, { params });
  }

  findOperatori(queryOperatore?: QueryOperatoreDto, sortOrder = 'asc', pageNumber = 0, pageSize = 20): Observable<PagedDto<OperatoreDto>> {
    let params: HttpParams = new HttpParams();
    if (queryOperatore) {
      if (queryOperatore.id) { params = params.set('id', queryOperatore.id); }
      if (queryOperatore.username) { params = params.set('username', queryOperatore.username); }
      if (queryOperatore.nome) { params = params.set('nome', queryOperatore.nome); }
      if (queryOperatore.cognome) { params = params.set('cognome', queryOperatore.cognome); }
    }
    if (sortOrder) { params = params.set('sortOrder', sortOrder); }
    if (pageNumber) { params = params.set('pageNumber', pageNumber.toString()); }
    if (pageSize) { params = params.set('pageSize', pageSize.toString()); }
    return this.http.get<PagedDto<OperatoreDto>>(`${BASE_URL}/operatori`, { params });
  }

  findUtenti(queryUtente?: QueryUtenteDto, sortOrder = 'asc', pageNumber = 0, pageSize = 20): Observable<PagedDto<UtenteDto>> {
    let params: HttpParams = new HttpParams();
    if (queryUtente) {
      if (queryUtente.id) { params = params.set('id', queryUtente.id); }
      if (queryUtente.username) { params = params.set('username', queryUtente.username); }
    }
    if (sortOrder) { params = params.set('sortOrder', sortOrder); }
    if (pageNumber) { params = params.set('pageNumber', pageNumber.toString()); }
    if (pageSize) { params = params.set('pageSize', pageSize.toString()); }
    return this.http.get<PagedDto<UtenteDto>>(`${BASE_URL}/utenti`, { params });
  }

}
