import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {HttpService} from '../services/http.service';
import {ColDef} from 'ag-grid-community';
import {BrowserModule} from '@angular/platform-browser';
import {AgGridModule} from 'ag-grid-angular';
import {Observable} from 'rxjs';
import {Ranking} from '../models/rankings';




@Component({
  selector: 'app-user-ranking',
  templateUrl: './user-ranking.component.html',
  styleUrls: ['./user-ranking.component.css']
})
export class UserRankingComponent implements OnInit {

  columnDefs: ColDef[] = [
    {field: 'Usuario', sortable: true, filter: true},
    {field: 'Ranking', filter: true},
    {field: 'Puntos', sortable: true, filter: true},
    // {field: 'logo', sortable: true, filter: true},
  ];
  rowData: any;
  rowDatas: any;
  Ranking: any;
  constructor(private router: Router, private http: HttpService, private httpC: HttpClient) {
  }

  async ngOnInit(): Promise<void> {
    this.rowData = this.http.getRankingData();
    this.rowDatas = await this.http.getRankingData();

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






}
