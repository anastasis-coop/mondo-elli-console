import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorComponent } from './monitor.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MonitorPercorsoComponent } from './monitor-percorso/monitor-percorso.component';
import { MonitorEsplorazioneComponent } from './monitor-esplorazione/monitor-esplorazione.component';
import { MonitorFunzioneEsecutivaComponent } from './monitor-funzione-esecutiva/monitor-funzione-esecutiva.component';
import { MonitorFunzioneCanaleComponent } from './monitor-funzione-canale/monitor-funzione-canale.component';
import { LoadingComponent } from '../components/loading/loading.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { MatIconModule } from '@angular/material/icon';

describe('MonitorComponent', () => {
  let component: MonitorComponent;
  let fixture: ComponentFixture<MonitorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MatDialogModule,
        MatIconModule
      ],
      declarations: [
        MonitorComponent,
        MonitorPercorsoComponent,
        MonitorEsplorazioneComponent,
        MonitorFunzioneEsecutivaComponent,
        MonitorFunzioneCanaleComponent,
        SidebarComponent,
        LoadingComponent
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
