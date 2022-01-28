import { Component, OnInit } from '@angular/core';
import { Usuraio } from '../interface/usuraio';
import { NgModule } from '@angular/core';
import { FormsModule, ValidationErrors } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterValidation } from '../models/registerValidation';
import { ConfirmedValidator } from '../models/confirmed.validator';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit  {
  userName: string="";
  lastUserName: string ="";
  nick: string = "";
  /* email: string; */
  emailVerify:string;
  password: string;
  passwordVerify:boolean;
  password2: string="";
  password2Verify:boolean;
  birthDate = new Date;
  description:string="";
  registerForm: FormGroup;
  submitted = false;
  valid: RegisterValidation;
  samePass:boolean = false;


  constructor ( private formBuilder: FormBuilder )
  {
    this.valid = new RegisterValidation();
    
  }
  
  get f () { return this.registerForm.controls; }
  ngOnInit (): void
  {

    

      this.registerForm = this.formBuilder.group({
      userName: ['',  [Validators.required, Validators.minLength(2)]],
      lastUserName: [ '', [ Validators.required, Validators.minLength( 2 ) ] ],
      userNick : [ '', [ Validators.required, Validators.minLength( 2 ) ] ],  
      email: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.minLength(8),Validators.maxLength(25)]],
      password2: [ '',[Validators.required, Validators.minLength(8),Validators.maxLength(25)]],
    
         
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
      
   
     let userName = (document.getElementById("name") as HTMLInputElement).value;
     let lastUserName = ( document.getElementById( "lastName" ) as HTMLInputElement ).value;
     let nick = ( document.getElementById( "nick" ) as HTMLInputElement ).value;
     this.firstFormActive = false;
     this.secondFormActive = true;
    }
  }

    nextSecond(){
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

    this.description = ( document.getElementById( "description" ) as HTMLInputElement ).value;
    console.log( this.birthDate );
    alert("Hola " + this.userName+ " " + this.lastUserName + " " + this.description + " " + this.birthDate);
  }
}
