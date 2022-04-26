import { Component, Input } from '@angular/core';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})

export class ModalComponent {
  @Input() uniqueId: string;
  @Input() title: any;
  @Input() isOpen: boolean = false;
  @Input() isAlert: boolean = false;
}
