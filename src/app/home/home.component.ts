import { Component } from '@angular/core';
import {
  slideIn,
  fadeIn,
  slideInOut,
  slideDownHideUp,
} from '../config/animations.config';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [slideIn, fadeIn, slideInOut, slideDownHideUp],
})
export class HomeComponent { }
