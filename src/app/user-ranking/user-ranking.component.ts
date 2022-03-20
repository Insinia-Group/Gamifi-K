import {Component, HostListener, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {fadeIn} from '../config/animations.config';
import {HttpService} from '../services/http.service';
import {ColDef} from 'ag-grid-community';
import {BrowserModule} from '@angular/platform-browser';
import {AgGridModule} from 'ag-grid-angular';
import {Observable} from 'rxjs';
import {Ranking} from '../models/rankings';
import { FormControl, FormGroup, Validators } from '@angular/forms';




@Component({
  selector: 'app-user-ranking',
  templateUrl: './user-ranking.component.html',
  styleUrls: ['./user-ranking.component.css'],
  animations: [fadeIn]
})
export class UserRankingComponent implements OnInit {

  columnDefs: ColDef[] = [
    {field: 'Nombre', sortable: true, filter: true},
    {field: 'Apellido', filter: true},
    {field: 'Puntos', sortable: true, filter: true},
    // {field: 'logo', sortable: true, filter: true},
  ];
  rowData: any;
  rankings: any;
  Ranking: any;
  nullRankings:boolean;
  public navbarStatus: boolean;
  public goupStatus: boolean;
  addRanking: FormGroup;
  rankingId:number;
  showAdd:boolean;
  constructor(private router: Router, private http: HttpService, private httpC: HttpClient) {
    this.goupStatus = false;
    this.navbarStatus = false;
  }
  @HostListener('window:scroll', ['$event'])
  isScrolledIntoView() {
    if (window.scrollY >= 90) {
      this.navbarStatus = false;
      this.goupStatus =false;
    } else {
      this.navbarStatus = true;
      this.goupStatus = true;
    }
  };
 

  async ngOnInit(): Promise<void> {
    this.addRanking= new FormGroup({
      rankingId: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(7), Validators.pattern('^[a-zA-Z ]*$')]),
     }
    );
    this.isScrolledIntoView();
    this.rankings = await this.http.getRanking();
    if(this.rankings.length > 0) {
      this.nullRankings=false;
    }else{
      this.nullRankings=true;
    }
    console.log(this.rankings);
    this.rowData = await this.http.getRankingData();
    
    if (localStorage.getItem('token') == null) {
      this.router.navigate(['/login']);
    }
    const statusToken = await this.http.tokenValidation();
    if (statusToken == false) {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    } else if (statusToken) {
      console.log("Token valid");
    }
  }

  async addRankingByCode(){
    if (1==1) {
      this.showAdd = false;

      this.rankingId = this.addRanking.controls.rankingId.value;
      console.log( this.rankingId);
      const code = {
        code: this.rankingId
      }
      this.http.addRankingByCode(code);
      this.rankings = await this.http.getRanking();
      this.rowData = await this.http.getRankingData();
      console.log(this.rankings);
      this.nullRankings=false;
      
  }else{

  }
  }
  showInput(){
    this.showAdd = true;
  }
}
