import { Component, Input } from '@angular/core';
import { MonitorService } from '../monitor.service';
import { MonitorQuizDto } from '../dto/monitor-quiz-dto';

@Component({
  selector: 'app-monitor-quiz',
  templateUrl: './monitor-quiz.component.html',
  styleUrls: ['./monitor-quiz.component.scss']
})
export class MonitorQuizComponent {

  @Input() idUtente?: number;

  columnsToDisplay = ['data', 'quartiere', 'domanda', 'risposta', 'corretto', 'tempo_impiegato'];

  datiCaricati: boolean = false;

  quiz: MonitorQuizDto[] = [];

  constructor(private monitorService: MonitorService) { }

  ngOnInit(): void {
    this.monitorService.getQuiz(this.idUtente!).subscribe({
      next: quiz => {
        this.quiz = quiz;
        this.datiCaricati = true;
      },
      error: error => {
        console.error(error);
        this.datiCaricati = true;
      }
    });
  }

}
