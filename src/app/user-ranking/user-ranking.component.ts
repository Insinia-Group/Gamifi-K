import {Component, HostListener, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {fadeIn} from '../config/animations.config';
import {HttpService} from '../services/http.service';
import {ColDef, GridReadyEvent} from 'ag-grid-community';
import {BrowserModule} from '@angular/platform-browser';
import {AgGridModule} from 'ag-grid-angular';
import {Observable} from 'rxjs';
import {Ranking} from '../models/rankings';
import {FormControl, FormGroup, Validators} from '@angular/forms';




@Component({
  selector: 'app-user-ranking',
  templateUrl: './user-ranking.component.html',
  styleUrls: ['./user-ranking.component.css'],
  animations: [fadeIn]
})
export class UserRankingComponent implements OnInit {

  private resizeListenerFunc = () => {this.gridApi.api.sizeColumnsToFit();};
  // onGridReady() {
  //   this.gridApi.api.sizeColumnsToFit();
  //   window.addEventListener('resize', this.resizeListenerFunc);
  // }
  ngOnDestroy() {
    window.removeEventListener('resize', this.resizeListenerFunc);
  }

  columnDefs: ColDef[] = [
    {field: 'Nombre', sortable: true, filter: true},
    {field: 'Apellido', filter: true},
    {field: 'Puntos', sortable: true, filter: true},
    {field: 'Insinias'},
  ];
  public rowData: any;
  public rankings: any;
  public Ranking: any;
  public nullRankings: boolean;
  public navbarStatus: boolean;
  public goupStatus: boolean;
  public addRanking: FormGroup;
  public rankingId: number;
  public showAdd: boolean = false;
  public rankingCard: any;
  public gridApi: any;
  public columnApi: any;
  public defaultColDef: any;

  constructor(private router: Router, private http: HttpService, private httpC: HttpClient) {
    this.goupStatus = false;
    this.navbarStatus = false;
    // this.http.tokenValidation();
  }
  @HostListener('window:scroll', ['$event'])
  isScrolledIntoView() {
    if (window.scrollY >= 90) {
      this.navbarStatus = false;
      this.goupStatus = false;
    } else {
      this.navbarStatus = true;
      this.goupStatus = true;
    }
  };

  async ngOnInit(): Promise<void> {



    this.addRanking = new FormGroup({
      rankingId: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(7), Validators.pattern('^[a-zA-Z ]*$')]),
    }
    );
    this.isScrolledIntoView();
    this.rankings = await this.http.getRanking();
    if (this.rankings.length > 0) {
      this.nullRankings = false;
    } else {
      this.nullRankings = true;
    }
    console.log(this.rankings);
    this.rowData = await this.http.getRankingData();
  }

  async addRankingByCode() {
    if (this.addRanking.controls.rankingId.value != "") {
      console.log(this.addRanking.controls.rankingId.value);

      this.showAdd = false;
      this.rankingId = this.addRanking.controls.rankingId.value;
      console.log(this.rankingId);
      const code = {
        code: this.rankingId
      }
      this.http.addRankingByCode(code);
      this.rankings = await this.http.getRanking();
      this.rowData = await this.http.getRankingData();
      console.log(this.rankings);
      this.nullRankings = false;

    } else {
      this.nullRankings = false;
    }
  }
  showInput() {
    if (this.showAdd == false) {
      this.showAdd = true;
    } else {
      this.showAdd = false;
    }
  }


  tablaCargada(params: any) {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
    console.log(this.gridApi, this.columnApi)
  }
  onGridSizeChanged(event: any) {
    console.log("chnege");
  }

  onGridReady(params: GridReadyEvent) {
    params.api.sizeColumnsToFit();
    window.addEventListener('resize', function () {
      setTimeout(function () {
        params.api.sizeColumnsToFit();
      });
    });
  }



}
