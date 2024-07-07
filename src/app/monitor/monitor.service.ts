import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { MonitorEsplorazioneDto } from './dto/monitor-esplorazione-dto';
import { MonitorFunzioneDto } from './dto/monitor-funzione-dto';
import { MonitorPercorsoDto } from './dto/monitor-percorso-dto';
import { MonitorSessioneDto } from './dto/monitor-sessione-dto';
import { MonitorQuizDto } from './dto/monitor-quiz-dto';

const BASE_URL = environment.server;

@Injectable({
  providedIn: 'root'
})
export class MonitorService {

  constructor(private httpClient: HttpClient) { }

  public getPercorso(id: number): Observable<MonitorPercorsoDto[]> {
    return this.httpClient.get<MonitorPercorsoDto[]>(`${BASE_URL}/utenti/${id}/monitor/percorso`);
  }

  public getSessioni(id: number): Observable<MonitorSessioneDto[]> {
    return this.httpClient.get<MonitorSessioneDto[]>(`${BASE_URL}/utenti/${id}/monitor/sessioni`);
  }

  public getEsplorazioni(id: number): Observable<MonitorEsplorazioneDto[]> {
    return this.httpClient.get<MonitorEsplorazioneDto[]>(`${BASE_URL}/utenti/${id}/monitor/esplorazioni`);
  }

  public getFunzioneEsecutiva(id: number, funzione: string): Observable<MonitorFunzioneDto> {
    return this.httpClient.get<MonitorFunzioneDto>(`${BASE_URL}/utenti/${id}/monitor/${funzione}`);
  }

  public getQuiz(id: number): Observable<MonitorQuizDto[]> {
    return this.httpClient.get<MonitorQuizDto[]>(`${BASE_URL}/utenti/${id}/monitor/quiz`);
  }

}
