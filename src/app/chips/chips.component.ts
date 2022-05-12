import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { fadeIn } from '../config/animations.config';
import { CustomValidator } from '../helpers/custom-validators';
import { HttpService } from '../services/http.service';
declare var $: any;

@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.css'],
  animations: [fadeIn],
})
export class ChipsComponent implements OnInit {
  public emails: any = {
    original: [],
    invalid: [],
    added: [],
  }
  public selectedEmail: string;
  public addEmailForm: FormGroup;
  public idRanking: number = 2;

  constructor(private http: HttpService) {
    this.addEmailForm = new FormGroup({
      email: new FormControl('', [
        CustomValidator.isVoid,
        Validators.pattern('^[a-z0-9._]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        this.emailAlreadyExist.bind(this),
        this.emailInvalid.bind(this),
      ]),
    });
  }

  ngOnInit() {
    this.getRankingUsers();
  }

  modal(id: string, state: any): void {
    if (!id) throw 'You must provide an id';
    if (!state) throw 'You muste provide a state';
    $('#' + id).modal(state);
  }

  add(event: any) {
    if (this.addEmailForm.valid) {
      const key = event.key;
      if (key == ',' || key == ' ' || key == 'Enter') {
        this.push();
      }
    }
  }

  async remove() {
    this.modal('removeUser', 'hide')
    const removeEmail = this.selectedEmail;
    this.emails.original = this.emails.original.filter((email: string) => removeEmail !== email);
    const email: object = {
      email: removeEmail,
      idRanking: this.idRanking
    }
    await this.http.removeUserFromRanking(email);
  }

  setSelected(email: string): void {
    this.selectedEmail = email;
  }

  async getRankingUsers() {
    const res: any = await this.http.getRankingUsersById(this.idRanking);
    this.emails.original = res;
  }

  emailAlreadyExist(control: AbstractControl): { [key: string]: any } | null {
    if (!this.emails.original.includes(control.value.toLowerCase())) return null;
    return { emailAlreadyExist: true };
  }

  emailInvalid(control: AbstractControl): { [key: string]: any } | null {
    if (!this.emails.invalid.includes(control.value.toLowerCase())) return null;
    return { invalidEmail: true };
  }

  emailsChanged() {
    if (this.emails.original === this.emails.original) return true;
    if (this.emails.original == null || this.emails.original == null) return false;
    if (this.emails.original.length !== this.emails.original.length) return false;
    for (var i = 0; i < this.emails.original.length; ++i) {
      if (this.emails.original[i] !== this.emails.original[i]) return false;
    }
    return true;
  }

  async push() {
    const res: any = await this.http.emailExists(
      this.addEmailForm.controls.email.value.toLowerCase()
    );

    if (!res.body.exists) {
      this.emails.invalid.push(
        this.addEmailForm.controls.email.value.toLowerCase()
      );
      this.addEmailForm.controls.email.setErrors({ emailNotExists: true });
      return;
    }
    if (res.body.admin) {
      this.emails.invalid.push(
        this.addEmailForm.controls.email.value.toLowerCase()
      );
      this.addEmailForm.controls.email.setErrors({ invalidEmail: true });
      return;
    }
    this.emails.added.push(this.addEmailForm.controls.email.value.toLowerCase());
    await this.getRankingUsers();
    this.addEmailForm.controls.email.setValue('');
  }

  async addUsersToRanking() {
    const request = {
      idRanking: this.idRanking,
      users: this.emails.added
    };
    await this.http.addUsersToRanking(request);
  }
}
