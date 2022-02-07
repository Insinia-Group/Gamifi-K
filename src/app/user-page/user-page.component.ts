import { Component, OnInit } from '@angular/core';
import { Ranking } from '../models/rankings';



declare var $: any;
@Component( {
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: [ './user-page.component.css' ]
} )
export class UserPageComponent implements OnInit
{

  selectedRanking:Ranking;
  avatar = "https://www.cabroworld.com/wp-content/uploads/2019/06/2-15.jpg";
  rankingFav: Ranking = new Ranking( 1, "Primero", "descripcion", "../../assets/png/medal-outline.png" );
  
 listaRankings: Ranking[] = [];
  
  constructor ()
  {
    
    this.listaRankings.push( 
      new Ranking( 1, "Primero", "descripcion", "../../assets/png/medal-outline.png" ),
      new Ranking( 2, "Segundo", "descripcion2", "https://www.cabroworld.com/wp-content/uploads/2019/06/2-15.jpg" ),
      new Ranking(3, "Tercero", "descripcion3", "https://www.cabroworld.com/wp-content/uploads/2019/06/2-15.jpg")
     );

   }

  ngOnInit (): void
  {
      this.selectedRanking=this.listaRankings[0];

   /*  document.body.style.backgroundImage = " linear-gradient(180deg, rgba(109, 48, 243, 1) 0%,rgba(0, 0, 0, 0) 100%)" */
    $( '#dropdownMenuButton1' ).dropdown( 'toggle' );
  }


  toggleDropdown (id:string):void
  {
   $( '#'+id ).dropdown( 'toggle' );
}
  rankingSelected (id:Ranking): void
  {
     this.selectedRanking = id;
  }
  
  
  
}

