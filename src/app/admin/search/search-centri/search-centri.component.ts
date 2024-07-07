import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { QueryCentroDto } from '../../dto/query-centro-dto';

@Component({
  selector: 'app-search-centri',
  templateUrl: './search-centri.component.html',
  styleUrls: ['../search.component.scss']
})
export class SearchCentriComponent {

  formCentro: FormGroup;

  @Input() showPulisci: boolean = false;

  @Output() onCerca: EventEmitter<QueryCentroDto> = new EventEmitter<QueryCentroDto>();
  @Output() onPulisci: EventEmitter<void> = new EventEmitter<void>();

  constructor(private formBuilder: FormBuilder) {
    this.formCentro = this.createForm();
  }

  createForm(): FormGroup {
    return this.formBuilder.group({
      id: [''],
      nome: [''],
      codice: [''],
    });
  }

  cerca(): void {
    if (this.formCentro.valid) {
      let dto: QueryCentroDto = {
        id: this.formCentro.controls['id'].value,
        nome: this.formCentro.controls['nome'].value.trim(),
        codice: this.formCentro.controls['codice'].value.trim(),
      }
      this.onCerca.emit(dto);
    }
  }

  pulisci(): void {
    this.formCentro = this.createForm();
    this.onPulisci.emit();
  }

  @HostListener('keypress', ['$event'])
  keypress(event: KeyboardEvent) {
    if (event.key == 'Enter') {
      this.cerca();
    }
  }

}
