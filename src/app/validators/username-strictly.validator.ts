import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const USERNAME_VALIDATOR_PATTERN = '^[a-zA-Z0-9_]+$';

/**
 * Valida un campo username con più rigidità rispetto al validatore standard di Angular
 * (ad esempio accetta solo caratteri, numeri, trattino e underscore)
 * @returns Il normale ritorno di un validatore
 */
export const usernameStrictlyValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  if (control == null || control.value == null || control.value == '') {
    return null;
  }

  let re = new RegExp(USERNAME_VALIDATOR_PATTERN);

  let isValid = re.test(control.value);
  if (isValid) {
    return null;
  } else {
    return {
      username: true
    };
  }
};
