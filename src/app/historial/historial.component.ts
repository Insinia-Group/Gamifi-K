import { Component, OnInit } from '@angular/core';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import { HttpService } from '../services/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {
  public noRowsTemplate: any;
  public loadingTemplate: any;
  public rowData: any;
  private gridApi: any;
  public rowSelection = 'single';
  public noSelected: boolean = true;
  public modalTitle = "Deshacer evaluacion";
  public modalId = "modal";
  constructor(private router: Router,private http: HttpService) {
    this.noRowsTemplate =
      `<span>Historial vacio</span>`;
    this.loadingTemplate =
      `<span class="ag-overlay-loading-center">Cargando...</span>`;
  }

  async ngOnInit(): Promise<void> {

  
    if (localStorage.getItem('token') == null) {
      this.router.navigate(['/login']);
    }
    const statusToken = await this.http.tokenValidation();
    if (statusToken == false) {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }
    this.rowData = await this.http.getHistory();
  }

  public responsiveColumn: ColDef[] = [
    { field: 'Evaluador', sortable: true, filter: true },
    { field: 'Evaluado', filter: true },
    { field: 'Puntos', sortable: true, filter: true },
  ]

  public columnDefs: ColDef[] = [
    { field: 'Evaluador', sortable: true, filter: true, checkboxSelection: false, },
    { field: 'Evaluado', filter: true },
    { field: 'Puntos', sortable: true, filter: true },
    { field: 'Ranking', filter: true, sortable: true },
    { field: 'Insinia', filter: true, sortable: true },
    { field: 'Fecha', filter: true, sortable: true },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
  };

  selectRow() {
    this.noSelected = false;
  }

  onRemoveSelected(i: boolean) {

    if (i) {
      const selectedData = this.gridApi.getSelectedRows();
      let data;
      data = {
        idHistory: selectedData[0].idHistory,
        insinia: selectedData[0].Insinia,
        idEvaluado: selectedData[0].idEvaluado,
        idEvaluador: selectedData[0].idEvaluador,
        idRanking: selectedData[0].idRanking,
        Puntos: selectedData[0].Puntos,
        oldValue: selectedData[0].oldValue,
      };
      const res = this.gridApi.applyTransaction({ remove: selectedData })!;
      this.http.revertHistory(data);
    }
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    if (window.innerWidth <= 480) {
      this.gridApi.setColumnDefs(this.responsiveColumn);
      params.api.sizeColumnsToFit();
    }
    params.api.sizeColumnsToFit();
    window.addEventListener('resize', function () {
      setTimeout(function () {
        params.api.sizeColumnsToFit();
      });
    });
  }

  onSelectionChanged(event: any) {
    this.noSelected = false;
  }
}


