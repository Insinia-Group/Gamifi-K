import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.css']
})

export class LogoComponent implements OnInit{
  @Input() animated: boolean;

  constructor() {
    this.animated = false;
  }

  ngOnInit() {
    console.log(this.animated)
  }
}


