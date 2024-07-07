import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidator, ValidationErrors } from "@angular/forms";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AccountService } from "../services/account.service";

/** Indirizzo email duplicato */
@Injectable
    ({ providedIn: 'root' })
export class AccountDuplicatoValidator implements AsyncValidator {
    constructor(private accountService: AccountService) { }

    validate(
        control: AbstractControl
    ): Observable<ValidationErrors | null> {
        return this.accountService.accountExists(control.value).pipe(
            map(exists => (exists ? { accountDoppio: true } : null))
        );
    }
}
