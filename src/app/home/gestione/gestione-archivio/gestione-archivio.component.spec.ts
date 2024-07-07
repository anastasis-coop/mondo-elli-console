import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestioneArchivioComponent } from './gestione-archivio.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatIconModule } from '@angular/material/icon';
import { TablePercorsiComponent } from '../../tables/table-percorsi/table-percorsi.component';
import { LoadingComponent } from 'src/app/components/loading/loading.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule } from '@angular/material/dialog';

describe('GestionePercorsiComponent', () => {
  let component: GestioneArchivioComponent;
  let fixture: ComponentFixture<GestioneArchivioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MatDialogModule,
        MatIconModule
      ],
      declarations: [
        GestioneArchivioComponent,
        TablePercorsiComponent,
        LoadingComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(GestioneArchivioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
