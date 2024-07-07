import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSceltaOperatoriComponent } from './dialog-scelta-operatori.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';

describe('DialogSceltaOperatoriComponent', () => {
  let component: DialogSceltaOperatoriComponent;
  let fixture: ComponentFixture<DialogSceltaOperatoriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        MatListModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: null },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ],
      declarations: [
        DialogSceltaOperatoriComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DialogSceltaOperatoriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
