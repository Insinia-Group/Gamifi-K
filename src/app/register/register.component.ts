import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterValidation } from '../models/registerValidation';
import { ConfirmedValidator } from '../models/confirmed.validator';
import { Router } from '@angular/router';
import { HttpService } from '../services/http.service';
import { User } from '../models/user';
import { API } from '../models/api';
import * as bcrypt from 'bcryptjs';

@Injectable({
  providedIn: "root"
} )

@Component( {
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
} )
  
export class RegisterComponent implements OnInit
{
  public form: FormGroup;
  userName: string="";
  lastUserName: string ="";
  nick: string = "";
  email: string;
  emailVerify:string;
  password: string;
  passwordVerify:boolean;
  password2: string="";
  password2Verify:boolean;
  dateBirth = new Date;
  description:string="";
  registerForm: FormGroup;
  submitted = false;
  valid: RegisterValidation;
  samePass:boolean = false;
  user: User;
  avatar: Blob;
  dateJoined: Date = new Date(Date.now());
  api: API;

  constructor ( private formBuilder: FormBuilder , private router:Router ,private request: HttpService)
  {
    this.api = new API;
    this.valid = new RegisterValidation();
    
  }
  
  get f () { return this.registerForm.controls; }
  ngOnInit (): void
  {

    

      this.registerForm = this.formBuilder.group({
      userName: ['',  [Validators.required, Validators.minLength(2),Validators.maxLength(25),Validators.pattern( '^[a-zA-Z ]*$')]],
      lastUserName: [ '', [ Validators.required, Validators.minLength( 2 ),Validators.maxLength(25),Validators.pattern( '^[a-zA-Z ]*$') ] ],
      userNick : [ '', [ Validators.required, Validators.minLength( 2 ),Validators.maxLength(25),Validators.pattern( '^[a-z0-9_]*$') ] ],  
      email: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.minLength(8),Validators.maxLength(25)]],
      password2: [ '', [ Validators.required, Validators.minLength( 8 ), Validators.maxLength( 25 ) ] ],
      description: [ '' ],
      dateBirth:[''],
    
         
  }, { 
   validator: ConfirmedValidator('password', 'password2')
      }
        
    ); 

    if(this.password == this.password2){
      this.samePass=true;
    }else{
      this.samePass=false;
    }
  }
 
  firstFormActive: boolean = true;
  secondFormActive: boolean = false;
  thirdFormActive: boolean = false;
   i = ConfirmedValidator('password', 'password2');
 
   validation()
   {
    if(this.password == this.password2){
      this.samePass=true;
    }else{
      this.samePass=false;
    }
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
     
        return;
      
    }


     
  }
   nextOne ()
   {
    
     
    if ( this.submitted == true && !this.f.userNick.errors == true && !this.f.userName.errors == true && !this.f.lastUserName.errors == true) {
      
   
    /*  this.userName = (document.getElementById("name") as HTMLInputElement).value;
     this.lastUserName = ( document.getElementById( "lastName" ) as HTMLInputElement ).value;
     this.nick = ( document.getElementById( "nick" ) as HTMLInputElement ).value; */
     this.firstFormActive = false;
     this.secondFormActive = true;
    }
  }

  nextSecond ()
  {
     /* this.email = (document.getElementById("email") as HTMLInputElement).value;
     this.password = ( document.getElementById( "password" ) as HTMLInputElement ).value;
     this.password2 = ( document.getElementById( "password2" ) as HTMLInputElement ).value; */
      if ( this.submitted == true && !this.f.email.errors == true && !this.f.password.errors == true && !this.f.password2.errors == true) {
        
     this.secondFormActive = false;
     this.thirdFormActive = true;
      }
  }
    backSecond ()
  {
     this.firstFormActive = true;
     this.secondFormActive = false;
  }
  backThird()
  {
 
     this.thirdFormActive = false;
     this.secondFormActive = true;
    
  }
  
  submmit ()
  {

    console.log( this.dateBirth );
    alert( "Hola " + this.userName + " " + this.lastUserName + " " + this.description + " " + this.dateBirth );
    this.user = new User(1,this.nick,this.userName,this.lastUserName,this.emailVerify,this.description,this.password,this.dateBirth,this.avatar,"user",this.dateJoined,true );
     
  }
   goHome() {
    this.router.navigate(['/home']);
  }
  
  sendRegister ()
  {
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
      dateJoined: this.dateJoined.toISOString().split('T')[0],
      status:1

      
    }
    console.log( user );
    this.request.register(user);
    
    
  }

}
