import { Component } from '@angular/core';
import { OperatoreService } from '../services/operatore.service';
import { UserService } from '../security/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-assistenza',
  templateUrl: './assistenza.component.html',
  styleUrls: ['./assistenza.component.scss']
})
export class AssistenzaComponent {

  showForm: boolean = true;
  testoMessaggio: string = '';

  constructor(private userService: UserService, private operatoreService: OperatoreService, private snackBar: MatSnackBar) { }

  invia(): void {
    this.showForm = false;
    this.operatoreService.invioMailAssistenza(this.userService.userId, this.testoMessaggio).subscribe({
      next: () => {
        this.testoMessaggio = "";
        this.snackBar.open("Richiesta inviata correttamente", "Ok", { duration: 5000 });
        setTimeout(() => {
          this.showForm = true;
        }, 10)
      },
      error: error => {
        console.error(error);
        this.testoMessaggio = "";
        this.snackBar.open("Errore durante l'invio", "Ok", { duration: 5000 });
        setTimeout(() => {
          this.showForm = true;
        }, 10)
      }
    });
  }

}
