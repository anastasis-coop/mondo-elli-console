import { LocationStrategy } from '@angular/common';
import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { TokenStorageService } from '../token-storage.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-token-login',
  templateUrl: './token-login.component.html',
  styleUrls: ['./token-login.component.scss']
})
export class TokenLoginComponent implements OnInit {

  passwordTokenError: boolean = false;

  constructor(
    private router: Router, private route: ActivatedRoute, private elementRef: ElementRef,
    private authService: AuthService, private tokenStorage: TokenStorageService, private userService: UserService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const token = params.get('token');
      if (token) {
        this.authService.tokenLogin(token).subscribe({
          next: data => {
            this.tokenStorage.saveToken(data.token);
            this.tokenStorage.saveUser(data);
            this.userService.initStatus(this.elementRef);
            this.router.navigate(['auth/imposta-password']);
          },
          error: () => {
            // dice all'utente che il link non è valido oppure scaduto
            this.passwordTokenError = true;
          }
        });
      }
    });
  }
}
