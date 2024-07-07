import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorPercorsoComponent } from './monitor-percorso.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoadingComponent } from 'src/app/components/loading/loading.component';

describe('MonitorPercorsoComponent', () => {
  let component: MonitorPercorsoComponent;
  let fixture: ComponentFixture<MonitorPercorsoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      declarations: [
        MonitorPercorsoComponent,
        LoadingComponent
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorPercorsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
