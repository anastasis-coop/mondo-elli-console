import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionePercorsiComponent } from './gestione-percorsi.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatIconModule } from '@angular/material/icon';
import { TablePercorsiComponent } from '../../tables/table-percorsi/table-percorsi.component';
import { LoadingComponent } from 'src/app/components/loading/loading.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule } from '@angular/material/dialog';

describe('GestionePercorsiComponent', () => {
  let component: GestionePercorsiComponent;
  let fixture: ComponentFixture<GestionePercorsiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MatDialogModule,
        MatIconModule
      ],
      declarations: [
        GestionePercorsiComponent,
        TablePercorsiComponent,
        LoadingComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(GestionePercorsiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
