import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { fromEvent, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  public isTestDivScrolledIntoView: boolean;
  resizeObservable$: Observable<Event>
  resizeSubscription$: Subscription 
  
  constructor() { }

  @HostListener('window:resize', ['onResize($event)'])

  ngOnInit(): void {
    this.resizeObservable$ = fromEvent(window, 'resize');
    this.resizeSubscription$ = this.resizeObservable$.subscribe(evt => {
    })
  }

  onResize(event: any) {
    console.log(event.target.innerWidth)
  }
}
