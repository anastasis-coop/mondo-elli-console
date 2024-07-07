import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidator, ValidationErrors } from "@angular/forms";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AccountService } from "src/app/services/account.service";

/** Riutilizzo della stessa password */
@Injectable
    ({ providedIn: 'root' })
export class SamePasswordValidator implements AsyncValidator {
    constructor(private accountService: AccountService) { }

    validate(
        control: AbstractControl
    ): Observable<ValidationErrors | null> {
        return this.accountService.samePassword(control.value).pipe(
            map(exists => (exists ? { samePassword: true } : null))
        );
    }
}
