import { Component, Input } from '@angular/core';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  @Input() uniqueId: string;
  @Input() title: string;
  @Input() isOpen: boolean = false;
  @Input() isAlert: boolean = false;
  @Input() isLogout: boolean = false;
  @Input() isLarge: boolean = false;
}
