import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OperatoreDto } from 'src/app/dto/operatore-dto';
import { UserService } from 'src/app/security/user.service';
import { AccountService } from 'src/app/services/account.service';
import { OperatoreService } from 'src/app/services/operatore.service';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss']
})
export class PrivacyComponent implements OnInit {

  operatore?: OperatoreDto;
  datiCaricati: boolean = false;

  accepted1: boolean = false;
  accepted2: boolean = false;
  accepted3: boolean = false;

  showError: boolean = false;
  saving: boolean = false;

  constructor(private router: Router, private userService: UserService,
    private operatoreService: OperatoreService, private accountService: AccountService) { }

  ngOnInit(): void {
    this.operatoreService.getOperatore(this.userService.userId).subscribe({
      next: operatore => {
        this.operatore = operatore;
        this.datiCaricati = true;
      },
      error: error => {
        console.error(error);
      }
    });
  }

  get allAccepted(): boolean {
    if (this.operatore?.referente) {
      return this.accepted1 && this.accepted2 && this.accepted3;
    } else {
      return this.accepted1;
    }
  }

  cancel(): void {
    this.userService.logout();
  }

  confirm(): void {
    this.accountService.acceptPrivacy(this.userService.userId).subscribe({
      next: () => {
        this.userService.mustAcceptPrivacy = false;
        this.router.navigateByUrl('');
      },
      error: error => {
        console.error(error);
      }
    });
  }

}
