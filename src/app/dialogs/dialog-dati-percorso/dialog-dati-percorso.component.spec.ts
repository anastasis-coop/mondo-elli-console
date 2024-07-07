import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDatiPercorsoComponent } from './dialog-dati-percorso.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { TimelinePercorsoComponent } from 'src/app/components/timeline-percorso/timeline-percorso.component';
import { MatSliderModule } from '@angular/material/slider';
import { AgendaPercorsoComponent } from 'src/app/components/agenda-percorso/agenda-percorso.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatIconModule } from '@angular/material/icon';

describe('DialogDatiPercorsoComponent', () => {
  let component: DialogDatiPercorsoComponent;
  let fixture: ComponentFixture<DialogDatiPercorsoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatDialogModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSliderModule,
        MatSlideToggleModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: null },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ],
      declarations: [
        DialogDatiPercorsoComponent,
        TimelinePercorsoComponent,
        AgendaPercorsoComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DialogDatiPercorsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
