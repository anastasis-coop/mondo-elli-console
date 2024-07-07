import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const EMAIL_VALIDATOR_PATTERN = '^[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9.\\-]+\\.[a-zA-Z]{2,4}$';

/**
 * Valida un campo email con più rigidità rispetto al validatore standard di Angular
 * (ad esempio non accetta a@a)
 * @returns Il normale ritorno di un validatore
 */
export const emailStrictlyValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  if (control == null || control.value == null || control.value == '') {
    return null;
  }

  let re = new RegExp(EMAIL_VALIDATOR_PATTERN);

  let isValid = re.test(control.value);
  if (isValid) {
    return null;
  } else {
    return {
      email: true
    };
  }
};
