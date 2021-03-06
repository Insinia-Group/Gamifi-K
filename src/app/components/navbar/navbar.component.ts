import { Component, Input } from '@angular/core';
import { fadeIn, slideDownHideUp } from 'src/app/config/animations.config';

@Component({
  selector: 'topnav',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations: [fadeIn, slideDownHideUp],
})
export class NavbarComponent {
  @Input() toggleBlur: boolean;
  @Input() fixed: boolean = false;

  constructor() {
    this.toggleBlur = true;
  }

  logout() {
    localStorage.removeItem('token');
  }
}
