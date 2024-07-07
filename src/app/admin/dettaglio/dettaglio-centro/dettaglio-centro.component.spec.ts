import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DettaglioCentroComponent } from './dettaglio-centro.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { LoadingComponent } from 'src/app/components/loading/loading.component';

describe('DettaglioCentroComponent', () => {
  let component: DettaglioCentroComponent;
  let fixture: ComponentFixture<DettaglioCentroComponent>;

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
        DettaglioCentroComponent,
        HeaderComponent,
        LoadingComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DettaglioCentroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
