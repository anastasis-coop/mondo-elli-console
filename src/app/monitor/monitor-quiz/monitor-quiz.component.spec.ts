import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorQuizComponent } from './monitor-quiz.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoadingComponent } from 'src/app/components/loading/loading.component';

describe('MonitorQuizComponent', () => {
  let component: MonitorQuizComponent;
  let fixture: ComponentFixture<MonitorQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      declarations: [
        MonitorQuizComponent,
        LoadingComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MonitorQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
