import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AccountDto } from '../dto/account-dto';
import { TokenDto } from '../security/token-dto';

const BASE_URL = environment.server;

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  public accountExists(username: string): Observable<boolean> {
    if (username) {
      return this.http.post<boolean>(`${BASE_URL}/accounts/exists`, { username });
    } else {
      return new Observable<boolean>(observer => {
        observer.next(false);
        observer.complete();
      });
    }
  }

  public samePassword(password: string): Observable<boolean> {
    if (password) {
      return this.http.post<boolean>(`${BASE_URL}/accounts/same-password`, { password });
    } else {
      return new Observable<boolean>(observer => {
        observer.next(false);
        observer.complete();
      });
    }
  }

  public recoverPassword(username: string): Observable<void> {
    return this.http.post<void>(`${BASE_URL}/accounts/recover`, { username });
  }

  public getAccount(id: number): Observable<AccountDto> {
    return this.http.get<AccountDto>(`${BASE_URL}/accounts/${id}`);
  }

  public setAccountUsername(accountId: number, username: string): Observable<TokenDto> {
    return this.http.post<TokenDto>(`${BASE_URL}/accounts/${accountId}/username`, { username });
  }

  public setAccountPassword(accountId: number, password: string): Observable<void> {
    return this.http.post<void>(`${BASE_URL}/accounts/${accountId}/password`, { password });
  }

  public acceptPrivacy(accountId: number): Observable<void> {
    return this.http.post<void>(`${BASE_URL}/accounts/${accountId}/privacy`, null);
  }

}
