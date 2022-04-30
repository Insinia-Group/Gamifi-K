import {Component, OnInit} from '@angular/core';
import {ColDef} from 'ag-grid-community';

import {HttpService} from '../services/http.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {
  public rowData: any;
  http: any;
  constructor(http: HttpService,) {}

  async ngOnInit(): Promise<void> {
    this.rowData = await this.http.getHistory();
  }

  public columnDefs: ColDef[] = [
    {field: 'Nombre', sortable: true, filter: true},
    {field: 'Apellido', filter: true},
    {field: 'Puntos', sortable: true, filter: true},
    // {field: 'id', hide: true},
    {field: 'idUser', hide: true},
    {field: 'isModerator', hide: true},

  ];
}


