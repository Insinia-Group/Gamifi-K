import { Component, OnInit,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Ranking } from '../models/rankings';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import { UsuarioRanking } from '../interface/usuario';



let posicion =1;
const ELEMENT_DATA:UsuarioRanking[] = [
  { position:posicion++, name: 'Panqueue', lastName:"Pedro"},
  { position:posicion++ , name:  'Alimon', lastName:"Retac"},
  { position:posicion++ , name:  'Salama', lastName:"Monolo"},
  { position:posicion++ , name:  'Pentrac', lastName:"Eresta"},
  { position:posicion++ , name:  'datAr', lastName:"Erosto"},
  { position:posicion++ , name:  'Tennto', lastName:"Tunamo"},
  { position:posicion++ , name:  'Salpapo', lastName:"Tunamo"},
  { position:posicion++ , name:  'Beeras', lastName:"Tunamo"},
  { position:posicion++ , name:  'Fonar', lastName:"Tunamo"},
  { position:posicion++ , name:  'Alimon', lastName:"Tunamo"},
  { position:posicion++ , name:  'Alimon', lastName:"Tunamo"},
  
];

declare var $: any;
@Component( {
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: [ './user-page.component.css' ]
} )
export class UserPageComponent implements OnInit
{
  displayedColumns: string[] = ['position','name','lastName'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  selectedRanking:Ranking;
  avatar = "https://www.cabroworld.com/wp-content/uploads/2019/06/2-15.jpg";
  rankingFav: Ranking = new Ranking( 1, "Primero", "descripcion", "../../assets/png/medal-outline.png" );
  
 listaRankings: Ranking[] = [];
  
  constructor ()
  {
    
    this.listaRankings.push( 
      new Ranking( 1, "Primero", "../../assets/png/medal-outline.png" , "descripcion"),
      new Ranking( 2, "Segundo", "https://www.cabroworld.com/wp-content/uploads/2019/06/2-15.jpg", "descripcion2" ),
      new Ranking(3, "Tercero", "https://www.cabroworld.com/wp-content/uploads/2019/06/2-15.jpg", "descripcion3")
     );

   }

  ngOnInit (): void
  {
  
      this.selectedRanking=this.listaRankings[0];

   /*  document.body.style.backgroundImage = " linear-gradient(180deg, rgba(109, 48, 243, 1) 0%,rgba(0, 0, 0, 0) 100%)" */
  
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

