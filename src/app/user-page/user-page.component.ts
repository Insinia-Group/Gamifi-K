import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

 

 avatar="https://www.cabroworld.com/wp-content/uploads/2019/06/2-15.jpg";
 
 rankings:any [] = [
  {nombre:"Has ganado una Medalla",tipo:"Buena iniciativa",total:5,imagen: "../../assets/png/medal-outline.png" },
  {nombre:"Te has unido a DAW",total:5,imagen: "../../assets/png/ranking.png" },
  {nombre:"Te has unido a FEM",total:6,imagen :"https://www.cabroworld.com/wp-content/uploads/2019/06/2-15.jpg"},
  {nombre:"DAW",total:5,imagen: "https://www.cabroworld.com/wp-content/uploads/2019/06/2-15.jpg" },
  {nombre:"DAW",total:5,imagen: "https://www.cabroworld.com/wp-content/uploads/2019/06/2-15.jpg" },
  {nombre:"DAW",total:5,imagen: "https://www.cabroworld.com/wp-content/uploads/2019/06/2-15.jpg" },
  {nombre:"FEM",total:6,imagen :"https://www.cabroworld.com/wp-content/uploads/2019/06/2-15.jpg"},
 ]
  
  constructor() { }

  ngOnInit (): void
  {
   /*  document.body.style.backgroundImage = " linear-gradient(180deg, rgba(109, 48, 243, 1) 0%,rgba(0, 0, 0, 0) 100%)" */

  }

 


}
