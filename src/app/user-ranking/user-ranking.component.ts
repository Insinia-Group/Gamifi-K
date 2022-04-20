import {Component, HostListener, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {fadeIn} from '../config/animations.config';
import {HttpService} from '../services/http.service';
import {ColDef, GridReadyEvent, ICellRendererParams} from 'ag-grid-community';
import {MoodRendererComponent} from '../ag-grid/mood-renderer/mood-renderer.component';
import {GenderRendererComponent} from '../ag-grid/gender-renderer/gender-renderer.component';
import {BrowserModule} from '@angular/platform-browser';
import {AgGridModule} from 'ag-grid-angular';
import {Observable} from 'rxjs';
import {Ranking} from '../models/rankings';
import {FormControl, FormGroup, Validators} from '@angular/forms';
declare var $: any;





@Component({
  selector: 'app-user-ranking',
  templateUrl: './user-ranking.component.html',
  styleUrls: ['./user-ranking.component.css'],
  animations: [fadeIn],

})
export class UserRankingComponent implements OnInit {

  private resizeListenerFunc = () => {this.gridApi.api.sizeColumnsToFit();};
  // onGridReady() {
  //   this.gridApi.api.sizeColumnsToFit();
  //   window.addEventListener('resize', this.resizeListenerFunc);
  // }
  ngOnDestroy() {
    // window.removeEventListener('resize', this.resizeListenerFunc);
  }

  columnDefs: ColDef[] = [
    {field: 'Nombre', sortable: true, filter: true},
    {field: 'Apellido', filter: true},
    {field: 'Puntos', sortable: true, filter: true},
    // {field: 'id', hide: true},
    {field: 'idUser', hide: true},
    {
      field: 'responsability', cellRendererSelector: function (params: ICellRendererParams) {
        let genderDetails = {
          component: GenderRendererComponent,
          params: {values: this},
          componente: MoodRendererComponent,
        };

        return genderDetails;
      },
      editable: true
    },
    {
      field: 'cooperation', cellRendererSelector: function (params: ICellRendererParams) {
        let genderDetails = {
          component: GenderRendererComponent,
          params: {values: this},
          componente: MoodRendererComponent,
        };

        return genderDetails;
      },
      editable: true
    },
    {
      field: 'autonomy', cellRendererSelector: function (params: ICellRendererParams) {
        let genderDetails = {
          component: GenderRendererComponent,
          params: {values: this},
          componente: MoodRendererComponent,
        };

        return genderDetails;
      },
      editable: true
    },
    {
      field: 'emotional', cellRendererSelector: function (params: ICellRendererParams) {
        let genderDetails = {
          component: GenderRendererComponent,
          params: {values: this},
          componente: MoodRendererComponent,
        };

        return genderDetails;
      },
      editable: true
    },
    {
      field: 'thinking', cellRendererSelector: function (params: ICellRendererParams) {
        let genderDetails = {
          component: GenderRendererComponent,
          params: {values: this},
          componente: MoodRendererComponent,
        };

        return genderDetails;
      },
      editable: true
    },


  ];

  columnDefsModerator: ColDef[] = [
    {field: 'Nombre', sortable: true, filter: true},
    {field: 'Apellido', filter: true},
    {field: 'Puntos', sortable: true, filter: true, editable: true},
    {field: 'id', hide: true},
    {field: 'idUser', hide: true},
    {field: 'idUser', hide: true},
    {
      field: 'responsability', cellRendererSelector: function (params: ICellRendererParams) {
        let genderDetails = {
          component: GenderRendererComponent,
          params: {values: this},
          componente: MoodRendererComponent,
        };

        return genderDetails;
      },
      editable: true
    },
    {
      field: 'cooperation', cellRendererSelector: function (params: ICellRendererParams) {
        let genderDetails = {
          component: GenderRendererComponent,
          params: {values: this},
          componente: MoodRendererComponent,
        };

        return genderDetails;
      },
      editable: true
    },
    {
      field: 'autonomy', cellRendererSelector: function (params: ICellRendererParams) {
        let genderDetails = {
          component: GenderRendererComponent,
          params: {values: this},
          componente: MoodRendererComponent,
        };

        return genderDetails;
      },
      editable: true
    },
    {
      field: 'emotional', cellRendererSelector: function (params: ICellRendererParams) {
        let genderDetails = {
          component: GenderRendererComponent,
          params: {values: this},
          componente: MoodRendererComponent,
        };

        return genderDetails;
      },
      editable: true
    },
    {
      field: 'thinking', cellRendererSelector: function (params: ICellRendererParams) {
        let genderDetails = {
          component: GenderRendererComponent,
          params: {values: this},
          componente: MoodRendererComponent,
        };

        return genderDetails;
      },
      editable: true
    },
  ];
  public rowData: any;
  public rankings: any;
  public rankingsModerator: any;
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
  public rankingsUserView: boolean = true;
  public rankingsModeratorView: boolean = true;



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

    if (localStorage.getItem('token') == null) {
      this.router.navigate(['/login']);
    }
    const statusToken = await this.http.tokenValidation();
    if (statusToken == false) {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }


    this.addRanking = new FormGroup({
      rankingId: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(7), Validators.pattern('^[a-zA-Z ]*$')]),
    }
    );
    this.isScrolledIntoView();
    this.rankings = await this.http.getRanking();
    this.rankingsModerator = await this.http.getRankingModerator();

    if (this.rankings.length > 0) {
      this.nullRankings = false;
    } else {
      this.nullRankings = true;
    }
    console.log(this.rankings);
    this.rowData = await this.http.getRankingData();

    // this.rowData = await this.http.getRankingModerator();

  }

  async addRankingByCode() {
    if (this.addRanking.controls.rankingId.value != "") {

      this.showAdd = false;
      this.rankingId = this.addRanking.controls.rankingId.value;
      const code = {
        code: this.rankingId
      }
      this.http.addRankingByCode(code);
      this.rankings = await this.http.getRanking();
      this.rowData = await this.http.getRankingData();
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

  onGridSizeChanged(event: any) {
  }

  onGridReady(params: GridReadyEvent) {
    params.api.sizeColumnsToFit();
    window.addEventListener('resize', function () {
      setTimeout(function () {
        params.api.sizeColumnsToFit();
      });
    });
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
  }

  async onCellValueChanged(event: any) {

    // responsability
    // cooperation
    // autonomy
    // emotional
    // thinking

    let insinia = event.colDef.field

    switch (insinia) {
      case "emotional": console.log("pene");

    }


    if (!isNaN(event.value)) {
      console.log("es una letra");
      console.log(event.colDef.field)
      event.oldValue;

      const data = {
        id: event.data.id,
        idUser: event.data.idUser,
        points: parseInt(event.value)
      }
      await this.http.updateData(data);
    }
  }



  showRankingsUser() {
    this.rankingsUserView = true;
    this.rankingsModeratorView = false;
  }

  showRankingsModerator() {
    this.rankingsUserView = false;
    this.rankingsModeratorView = true;
  }



  async collapse(id: string, state: string) {

    if (state == 'show') {
      state = 'hide';
      $('#' + id).collapse(state);
    }

    if (state == 'hide') {
      state = 'show';
      $('#' + id).collapse(state = 'show');
    }
    await this.delay(1111);
    this.gridApi.sizeColumnsToFit();
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


}
