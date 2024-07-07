import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSceltaPercorsiComponent } from './dialog-scelta-percorsi.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';

describe('DialogSceltaPercorsiComponent', () => {
  let component: DialogSceltaPercorsiComponent;
  let fixture: ComponentFixture<DialogSceltaPercorsiComponent>;

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
        DialogSceltaPercorsiComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DialogSceltaPercorsiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
