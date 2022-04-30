import {Component, OnInit} from '@angular/core';
import {ColDef,GridApi, GridReadyEvent, RowNodeTransaction,} from 'ag-grid-community';
import {HttpService} from '../services/http.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {
  public noRowsTemplate:any;
  public loadingTemplate:any;
  public rowData: any;
  private gridApi: any;
  public rowSelection = 'multiple';
  constructor( private http: HttpService) {
    this.noRowsTemplate =
      `<span>Historial vacio</span>`;
      this.loadingTemplate =
      `<span class="ag-overlay-loading-center">Cargando...</span>`;
  }

  async ngOnInit(): Promise<void> {
    this.rowData = await this.http.getHistory();
    
    console.log(this.rowData);

  }

  public responsiveColumn: ColDef[] = [

    {field: 'Evaluador', sortable: true, filter: true},
    {field: 'Evaluado', filter: true},
    {field: 'Puntos', sortable: true, filter: true},
  ]
  

  public columnDefs: ColDef[] = [
    {field: 'Evaluador', sortable: true, filter: true,checkboxSelection:false,},
    {field: 'Evaluado', filter: true},
    {field: 'Puntos', sortable: true, filter: true},
    {field: 'Ranking', filter: true, sortable: true},
    {field: 'Insinia', filter: true, sortable: true},
    {field: 'Fecha', filter: true, sortable: true},
    // {field: 'id', hide: true},
    

  ];
  public defaultColDef: ColDef = {
    flex: 1,
  };
  onRemoveSelected() {
    console.log(this.gridApi);

    const selectedData = this.gridApi.getSelectedRows();
    let data;
    // let data: any[] = []
    // for (let i = 0; i < selectedData.length; i++){
    //  data.push({id : selectedData[i].idHistory});
    // }
    // const datae = JSON.stringify(data);
    console.log(selectedData[0]);


    data = {
      idHistory:  selectedData[0].idHistory,
      insinia: selectedData[0].Insinia,
      idUser: selectedData[0].idEvaluado,
      idRanking: selectedData[0].idRanking,
      Puntos: selectedData[0].Puntos,

    };
    
    const res = this.gridApi.applyTransaction({ remove: selectedData })!;
    this.printResult(res);
      this.http.revertHistory(data);

  }
  
   printResult(res: RowNodeTransaction) {
    console.log('---------------------------------------');
    if (res.add) {
      res.add.forEach(function (rowNode) {
        console.log('Added Row Node', rowNode);
      });
    }
    if (res.remove) {
      res.remove.forEach(function (rowNode) {
        console.log('Removed Row Node', rowNode);
      });
    }
    if (res.update) {
      res.update.forEach(function (rowNode) {
        console.log('Updated Row Node', rowNode);
      });
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
}


