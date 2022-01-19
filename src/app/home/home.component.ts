import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { slideIn, fadeIn } from '../config/animations.config';
import { MessageHome } from '../interface/messageHome';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [slideIn, fadeIn]
})

export class HomeComponent implements OnInit {
  public resizeSubscription$: Subscription;
  public resizeObservable$: Observable<Event>
  public isTestDivScrolledIntoView: boolean;
  public message: MessageHome;
  
  constructor() {
  }

  @ViewChild('testDiv') testDiv: ElementRef
  @ViewChild('messageOne') messageOne: ElementRef
  @ViewChild('messageTwo') messageTwo: ElementRef
  @ViewChild('messageThree') messageThree: ElementRef
  
  @HostListener('window:scroll', ['$event'])
  isScrolledIntoView() {
    if (this.testDiv) {
      const rect = this.testDiv.nativeElement.getBoundingClientRect();
      const topShown = rect.top >= 0;
      const bottomShown = rect.bottom <= window.innerHeight;
      this.isTestDivScrolledIntoView = topShown && bottomShown;
      console.log(topShown && bottomShown)
    } else if (this.messageOne) {
      const rect = this.messageOne.nativeElement.getBoundingClientRect();
      const topShown = rect.top >= 0;
      const bottomShown = rect.bottom <= window.innerHeight;
      this.message.messageOne = topShown && bottomShown;
    }
  }

  ngOnInit() {
    this.isScrolledIntoView();
  }

}
