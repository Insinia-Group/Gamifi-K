import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { fadeIn } from '../config/animations.config';
import { HttpService } from '../services/http.service';
import { JwtService } from '../services/jwt.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [fadeIn]
})

export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public disabledButton: boolean;
  public isReady: boolean = false;

  constructor(private http: HttpService, private jwt: JwtService, private notifier: NotifierService) {
    this.disabledButton = false;
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }

  async ngOnInit(): Promise<void> {
    try {
      const res = await this.http.isValid();
      if (res.isValid) {
        this.http.redirectTo('profile')
      } else {
        this.isReady = true;
      }
    } catch {
      this.isReady = true;
    }
  }

  async logIn(): Promise<void> {
    const user = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value
    }
    const res = await this.http.login(user);
    if (res) {
      this.jwt.redirectTo('/profile');
    } else {
      this.notifier.notify('default', '¡Datos incorrectos!');
    }
  }
}
