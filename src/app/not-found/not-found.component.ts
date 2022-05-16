import { Component } from '@angular/core';
import { fadeIn, slideIn } from '../config/animations.config';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css'],
  animations: [fadeIn, slideIn]
})
export class NotFoundComponent {

  constructor() { }

}
