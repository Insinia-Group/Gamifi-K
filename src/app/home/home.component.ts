import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { slideIn, fadeIn } from '../config/animations.config';
import { MessageHome } from '../interface/messageHome';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [slideIn, fadeIn]
})

export class HomeComponent implements AfterViewInit {
  public resizeSubscription$: Subscription;
  public resizeObservable$: Observable<Event>
  public isTestDivScrolledIntoView: boolean;
  public message: MessageHome;

  constructor() {
    this.message = new MessageHome();
  }

  @ViewChild('testDiv') testDiv: ElementRef
  @ViewChild('messageOne') messageOne: ElementRef
  @ViewChild('messageTwo') messageTwo: ElementRef
  @ViewChild('messageThree') messageThree: ElementRef
  
  @HostListener('window:scroll', ['$event'])
  isScrolledIntoView() {
    if (this.messageOne) {
      this.message.messageOne = this.isElementOnScreen(this.messageOne)
    };
    if (this.messageTwo) {
      this.message.messageTwo = this.isElementOnScreen(this.messageTwo)
    };
    if (this.messageThree) {
      this.message.messageThree = this.isElementOnScreen(this.messageThree)
    };
  };

  isElementOnScreen(element: ElementRef): Boolean {
    const rect = element.nativeElement.getBoundingClientRect();
    const topShown = rect.top >= 0;
    const bottomShown = rect.bottom <= window.innerHeight;
    return topShown && bottomShown;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.isScrolledIntoView();
    });
  }

}
