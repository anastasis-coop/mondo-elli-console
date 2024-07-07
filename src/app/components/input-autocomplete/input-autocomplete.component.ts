import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DoCheck,
  ElementRef,
  HostBinding,
  Injector,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  NgControl,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

/**
 * Validates if the value passed has a code in order to be declared as an
 * object provided by material autocomplete options
 */
function isAutocompleteOption(value: any): boolean {
  if (!value) return true;
  if (typeof value === 'string') {
    return false;
  }
  if (typeof value.id === 'string') {
    return (value.id != '');
  } else {
    return value.id > 0;
  }
}

/**
 * Validates the control value to have an `id` attribute. It is expected
 * control value to be an object.
 */
function containsIdValidation(control: AbstractControl): ValidationErrors | null {
  return isAutocompleteOption(control.value) ? null : { required: true };
}

/**
 * Componente generico con autocomplete.
 * Esempio di template di utilizzo:
 *
 * <input-autocomplete formControlName="comune" placeholder="Comune" [options]="comuni$ | async"
 *   [lengthToTriggerSearch]="2">
 * </input-autocomplete>
 * 
 * E nel controller:
 * 
 * // ...
 * comuni$: Observable<ComuneDto[]> | undefined;
 * // ...
 * 
 * constructor(private istatService: IstatService) {
 *   // ...
 *   this.comuni$ = this.comuneService.setupComuneAutocomplete(this.formGroup.get('comune'));
 *   // ...
 * }
 * 
 * NOTA BENE: L'oggetto utilizzato (nell'esempio ComuneDto) deve essere una classe
 * che implementa l'interfaccia InputAutocompleteModel e che quindi ha 
 * un'attributo id e una funzione asAutocompleteOption() 
 * che ritorna l'oggetto sotto forma di stringa da mostrare
 * tra le opzioni dell'Autocomplete.
 * 
 * Esempio:
 * 
 * export class ComuneDto implements InputAutocompleteModel {
 *   id!: number;
 *   nome!: string;
 *
 *   asAutocompleteOption(): string {
 *       return this.nome ? this.nome : '';
 *   }
 * }
 */
@Component({
  selector: 'app-input-autocomplete',
  templateUrl: './input-autocomplete.component.html',
  styleUrls: ['./input-autocomplete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: MatFormFieldControl,
      useExisting: InputAutocompleteComponent
    }
  ], host: {
    '[id]': 'id',
    '[attr.aria-describedby]': 'describedBy'
  }
})
export class InputAutocompleteComponent
  implements ControlValueAccessor, MatFormFieldControl<any>, OnInit, OnChanges, DoCheck {

  // Inner form control to link input text changes to mat autocomplete
  inputControl = new FormControl('', this.validators);
  noResults = false;
  isSearching = false;

  static nextId = 0;
  @HostBinding() id = `autocomplete-input-${InputAutocompleteComponent.nextId++}`;

  @HostBinding('class.floating')
  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  @HostBinding('attr.aria-describedby') describedBy = '';

  stateChanges = new Subject<void>();
  controlType = 'ana-input-autocomplete';
  errorState: boolean = false;
  focused = false;

  @Input() options: any[] | null = null;

  @Input() displayValueFunction: ((arg: any) => string) | null = null;
  @Input() displayOptionFunction: ((arg: any) => string) | null = null;

  @Input()
  set lengthToTriggerSearch(value: number) {
    this._lengthToTriggerSearch = coerceNumberProperty(value, 0);
  }

  @Input()
  get placeholder() {
    return this._placeholder;
  }
  set placeholder(plh) {
    this._placeholder = plh;
    this.stateChanges.next();
  }
  private _placeholder: string = '';

  @Input()
  get required() {
    return this._required;
  }
  set required(req) {
    this._required = coerceBooleanProperty(req);
    this.stateChanges.next();
  }
  public _required = false;

  @Input()
  get disabled() {
    return this._disabled;
  }
  set disabled(dis) {
    this._disabled = coerceBooleanProperty(dis);
    this.stateChanges.next();
  }
  public _disabled = false;

  get value(): any {
    return this.inputControl.value;
  }
  set value(value) {
    this.inputControl.setValue(value);
    this.ngOnChanges(value);
    this.stateChanges.next();
  }

  get empty() {
    const value = this.inputControl.value;
    return value ? false : true;
  }

  ngControl: NgControl;
  private _lengthToTriggerSearch = 3;


  constructor(public elRef: ElementRef, public injector: Injector,
    private changeDetectorRef: ChangeDetectorRef, private fm: FocusMonitor
  ) {
    this.ngControl = this.injector.get(NgControl);
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }

    fm.monitor(elRef.nativeElement, true).subscribe(origin => {
      this.focused = !!origin;
      this.stateChanges.next();
    });
  }

  ngOnInit() {
    if (this.ngControl) {
      // Set validators for the outer ngControl equals to the inner
      const control = this.ngControl.control;
      if (control) {
        let validators = [];
        if (control.validator) {
          validators.push(control.validator);
        }
        if (this.inputControl.validator) {
          validators.push(this.inputControl.validator);
        }
        control.setValidators(validators);
        // Update outer ngControl status
        control.updateValueAndValidity({ emitEvent: false });
      }
    }
  }

  ngOnDestroy() {
    this.stateChanges.complete();
    this.fm.stopMonitoring(this.elRef.nativeElement);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['options']) {
      if (this.isSearching) {
        this.isSearching = false;
        if (!changes['options'].firstChange && !changes['options'].currentValue.length) {
          this.noResults = true;
        } else {
          this.noResults = false;
          if (!this.focused) {
            this.value = changes['options']['currentValue'][0];
          }
        }
      }
    }
  }

  ngDoCheck(): void {
    if (this.ngControl) {
      this.errorState = (this.ngControl.invalid && this.ngControl.touched) || false;
      this.stateChanges.next();
    }
  }

  onContainerClick(event: MouseEvent) {
    if ((event.target as Element).tagName.toLowerCase() != 'div') {
      this.elRef.nativeElement.querySelector('input').focus();
    }
  }

  /**
   * Allows Angular to update the inputControl.
   * Update the model and changes needed for the view here.
   */
  writeValue(obj: any): void {
    obj && this.inputControl.setValue(obj);
  }

  /**
   * Allows Angular to register a function to call when the inputControl changes.
   */
  registerOnChange(fn: any): void {
    // Pass the value to the outer ngControl if it has an id otherwise pass null
    this.inputControl.valueChanges.pipe(debounceTime(300)).subscribe({
      next: value => {
        if (typeof value === 'string') {
          if (this.isMinLength(value)) {
            this.isSearching = true;
            /**
             * Fire change detection to display the searching status option
             */
            this.changeDetectorRef.detectChanges();
            fn(value.toLowerCase());
          } else {
            this.isSearching = false;
            this.noResults = false;

            fn(null);
          }
        } else {
          fn(value);
        }
      },
    });
  }

  /**
   * Allows Angular to register a function to call when the input has been touched.
   * Save the function as a property to call later here.
   */
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  /**
   * Allows Angular to disable the input.
   */
  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.inputControl.disable() : this.inputControl.enable();
  }

  /**
   * Function to call when the input is touched.
   */
  onTouched() { }

  /**
   * Method linked to the mat-autocomplete `[displayWith]` input.
   * This is how result name is printed in the input box.
   */
  displayFn(result?: any): string {
    if (!result) {
      return '';
    } else if (this.displayValueFunction) {
      return this.displayValueFunction(result);
    } else if (this.displayOptionFunction) {
      return this.displayOptionFunction(result);
    } else {
      console.error("In un autocomplete manca l'attributo displayValueFunction.");
      return '';
    }
  }

  /**
   * Show value of an option.
   */
  displayOptionFn(value?: any): string {
    if (!value) {
      return '';
    } else if (this.displayOptionFunction) {
      return this.displayOptionFunction(value);
    } else if (this.displayValueFunction) {
      return this.displayValueFunction(value);
    } else {
      console.error("In un autocomplete manca l'attributo displayOptionFunction.");
      return '';
    }
  }

  isMinLength(value: string) {
    return value.length >= this._lengthToTriggerSearch;
  }

  setDescribedByIds(ids: string[]) {
    this.describedBy = ids.join(' ');
  }

  private get validators(): ValidatorFn[] {
    const validators = (this.required) ? [Validators.required] : [];
    validators.push(containsIdValidation);
    return validators;
  }
}