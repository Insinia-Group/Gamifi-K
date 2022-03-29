import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { slideIn, fadeIn, slideInOut, slideDownHideUp } from '../config/animations.config';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [slideIn, fadeIn, slideInOut, slideDownHideUp]
})

export class HomeComponent {
  public resizeSubscription$: Subscription;
  public resizeObservable$: Observable<Event>
  public isTestDivScrolledIntoView: boolean;
  public goupShow: boolean;
  public topnavShow: boolean;
  @ViewChild('go-up') goup: ElementRef;

  constructor() {
    this.goupShow = false;
    this.topnavShow = false;
  }

  @HostListener('window:scroll', ['$event'])
  isScrolledIntoView() {
    if (window.scrollY >= 250) {
      this.goupShow = true;
    } else {
      this.goupShow = false;
    }

    if (window.scrollY >= 950) {
      this.topnavShow = true;
    } else {
      this.topnavShow = false;
    }
  };
}
