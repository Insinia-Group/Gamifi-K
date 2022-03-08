import {Component, Injectable, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl, AbstractControl} from '@angular/forms';
import {RegisterValidation} from '../models/registerValidation';
import {ConfirmedValidator, futureDate} from '../models/confirmed.validator';
import {Router} from '@angular/router';
import {HttpService} from '../services/http.service';
import {User} from '../models/user';
import {API} from '../models/api';
import * as bcrypt from 'bcryptjs';
import {fadeIn} from '../config/animations.config';
import {WeekDay} from '@angular/common';

@Injectable({
  providedIn: "root"
})

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  animations: [fadeIn]
})

export class RegisterComponent implements OnInit {
  public form: FormGroup;
  userName: string = "";
  lastUserName: string = "";
  nick: string = "";
  email: string;
  emailVerify: string;
  password: string;
  passwordVerify: boolean;
  password2: string;
  password2Verify: boolean;
  dateBirth = new Date;
  dateJoined = new Date;
  description: string = "";
  registerForm: FormGroup;
  submitted = false;
  valid: RegisterValidation;
  samePass: boolean = false;
  user: User;
  avatar: Blob;
  api: API;
  futureDate: boolean;

  constructor(private formBuilder: FormBuilder, private router: Router, private request: HttpService) {
    this.api = new API;
    this.valid = new RegisterValidation();
  }

  get f() {return this.registerForm.controls;}
  ngOnInit(): void {
    document.getElementById("dateBirth")?.setAttribute("max", this.dateJoined.toISOString());
    this.registerForm = new FormGroup({
      userName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(25), Validators.pattern('^[a-zA-Z ]*$')]),
      lastUserName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(25), Validators.pattern('^[a-zA-Z ]*$')]),
      userNick: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(25), Validators.pattern('^[a-z0-9_]*$')]),
      email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(25)]),
      password2: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(25), this.passwordValidator.bind(this)]),
      description: new FormControl(''),
      dateBirth: new FormControl('', this.dateValidator.bind(this)),

    }, {
      // validators: ConfirmedValidator('password', 'password2'),S

    }
    );


    if (this.password == this.password2) {
      this.samePass = true;
    } else {
      this.samePass = false;
    }


  }

  firstFormActive: boolean = true;
  secondFormActive: boolean = false;
  thirdFormActive: boolean = false;
  match = ConfirmedValidator('password', 'password2');

  dateValidator(control: AbstractControl): {[key: string]: any} | null {

    if (this.registerForm) {
      console.log();
      if (typeof (this.registerForm) !== 'undefined') {
        if (control.value < "1900-12-12" || control.value > this.dateJoined.toISOString().slice(0, -14)) {
          console.log('errorss')
          return {'notEqual': true};
        }
      }
    }
    return null;

  }

  passwordValidator(control: AbstractControl): {[key: string]: any} | null {

    if (this.registerForm) {
      console.log(control.value, this.registerForm.controls.password.value);
      if (typeof (this.registerForm) !== 'undefined') {
        if (control.value !== this.registerForm.controls.password.value) {
          console.log('error')
          return {'notEqual': true};
        }
      }
    }
    return null;
  }

  validation() {
    if (this.password == this.password2) {
      this.samePass = true;
    } else {
      this.samePass = false;
    }
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

  }
  nextOne() {
    if (!this.registerForm.controls.userNick.errors && !this.registerForm.controls.userName.errors && !this.registerForm.controls.lastUserName.errors) {

      /*  this.userName = (document.getElementById("name") as HTMLInputElement).value;
       this.lastUserName = ( document.getElementById( "lastName" ) as HTMLInputElement ).value;
       this.nick = ( document.getElementById( "nick" ) as HTMLInputElement ).value; */
      this.firstFormActive = false;
      this.secondFormActive = true;
    }
  }

  nextSecond() {
    /* this.email = (document.getElementById("email") as HTMLInputElement).value;
    this.password = ( document.getElementById( "password" ) as HTMLInputElement ).value;
    this.password2 = ( document.getElementById( "password2" ) as HTMLInputElement ).value; */
    if (!this.registerForm.controls.email.errors && !this.registerForm.controls.password.errors && !this.registerForm.controls.password2.errors) {
      this.secondFormActive = false;
      this.thirdFormActive = true;
    }
  }
  backSecond() {
    this.firstFormActive = true;
    this.secondFormActive = false;
  }
  backThird() {
    this.thirdFormActive = false;
    this.secondFormActive = true;
  }

  submmit() {
    console.log(this.dateBirth);
    alert("Hola " + this.userName + " " + this.lastUserName + " " + this.description + " " + this.dateBirth);
    this.user = new User(1, this.nick, this.userName, this.lastUserName, this.emailVerify, this.description, this.password, this.dateBirth, this.avatar, "user", this.dateJoined, true);
  }

  goHome() {
    this.router.navigate(['/home']);
  }

  sendRegister() {
    this.nick = this.registerForm.controls.userNick.value;
    this.userName = this.registerForm.controls.userName.value;
    this.lastUserName = this.registerForm.controls.lastUserName.value;
    this.password = this.registerForm.controls.password.value;
    this.email = this.registerForm.controls.email.value;
    this.description = this.registerForm.controls.description.value;
    this.dateBirth = this.registerForm.controls.dateBirth.value;

    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, 10);
    const user = {
      nick: this.nick,
      userName: this.userName,
      lastUserName: this.lastUserName,
      email: this.email,
      description: this.description,
      password: this.password,
      dateBirth: this.dateBirth,
      role: "user",
      dateJoined: this.dateJoined.toISOString().slice(0, -14),
      status: 1
    }

    this.request.register(user);
  }

}
