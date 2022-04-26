import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {fadeIn} from '../config/animations.config';
import {HttpService} from '../services/http.service';
import {JwtService} from '../services/jwt.service';
import {NotifierService} from 'angular-notifier';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [fadeIn]
})

export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public disabledButton: boolean;

  constructor(private http: HttpService, private jwt: JwtService, private router: Router, private notifier: NotifierService) {
    this.disabledButton = false;
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }

  async ngOnInit(): Promise<void> {
    await this.http.canLogin();
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
