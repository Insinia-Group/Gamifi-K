import {Component, HostListener, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
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
  styleUrls: ['./user-ranking.component.css']
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
  gridApi: any[] = [2];
  contador:number = 0;
  nullRankings:boolean = true;
  public navbarStatus: boolean;
  public goupStatus: boolean;
  addRanking: FormGroup;
  rankingId:number;
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
     }, {
      // validators: ConfirmedValidator('password', 'password2'),S

    }
    );
    this.isScrolledIntoView();
    this.rankings = await this.http.getRanking();
    console.log(this.rankings);
    
  // this.rankings.forEach((element: any) => element.rankingData=  JSON.stringify(element.rankingData.replace(/\\/g, '',/"\\/,/'""/,/\\"/,/\\\\\\/))
  // );
  console.log(this.rankings);


    this.rowData = await this.http.getRankingData();
    this.gridApi[0]="saas";
    this.gridApi[1]=this.rowData ;
    
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

  addRankingByCode(){
    if (1==1) {
      this.rankingId = this.addRanking.controls.rankingId.value;
      console.log( this.rankingId);
      const code = {
        code: this.rankingId
      }
      this.http.addRankingByCode(code);
  }else{

  }
  }
}
