import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { fadeIn } from '../config/animations.config';

@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.css'],
  animations: [fadeIn],
})
export class ChipsComponent {
  public emailArr: string[] = [];
  public addEmailForm: FormGroup;

  constructor() {
    this.addEmailForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        this.emailAlreadyExist.bind(this),
      ]),
    });
  }

  add(event: any) {
    if (this.addEmailForm.valid) {
      const key = event.key;
      if (key == ',' || key == ' ' || key == 'Enter') {
        this.emailArr.push(this.addEmailForm.controls.email.value);
        this.addEmailForm.reset();
      }
    }
  }

  emailAlreadyExist(control: AbstractControl): { [key: string]: any } | null {
    if (!this.emailArr.includes(control.value)) return null;
    return { emailAlreadyExist: true };
  }

  remove(removeEmail: string) {
    this.emailArr = this.emailArr.filter((email) => removeEmail !== email);
    console.log(this.emailArr);
  }

  addButton() {
    this.emailArr.push(this.addEmailForm.controls.email.value);
    this.addEmailForm.reset();
    console.log(this.emailArr);
  }
}
