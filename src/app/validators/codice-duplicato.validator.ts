import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidator, ValidationErrors } from "@angular/forms";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { CentroService } from "../services/centro.service";

/** Codice duplicato */
@Injectable
    ({ providedIn: 'root' })
export class CodiceDuplicatoValidator implements AsyncValidator {
    constructor(private centroService: CentroService) { }

    validate(
        control: AbstractControl
    ): Observable<ValidationErrors | null> {
        return this.centroService.codiceExists(control.value).pipe(
            map(exists => (exists ? { codiceDoppio: true } : null))
        );
    }
}
