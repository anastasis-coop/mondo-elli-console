import { Component, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { emailStrictlyValidator, EMAIL_VALIDATOR_PATTERN } from 'src/app/validators/email-strictly.validator';

import { AuthService } from '../auth.service';
import { TokenStorageService } from '../token-storage.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  readonly emailPattern = EMAIL_VALIDATOR_PATTERN;

  formGroup?: FormGroup;
  isLoggedIn: boolean = false;
  isLoginFailed: boolean = false;
  returnUrl: string = '';
  errorMessage: string = '';
  hide: boolean = true;

  constructor(private title: Title, private router: Router, private route: ActivatedRoute, private elementRef: ElementRef,
    private userService: UserService, private authService: AuthService, private tokenStorage: TokenStorageService) {
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      username: new FormControl("", [emailStrictlyValidator]),
      password: new FormControl("")
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.router.navigateByUrl(this.returnUrl);
    }
  }

  signIn() {
    this.isLoginFailed = false;
    if (this.formGroup && this.formGroup.valid) {
      this.authService.login(this.formGroup.value).subscribe({
        next: data => {
          this.tokenStorage.saveToken(data.token);
          this.tokenStorage.saveUser(data);
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.userService.initStatus(this.elementRef);
          this.router.navigateByUrl(this.returnUrl);
        },
        error: err => {
          if (err.status == 401) {
            this.errorMessage = "Dati di accesso errati";
          } else if (err.status == 403) {
            this.errorMessage = "Accesso non abilitato";
          } else {
            this.errorMessage = "Errore di comunicazione";
          }
          this.isLoginFailed = true;
        }
      });
    } else {
      this.errorMessage = "Dati inseriti non validi";
    }
  }

  lostPassword(): void {
    this.router.navigate(['auth/recupero-password']);
  }

}
