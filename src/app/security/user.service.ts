import { ElementRef, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import idleTimeout from 'idle-timeout';
import IdleTimeout from 'idle-timeout/dist/IdleTimeout';
import { AuthService } from './auth.service';

import { ROLES } from './ROLES';
import { TokenStorageService } from './token-storage.service';
import { TokenService } from './token.service';
import { TokenDto } from './token-dto';

export const MAX_IDLE_TIME = 4 * 60 * 60 * 1000; // 4 ore
export const REFRESH_TOKEN_TIME = 15 * 60 * 1000; // 15 minuti

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private roles: string[] = [];
  public isLoggedIn: boolean = false;
  public isAdmin = false;
  public isSupport = false;
  public isOperator = false;
  public userId: number = 0;
  public username: string = '';
  public impersona: boolean = false;
  public mustAcceptPrivacy: boolean = false;
  public passwordExpired: boolean = false;

  private idleTimeoutInstance: IdleTimeout | null = null;
  private currentRefreshTokenTimeout: any = null;

  constructor(private router: Router, private authService: AuthService,
    private tokenService: TokenService, private tokenStorage: TokenStorageService) { }

  public initStatus(elementRef: ElementRef): void {
    this.initIdleTimeout(elementRef);
    this.isLoggedIn = !!this.tokenStorage.getToken();
    if (this.isLoggedIn) {
      this.checkToken();
      this.updateUser();
      this.idleTimeoutInstance?.resume();
      this.refreshToken();
    } else {
      this.idleTimeoutInstance?.pause();
      this.tokenStorage.signOut();
      this.clear();
    }
  }

  public logout(): void {
    this.stopRefreshToken();
    this.idleTimeoutInstance?.pause();
    this.tokenStorage.signOut();
    this.clear();
  }

  private clear(): void {
    this.roles = [];
    this.isLoggedIn = false;
    this.isOperator = false;
    this.userId = 0;
    this.username = '';
    this.mustAcceptPrivacy = false;
  }

  private updateUser(): void {
    const user = this.tokenStorage.getUser();
    this.roles = user.roles;
    this.userId = user.id;
    this.isAdmin = this.roles.includes(ROLES.ADMIN);
    this.isSupport = this.roles.includes(ROLES.ASSISTENZA);
    this.isOperator = this.roles.includes(ROLES.OPERATORE);
    this.username = user.username;
    this.mustAcceptPrivacy = (user.privacy !== true);
  }

  // Aggiornamento username dopo un cambio email
  public updateUsername(username: string): void {
    const user = this.tokenStorage.getUser();
    user.username = username;
    this.tokenStorage.saveUser(user);
    this.username = username;
  }

  // Aggiornamento token dopo un cambio email
  public updateToken(token: string): void {
    this.tokenStorage.saveToken(token);
  }

  public hasRole(role: string): boolean {
    return this.roles.includes(role);
  }

  public impersonate(id: number): void {
    this.authService.impersonate(id).subscribe(data => {
      this.tokenStorage.saveToken(data.token);
      this.tokenStorage.saveUser(data);
      this.impersona = true;
      this.updateUser();
      this.router.navigate(['']);
    });
  }

  private initIdleTimeout(elementRef: ElementRef): void {
    if (this.idleTimeoutInstance === null) {
      this.idleTimeoutInstance = idleTimeout(() => {
        this.logout();
      }, {
        element: elementRef.nativeElement,
        timeout: MAX_IDLE_TIME,
        loop: false
      });
    }
  }

  /**
   * Chiede al server se il token è ancora valido.
   * Se non è valido ci pensa AuthInterceptor a
   * portare l'utente al login.
   */
  private checkToken(): void {
    this.tokenService.checkToken().subscribe(() => console.log('Token checked'));
  }

  private refreshToken(): void {
    if (this.isLoggedIn) {
      this.currentRefreshTokenTimeout = setTimeout(() => {
        this.tokenService.extendToken().subscribe((data: TokenDto) => {
          this.tokenStorage.saveToken(data.token);
        });
        this.refreshToken();
      }, REFRESH_TOKEN_TIME);
    }
  }

  private stopRefreshToken(): void {
    if (this.currentRefreshTokenTimeout !== null) {
      clearTimeout(this.currentRefreshTokenTimeout);
      this.currentRefreshTokenTimeout = null;
    }
  }

}
