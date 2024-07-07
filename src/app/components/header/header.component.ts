import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/security/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private router: Router, private userService: UserService) { }

  get username(): string {
    return this.userService.username;
  }

  get isAdmin(): boolean {
    return this.userService.isAdmin;
  }

  get isSupport(): boolean {
    return this.userService.isSupport;
  }

  logoClicked(): void {
    this.goto('');
  }

  goto(target: string): void {
    this.router.navigate(['/' + target]);
  }

  gotoPrivacy(): void {
    window.open("https://privacy.example.com/", "_blank")
  }

}
