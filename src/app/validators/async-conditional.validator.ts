import { AsyncValidatorFn, FormControl, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';

export function asyncConditionalValidator(condition: () => boolean, validator: AsyncValidatorFn | null) {

  return ((formControl: FormControl): Observable<ValidationErrors | null> | Promise<ValidationErrors | null> => {
    if (!formControl.parent) {
      return of(null);
    }
    if (condition() && validator != null) {
      return validator(formControl);
    }
    return of(null);
  });

}
