import { Component, OnInit } from '@angular/core';
import { Usuraio } from '../interface/usuraio';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit  {
  userName: string;
  lastUsernName: string;
  nick: string;

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
  text: 'Nombre demasiado corto',
  icon: 'error',
  confirmButtonText: 'Volver'
})
     }

   else  if ( lastUserName.length <2)
     {
       Swal.fire({
  title: 'Error!',
  text: 'Apellido demasiado corto',
  icon: 'error',
  confirmButtonText: 'Volver'
})
     }

     else  if ( nick.length <2)
     {
       Swal.fire({
  title: 'Error!',
  text: 'Apodo demasiado corto',
  icon: 'error',
  confirmButtonText: 'Volver'
       } )
       
     }
     else{
       this.nick = nick;
 this.firstFormActive = false;
     this.secondFormActive = true;
     }


  }
  nextSecond ()
    {
     this.secondFormActive = false;
     this.thirdFormActive = true;
  }
  
  backSecond ()
  {
    document.getElementById( "nick" )!.innerHTML = this.nick;
     this.firstFormActive = true;
     this.secondFormActive = false;
    }
}
