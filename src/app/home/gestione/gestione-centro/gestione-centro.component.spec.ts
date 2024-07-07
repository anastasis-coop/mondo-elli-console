import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestioneCentroComponent } from './gestione-centro.component';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('GestioneCentroComponent', () => {
  let component: GestioneCentroComponent;
  let fixture: ComponentFixture<GestioneCentroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MatDialogModule
      ],
      declarations: [
        GestioneCentroComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(GestioneCentroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
