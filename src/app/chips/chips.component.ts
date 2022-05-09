import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { fadeIn } from '../config/animations.config';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.css'],
  animations: [fadeIn],
})
export class ChipsComponent {
  public emailArr: string[] = [];
  public addEmailForm: FormGroup;
  public invalidEmails: string[] = [];

  constructor(private http: HttpService) {
    this.addEmailForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        this.emailAlreadyExist.bind(this),
        this.emailInvalid.bind(this)
      ]),
    });
  }

  async add(event: any) {
    if (this.addEmailForm.valid) {
      const key = event.key;
      if (key == ',' || key == ' ' || key == 'Enter') {
        this.push();
      }
    }
  }

  emailAlreadyExist(control: AbstractControl): { [key: string]: any } | null {
    if (!this.emailArr.includes(control.value)) return null;
    return { emailAlreadyExist: true };
  }

  emailInvalid(control: AbstractControl): { [key: string]: any } | null {
    if (!this.emailArr.includes(control.value)) return null;
    return { invalidEmail: true };
  }

  remove(removeEmail: string) {
    this.emailArr = this.emailArr.filter((email) => removeEmail !== email);
  }

  async push() {
    const res: any = await this.http.emailExists(this.addEmailForm.controls.email.value);
    console.log('invalidEmails:', this.invalidEmails)
    console.log('res:', res)
    if (!res.body.exists) {
      this.addEmailForm.controls.email.setErrors({ emailNotExists: true })
      return;
    }
    if (res.body.isAdmin) {
      this.invalidEmails.push(this.addEmailForm.controls.email.value)
      this.addEmailForm.controls.email.setErrors({ invalidEmail: true })
      return;
    }
    this.emailArr.push(this.addEmailForm.controls.email.value);
    this.addEmailForm.reset();
  }
}
