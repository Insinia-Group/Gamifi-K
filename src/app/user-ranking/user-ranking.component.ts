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
    {field: 'nick', sortable: true, filter: true},
    {field: 'name', filter: true},
    {field: 'points', sortable: true, filter: true},
    // {field: 'logo', sortable: true, filter: true},
  ];
  rowData: any;
  constructor(private router: Router, private httpC: HttpService, private http: HttpClient) {
    this.rowData = this.httpC.getRankingData();
    console.log(this.rowData);

  }

  async ngOnInit(): Promise<void> {
    if (localStorage.getItem('token') == null) {
      this.router.navigate(['/login']);
    }
    const statusToken = await this.httpC.tokenValidation();
    if (statusToken == false) {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    } else if (statusToken) {
      console.log("Token valid");
    }

  }






}
