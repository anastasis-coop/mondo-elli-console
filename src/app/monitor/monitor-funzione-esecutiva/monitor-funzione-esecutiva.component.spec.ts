import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorFunzioneEsecutivaComponent } from './monitor-funzione-esecutiva.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoadingComponent } from 'src/app/components/loading/loading.component';

describe('MonitorFunzioneEsecutivaComponent', () => {
  let component: MonitorFunzioneEsecutivaComponent;
  let fixture: ComponentFixture<MonitorFunzioneEsecutivaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      declarations: [
        MonitorFunzioneEsecutivaComponent,
        LoadingComponent
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorFunzioneEsecutivaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
