import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const BASE_URL = environment.server;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public login(credentials: any): Observable<any> {
    return this.http.post(`${BASE_URL}/auth/console-login`, credentials);
  }

  public tokenLogin(token: string): Observable<any> {
    return this.http.post<any>(`${BASE_URL}/auth/token-login`, { token });
  }

  public gameLogin(credentials: any): Observable<any> {
    return this.http.post(`${BASE_URL}/auth/login`, credentials);
  }

  public impersonate(id: number): Observable<any> {
    return this.http.post(`${BASE_URL}/auth/impersonate/${id}`, null);
  }

}
