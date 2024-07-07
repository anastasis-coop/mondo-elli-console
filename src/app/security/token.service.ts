import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenDto } from './token-dto';
import { environment } from 'src/environments/environment';

const BASE_URL = environment.server;

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private http: HttpClient) { }

  public checkToken(): Observable<void> {
    return this.http.get<void>(`${BASE_URL}/token/check`);
  }

  public extendToken(): Observable<TokenDto> {
    return this.http.get<TokenDto>(`${BASE_URL}/token/extend`);
  }

}
