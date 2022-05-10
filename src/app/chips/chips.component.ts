import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { fadeIn } from '../config/animations.config';
import { CustomValidator } from '../helpers/custom-validators';
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
  public idRanking: number = 54

  constructor(private http: HttpService) {
    this.addEmailForm = new FormGroup({
      email: new FormControl('', [
        CustomValidator.isVoid,
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
    if (!this.emailArr.includes(control.value.toLowerCase())) return null;
    return { emailAlreadyExist: true };
  }

  emailInvalid(control: AbstractControl): { [key: string]: any } | null {
    if (!this.invalidEmails.includes(control.value.toLowerCase())) return null;
    return { invalidEmail: true };
  }

  remove(removeEmail: string) {
    this.emailArr = this.emailArr.filter((email) => removeEmail !== email);
  }

  async push() {
    const res: any = await this.http.emailExists(this.addEmailForm.controls.email.value.toLowerCase());
    console.log(res);

    if (!res.body.exists) {
      this.invalidEmails.push((this.addEmailForm.controls.email.value).toLowerCase())
      this.addEmailForm.controls.email.setErrors({ emailNotExists: true })
      return;
    }
    if (res.body.admin) {
      this.invalidEmails.push(this.addEmailForm.controls.email.value.toLowerCase())
      this.addEmailForm.controls.email.setErrors({ invalidEmail: true })
      return;
    }
    this.emailArr.push(this.addEmailForm.controls.email.value.toLowerCase());
    this.addEmailForm.controls.email.setValue('')
  }

  async addUsersToRanking() {
    const request = {
      idRanking: this.idRanking,
      users: this.emailArr
    }
    await this.http.addUsersToRanking(request);
  }
}
