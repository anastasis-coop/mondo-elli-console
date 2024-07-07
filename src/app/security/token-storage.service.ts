import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

const BACKUP_TOKEN_KEY = 'backup-auth-token';
const BACKUP_USER_KEY = 'backup-auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  signOut(): void {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(USER_KEY);
  }

  public saveToken(token: string): void {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    const token = sessionStorage.getItem(TOKEN_KEY);
    return token ? token : '';
  }

  public saveUser(user: any): void {
    sessionStorage.removeItem(USER_KEY);
    let userCopy = {
      id: user.id,
      username: user.username,
      roles: user.roles,
      privacy: user.privacy
    };
    sessionStorage.setItem(USER_KEY, JSON.stringify(userCopy));
  }

  public getUser(): any {
    let userJSON = sessionStorage.getItem(USER_KEY);
    let user = userJSON ? JSON.parse(userJSON) : {};
    user.token = this.getToken();
    user.type = "Bearer";
    return user;
  }

  public backupCredentials(): boolean {
    let token = sessionStorage.getItem(TOKEN_KEY);
    let user = sessionStorage.getItem(USER_KEY);
    if (token && user) {
      sessionStorage.setItem(BACKUP_TOKEN_KEY, token);
      sessionStorage.setItem(BACKUP_USER_KEY, user);
      return true;
    } else {
      return false;
    }
  }

  public restoreCredentials(): boolean {
    let token = sessionStorage.getItem(BACKUP_TOKEN_KEY);
    let user = sessionStorage.getItem(BACKUP_USER_KEY);
    if (token && user) {
      sessionStorage.setItem(TOKEN_KEY, token);
      sessionStorage.setItem(USER_KEY, user);
      sessionStorage.removeItem(BACKUP_TOKEN_KEY);
      sessionStorage.removeItem(BACKUP_USER_KEY);
      return true;
    } else {
      return false;
    }
  }

}
