import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionePercorsoComponent } from './gestione-percorso.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';

describe('GestionePercorsoComponent', () => {
  let component: GestionePercorsoComponent;
  let fixture: ComponentFixture<GestionePercorsoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatDialogModule
      ],
      declarations: [
        GestionePercorsoComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(GestionePercorsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
