import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { AccountInesistenteValidator } from 'src/app/validators/account-inesistente.validator';
import { emailStrictlyValidator, EMAIL_VALIDATOR_PATTERN } from 'src/app/validators/email-strictly.validator';

@Component({
  selector: 'app-recupero-password',
  templateUrl: './recupero-password.component.html',
  styleUrls: ['./recupero-password.component.scss']
})
export class RecuperoPasswordComponent implements OnInit {

  readonly emailPattern = EMAIL_VALIDATOR_PATTERN;

  errorValido = "Inserire un indirizzo email valido";
  errorInesistente = "Non esiste un account associato a questa email";
  errorDisabilitato = "Questa email è stata disabilitata";

  formGroup?: FormGroup;

  mailSent: boolean = false;
  accountDisabilitato: boolean = false;

  constructor(private router: Router, private accountService: AccountService,
    private accountInesistenteValidator: AccountInesistenteValidator) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      email: new FormControl("", {
        asyncValidators: [this.accountInesistenteValidator.validate.bind(this.accountInesistenteValidator)],
        validators: [emailStrictlyValidator],
        updateOn: 'blur'
      })
    });
  }

  cancel() {
    this.router.navigate(['']);
  }

  get email(): string {
    return this.formGroup ? this.formGroup.controls['email'].value : '';
  }

  checkControlError(controlName: string, errorName: string): boolean {
    if (this.formGroup) {
      let control = this.formGroup.controls[controlName];
      return control && control.touched && control.errors && control.errors[errorName];
    } else {
      return false;
    }
  }

  submit() {
    this.accountDisabilitato = false;
    if (this.formGroup && this.formGroup.valid) {
      this.accountService.recoverPassword(this.formGroup.controls['email'].value).subscribe({
        next: () => {
          this.mailSent = true;
        },
        error: (error: any) => {
          if (error.status == 403) {
            this.accountDisabilitato = true;
          }
        }
      });
    }
  }

}
