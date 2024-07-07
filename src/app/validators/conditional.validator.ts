import { FormControl, ValidatorFn } from '@angular/forms';

export function conditionalValidator(condition: () => boolean, validator: ValidatorFn | null) {
  return ((formControl: FormControl) => {
    if (!formControl.parent) {
      return null;
    }
    if (condition() && validator != null) {
      return validator(formControl);
    }
    return null;
  })
}