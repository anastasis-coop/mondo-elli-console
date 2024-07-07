import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DettaglioPercorsoComponent } from './dettaglio-percorso.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { LoadingComponent } from 'src/app/components/loading/loading.component';

describe('DettaglioPercorsoComponent', () => {
  let component: DettaglioPercorsoComponent;
  let fixture: ComponentFixture<DettaglioPercorsoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MatDialogModule,
        MatIconModule,
        MatMenuModule
      ],
      declarations: [
        DettaglioPercorsoComponent,
        HeaderComponent,
        LoadingComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DettaglioPercorsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
