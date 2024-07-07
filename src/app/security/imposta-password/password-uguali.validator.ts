import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordUgualiValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    if (control) {
        // Controllo se le password inserite sono uguali
        let password1 = control.get('password');
        let password2 = control.get('checkpwd');
        if (password1 && password2 && password1.value != password2.value) {
            return {
                differentPassword: true
            };
        }
    }
    return null;
};