import { Component, Input } from '@angular/core';
import { JwtService } from 'src/app/services/jwt.service';
declare var $: any;

@Component({
  selector: 'logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {
  @Input() isOpen: boolean;
  @Input() uniqueId: string;

  constructor(private jwt: JwtService) {
    this.isOpen = false;
    this.uniqueId = 'logoutModal';
    console.log(this.isOpen);
  }

  modal(state: boolean): void {
    if (!this.uniqueId) throw 'You must provide an id';
    if (!state) throw 'You muste provide a state';
    $('#' + this.uniqueId).modal(state);
  }

  booleanToString(state: boolean): string {
    if (state) return 'show'
    else return 'hide';
  }

  exit() {
    this.jwt.logout();
  }
}
