import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { UserService } from '../user.service';
import { passwordUgualiValidator } from './password-uguali.validator';
import { passwordValidator } from './password.validator';
import { SamePasswordValidator } from './same-password.validator';

@Component({
  selector: 'app-set-password',
  templateUrl: './imposta-password.component.html',
  styleUrls: ['./imposta-password.component.scss']
})
export class ImpostaPasswordComponent implements OnInit {

  readonly errorTooShort = "La password è troppo corta.";
  readonly errorInvalidChars = "La password contiene caratteri non ammessi.";
  readonly errorMissingUppercase = "La password deve contenere almeno una maiuscola.";
  readonly errorMissingLowercase = "La password deve contenere almeno una minuscola.";
  readonly errorMissingNumbers = "La password deve contenere almeno un numero.";
  readonly errorMissingSymbols = "La password deve contenere almeno un simbolo.";
  readonly errorSamePassword = "La password deve essere diversa dalla precedente.";
  readonly errorDifferentPassword = "Le due password inserite devono essere uguali.";

  username: string = '';
  hide1: boolean = true;
  hide2: boolean = true;

  formGroup?: FormGroup;

  constructor(private router: Router, private userService: UserService, private accountService: AccountService,
    private samePasswordValidator: SamePasswordValidator) { }

  ngOnInit(): void {
    this.username = this.userService.username;
    this.formGroup = new FormGroup({
      email: new FormControl(),
      password: new FormControl("", {
        asyncValidators: [this.samePasswordValidator.validate.bind(this.samePasswordValidator)],
        validators: [passwordValidator],
        updateOn: 'blur'
      }),
      checkpwd: new FormControl("")
    }, { validators: [passwordUgualiValidator] });
  }

  checkControlError(controlName: string, errorName: string): boolean {
    if (this.formGroup) {
      let control = this.formGroup.controls[controlName];
      return control && control.touched && control.errors && control.errors[errorName];
    } else {
      return false;
    }
  }

  checkFormError(errorName: string): boolean {
    return this.formGroup && this.formGroup.touched && this.formGroup.errors && this.formGroup.errors[errorName];
  }

  submit() {
    if (this.formGroup && this.formGroup.valid) {
      this.accountService.setAccountPassword(this.userService.userId, this.formGroup.controls['password'].value).subscribe(() => {
        this.userService.passwordExpired = false;
        this.router.navigate(['']);
      });
    }
  }

}
