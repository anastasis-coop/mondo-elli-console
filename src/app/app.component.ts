import { Component, ElementRef, HostListener, OnDestroy, OnInit } from '@angular/core';
import { UserService } from './security/user.service';
import { Event, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  TITLE = 'Il mondo degli Elli';

  FIXED_WIDTH = 960;

  scale: number = 1;

  private navSubscription?: Subscription;

  constructor(private title: Title, private window: Window, private router: Router,
    private elementRef: ElementRef, private userService: UserService) { }

  ngOnInit(): void {
    this.title.setTitle(this.TITLE);
    this.userService.initStatus(this.elementRef);
    this.navSubscription = this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.updateScale(this.window);
      }
    });
  }

  get loggedIn(): boolean {
    return this.userService.isLoggedIn;
  }

  @HostListener('window:resize', ['$event'])
  public onResize(event: any) {
    this.updateScale(event.target);
  }

  updateScale(target: any): void {
    this.scale = (target.innerWidth > this.FIXED_WIDTH) ? 1 : target.innerWidth / this.FIXED_WIDTH;
  }

  get scaledStyle(): any {
    return {
      'transform': 'scale(' + this.scale + ')',
      'min-width': this.FIXED_WIDTH + 'px'
    }
  }

  ngOnDestroy() {
    if (this.navSubscription) {
      this.navSubscription.unsubscribe();
    }
  }

}
