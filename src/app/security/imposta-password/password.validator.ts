import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

const REQUIRED_LENGTH = 8;
const UPPERCASE_LETTERS = "A-Z";
const LOWERCASE_LETTERS = "a-z";
const LETTERS = UPPERCASE_LETTERS + LOWERCASE_LETTERS;
const NUMBERS = "0-9";
const SYMBOLS = "-+_!@#$%^&*.,?";
const ALLOWED_CHARS = LETTERS + NUMBERS + SYMBOLS;

export const passwordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    if (control == null || control.value == null || control.value == '') {
        return null;
    }

    let result: any | null = null;
    if (control.value.length < REQUIRED_LENGTH) {
        result = result ? result : {};
        result['tooShort'] = true;
    }
    if (!new RegExp("^[" + ALLOWED_CHARS + "]+$").test(control.value)) {
        result = result ? result : {};
        result['invalidChars'] = true;
    }
    if (!new RegExp(".*[" + UPPERCASE_LETTERS + "].*").test(control.value)) {
        result = result ? result : {};
        result['missingUppercase'] = true;
    }
    if (!new RegExp(".*[" + LOWERCASE_LETTERS + "].*").test(control.value)) {
        result = result ? result : {};
        result['missingLowercase'] = true;
    }
    if (!new RegExp(".*[" + NUMBERS + "].*").test(control.value)) {
        result = result ? result : {};
        result['missingNumbers'] = true;
    }
    //  if (!new RegExp(".*[" + SYMBOLS + "].*").test(control.value)) {
    //      result = result ? result : {};
    //      result['missingSymbols'] = true;
    //  }

    return result;
};
