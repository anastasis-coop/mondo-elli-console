import { Component, OnInit } from '@angular/core';
import { UserService } from '../security/user.service';
import { OperatoreService } from '../services/operatore.service';
import { OperatoreDto } from '../dto/operatore-dto';
import { DialogsService } from '../dialogs/dialogs.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profilo',
  templateUrl: './profilo.component.html',
  styleUrls: ['./profilo.component.scss']
})
export class ProfiloComponent implements OnInit {

  profilo?: OperatoreDto;
  datiCaricati: boolean = false;

  constructor(private router: Router, private userService: UserService,
    private operatoreService: OperatoreService,
    private dialogsService: DialogsService) {
  }

  ngOnInit(): void {
    this.operatoreService.getOperatore(this.userService.userId).subscribe({
      next: profilo => {
        this.profilo = profilo;
        this.datiCaricati = true;
      },
      error: error => {
        console.error(error);
        this.datiCaricati = true;
      }
    });
  }

  modificaDati(): void {
    if (this.profilo) {
      this.dialogsService.editProfilo(this.profilo).then(
        profilo => { this.profilo = profilo; },
        error => { console.error(error); }
      );
    }
  }

  modificaEmail(): void {
    if (this.profilo) {
      this.dialogsService.cambioEmail(this.profilo).then(
        profilo => { this.profilo = profilo; },
        error => { console.error(error); }
      );
    }
  }

  cambioPassword(): void {
    this.router.navigate(['auth/imposta-password']);
  }

}
