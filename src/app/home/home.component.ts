import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { slideIn, fadeIn, slideInOut, slideDownHideUp } from '../config/animations.config';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [slideIn, fadeIn, slideInOut, slideDownHideUp]
})

export class HomeComponent implements AfterViewInit {
  public resizeSubscription$: Subscription;
  public resizeObservable$: Observable<Event>
  public isTestDivScrolledIntoView: boolean;
  public goupStatus: boolean;
  public navbarStatus: boolean;

  constructor(public request: HttpService) {
    this.request = request;
    this.request.status();
    this.goupStatus = false;
    this.navbarStatus = false;
  }

  @ViewChild('go-up') goup: ElementRef;
  
  @HostListener('window:scroll', ['$event'])
  isScrolledIntoView() {
    console.log(window.scrollY)
    if (window.scrollY >= 500) {
      this.goupStatus = true;
    } else {
      this.goupStatus = false;
    }

    if (window.scrollY >= 56) {
      this.navbarStatus = true;
    } else {
      this.navbarStatus = false;
    }
  };

  isElementOnScreen(element: ElementRef): Boolean {
    const rect = element.nativeElement.getBoundingClientRect();
    const topShown = rect.top >= 0;
    const bottomShown = rect.bottom <= window.innerHeight;
    return topShown && bottomShown;
  }

  ngAfterViewInit() {
  }

  
}
