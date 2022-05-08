import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { fadeIn, slideDownHideUp } from 'src/app/config/animations.config';
import { HttpService } from '../services/http.service';
import {
  ColDef,
  GridReadyEvent,
  ICellRendererParams,
  RowNode,
} from 'ag-grid-community';
import { MoodRendererComponent } from '../ag-grid/mood-renderer/mood-renderer.component';
import { GenderRendererComponent } from '../ag-grid/gender-renderer/gender-renderer.component';
import { BrowserModule } from '@angular/platform-browser';
import { AgGridModule } from 'ag-grid-angular';
import { Observable } from 'rxjs';
import { Ranking } from '../models/rankings';
import { FormControl, FormGroup, Validators } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-user-ranking-dev',
  templateUrl: './user-ranking-dev.component.html',
  styleUrls: ['./user-ranking-dev.component.css'],
  animations: [fadeIn, slideDownHideUp]
})
export class UserRankingDevComponent implements OnInit {
  private resizeListenerFunc = () => {
    this.gridApi.api.sizeColumnsToFit();
  };
  // onGridReady() {
  //   this.gridApi.api.sizeColumnsToFit();
  //   window.addEventListener('resize', this.resizeListenerFunc);
  // }
  ngOnDestroy() {
    // window.removeEventListener('resize', this.resizeListenerFunc);
  }

  public responsiveColumn: ColDef[] = [
    { field: 'Nombre', sortable: true, filter: true },
    { field: 'Apellido', filter: true },
    { field: 'Puntos', sortable: true, filter: true },
  ];

  columnDefs: ColDef[] = [
    { field: 'Nombre', sortable: true, filter: true },
    { field: 'Apellido', filter: true },
    { field: 'Puntos', sortable: true, filter: true },
    // {field: 'id', hide: true},
    { field: 'idUser', hide: true },
    { field: 'isModerator', hide: true },
    {
      field: 'Responsabilidad',
      cellRendererSelector: function (params: ICellRendererParams) {
        let genderDetails = {
          component: GenderRendererComponent,
          params: { values: this },
          componente: MoodRendererComponent,
        };

        return genderDetails;
      },
      editable: true,
    },
    {
      field: 'Cooperacion',
      cellRendererSelector: function (params: ICellRendererParams) {
        let genderDetails = {
          component: GenderRendererComponent,
          params: { values: this },
          componente: MoodRendererComponent,
        };

        return genderDetails;
      },
      editable: true,
    },
    {
      field: 'Autonomia',
      cellRendererSelector: function (params: ICellRendererParams) {
        let genderDetails = {
          component: GenderRendererComponent,
          params: { values: this },
          componente: MoodRendererComponent,
        };

        return genderDetails;
      },
      editable: true,
    },
    {
      field: 'Emocional',
      cellRendererSelector: function (params: ICellRendererParams) {
        let genderDetails = {
          component: GenderRendererComponent,
          params: { values: this },
          componente: MoodRendererComponent,
        };

        return genderDetails;
      },
      editable: true,
    },
    {
      field: 'Inteligencia',
      cellRendererSelector: function (params: ICellRendererParams) {
        let genderDetails = {
          component: GenderRendererComponent,
          params: { values: this },
          componente: MoodRendererComponent,
        };

        return genderDetails;
      },
      editable: true,
    },
  ];

  columnDefsModerator: ColDef[] = [
    { field: 'Nombre', sortable: true, filter: true },
    { field: 'Apellido', filter: true },
    { field: 'Puntos', sortable: true, filter: true, editable: true },
    { field: 'id', hide: true },
    { field: 'idUser', hide: true },
    { field: 'isModerator', hide: true },
    {
      field: 'Responsabilidad',
      cellRendererSelector: function (params: ICellRendererParams) {
        let genderDetails = {
          component: GenderRendererComponent,
          params: { values: this },
          componente: MoodRendererComponent,
        };

        return genderDetails;
      },
      editable: true,
    },
    {
      field: 'Cooperacion',
      cellRendererSelector: function (params: ICellRendererParams) {
        let genderDetails = {
          component: GenderRendererComponent,
          params: { values: this },
          componente: MoodRendererComponent,
        };

        return genderDetails;
      },
      editable: true,
    },
    {
      field: 'Autonomia',
      cellRendererSelector: function (params: ICellRendererParams) {
        let genderDetails = {
          component: GenderRendererComponent,
          params: { values: this },
          componente: MoodRendererComponent,
        };

        return genderDetails;
      },
      editable: true,
    },
    {
      field: 'Emocional',
      cellRendererSelector: function (params: ICellRendererParams) {
        let genderDetails = {
          component: GenderRendererComponent,
          params: { values: this },
          componente: MoodRendererComponent,
        };

        return genderDetails;
      },
      editable: true,
    },
    {
      field: 'Inteligencia',
      cellRendererSelector: function (params: ICellRendererParams) {
        let genderDetails = {
          component: GenderRendererComponent,
          params: { values: this },
          componente: MoodRendererComponent,
        };

        return genderDetails;
      },
      editable: true,
    },
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
  public contadorTippy: any = 'a' + 1;
  public isInsinia: boolean;
  public sessionPoints: any;
  public insiniaPoints: any;
  public ran = (Math.random() + 1).toString(36).substring(7);
  public ale = (Math.random() + 1).toString(36).substring(7);
  public rankingSelect = false;
  public columnDefsSelect:any;

  constructor(
    private router: Router,
    private http: HttpService,
    private httpC: HttpClient
  ) {
    this.goupStatus = false;
    this.navbarStatus = false;
    let i = 0;
    this.addRanking = new FormGroup({
      rankingId: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(7),
        Validators.pattern('^[a-zA-Z ]*$'),
      ]),
    });
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

    this.isScrolledIntoView();
    this.rankings = await this.http.getRanking();
    // this.rankingsModerator = await this.http.getRankingModerator();

    if (this.rankings.length > 0) {
      this.nullRankings = false;
    } else {
      this.nullRankings = true;
    }
    console.log(this.rankings.rankingData);

    // this.rowData = await this.http.getRankingModerator();
  }

  async addRankingByCode() {
    if (this.addRanking.controls.rankingId.value != '') {
      this.showAdd = false;
      this.rankingId = this.addRanking.controls.rankingId.value;
      const code = {
        code: this.rankingId,
      };
      this.http.addRankingByCode(code);
      this.rankings = await this.http.getRanking();
      // this.rowData = await this.http.getRankingData();
      this.onGridSizeChanged(this.gridApi);
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
  }

  onGridSizeChanged(event: any) {}

  onGridReady(params: GridReadyEvent) {
    params.api.sizeColumnsToFit();
    window.addEventListener('resize', function () {
      setTimeout(function () {
        params.api.sizeColumnsToFit();
      });
    });
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
    if (window.innerWidth <= 480) {
      this.gridApi.setColumnDefs(this.responsiveColumn);
      params.api.sizeColumnsToFit();
    }
  }

  // Al cambiar un elemento de la tabla le passamos al backend para realizar el update
  async onCellValueChanged(event: any) {
    // , userPoints: any
    console.log(event);
    // userPoints = -1;
    if (!isNaN(event.value)) {
      console.log(event.data.idUser);

      let insinia = event.colDef.field;

      if (insinia == 'Puntos') {
        const data = {
          idRanking: event.data.id,
          idUser: event.data.idUser,
          points: parseInt(event.value),
          idUserModified: event.data.idUser,
          insinia: 'puntos',
          oldValue: event.oldValue
        };
        await this.http.updateData(data);
      } else if (
        insinia == 'Responsabilidad' ||
        insinia == 'Cooperacion' ||
        insinia == 'Autonomia' ||
        insinia == 'Emocional' ||
        insinia == 'Inteligencia'
      ) {
        const data = {
          idRanking: event.data.id,
          idUserModified: event.data.idUser,
          points: parseInt(event.value),
          insinia: insinia,
          oldValue: event.oldValue
        };
        await this.http.updateInsinia(data);
      } else {
        event.value = event.oldValue;
      }
    }
  }



  async collapse(id: string, state: string) {
    if (state == 'show') {
      state = 'hide';
      $('#' + id).collapse(state);
    }

    if (state == 'hide') {
      state = 'show';
      $('#' + id).collapse((state = 'show'));
    }
    await this.delay(1111);
    this.gridApi.sizeColumnsToFit();
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**********DEV */

  async rankingData(rankingId: any) {
    const data = {
      rankingId: rankingId,
    };
    
    this.rowData = await this.http.getRankingData(data);
    console.log();
    if(this.rowData.moderator){
      this.columnDefsSelect = this.columnDefsModerator;
    }else{
      this.columnDefsSelect = this.columnDefs;
    }
   

    this.rowData = this.rowData.response;
    
    this.rankingSelect = true;
  }

  clearLocalStorage() {
    localStorage.removeItem('token');
  }
}
