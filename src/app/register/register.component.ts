import { Component, OnInit } from '@angular/core';
import { Usuraio } from '../interface/usuraio';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit  {
  userName: string;
  lastUserName: string ="";
  nick: string = "";
  email: string;
  password: string;
  password2: string;
  constructor ()
  { 
    /*  user:Usuraio = {name:"marc"}   */
    
  
    let firstFormActive: boolean = true;
   
  }
  

  
  ngOnInit (): void
  {

  }

  firstFormActive: boolean = true;
  secondFormActive: boolean = false;
  thirdFormActive: boolean = false;
   nextOne ()
   {
     let userName = (document.getElementById("name") as HTMLInputElement).value;
     let lastUserName = ( document.getElementById( "lastName" ) as HTMLInputElement ).value;
     let nick = ( document.getElementById( "nick" ) as HTMLInputElement ).value;
     if ( userName.length <2)
     {
       Swal.fire({
  title: 'Error!',
  text: 'Longitud del nombre invalida',
  icon: 'error',
  confirmButtonText: 'Volver'
})
     }

   else  if ( lastUserName.length <2 || lastUserName.length>30)
     {
       Swal.fire({
  title: 'Error!',
  text: 'Longitud del apellido invalida',
  icon: 'error',
  confirmButtonText: 'Volver'
})
     }

     else  if ( nick.length <2)
     {
       Swal.fire({
  title: 'Error!',
  text: 'Longitud del apodo invalida',
  icon: 'error',
  confirmButtonText: 'Volver'
       } )
       
     }
     else{
       
 this.firstFormActive = false;
     this.secondFormActive = true;
     }


  }
  nextSecond ()
  {
     let email = (document.getElementById("email") as HTMLInputElement).value;
     let password = ( document.getElementById( "password" ) as HTMLInputElement ).value;
     let password2 = ( document.getElementById( "password2" ) as HTMLInputElement ).value;
     this.secondFormActive = false;
     this.thirdFormActive = true;
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
}
