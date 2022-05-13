import { Component, Input } from '@angular/core';

@Component({
  selector: 'logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.css']
})

export class LogoComponent {
  @Input() animated: boolean;
  @Input() width: number;

  constructor() {
    this.animated = false;
    this.width = 50;
  }
}


