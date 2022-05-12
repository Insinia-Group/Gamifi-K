import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fadeIn, slideDownHideUp } from 'src/app/config/animations.config';
import { HttpService } from '../services/http.service';
import { ColDef, GridReadyEvent, ICellRendererParams } from 'ag-grid-community';
import { MoodRendererComponent } from '../ag-grid/mood-renderer/mood-renderer.component';
import { GenderRendererComponent } from '../ag-grid/gender-renderer/gender-renderer.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
declare var $: any;

@Component({
  selector: 'app-user-ranking-dev',
  templateUrl: './user-ranking-dev.component.html',
  styleUrls: ['./user-ranking-dev.component.css'],
  animations: [fadeIn, slideDownHideUp],
})
export class UserRankingDevComponent implements OnInit {
  private resizeListenerFunc = () => {
    this.gridApi.api.sizeColumnsToFit();
  };
  // onGridReady() {
  //   this.gridApi.api.sizeColumnsToFit();
  //   window.addEventListener('resize', this.resizeListenerFunc);
  // }

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
  public columnDefsSelect: any;
  public isModerator: any;
  public nameSelect: string;
  public idSelect: number;
  public joinCode: string;
  public isReady: boolean = false;
  public idClient: number;

  constructor(
    private router: Router,
    private http: HttpService,
    private notifier: NotifierService
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
    console.log(this.rankings);

    if (this.rankings.length > 0) {
      this.nullRankings = false;
      this.idClient = this.rankings[0].idClient;
      console.log(this.idClient);
    } else {
      this.nullRankings = true;
    }
    this.isReady = true;

    if (this.rankings.length > 0) {
      this.nullRankings = false;
    } else {
      this.nullRankings = true;
    }
  }

  async addRankingByCode(code: any) {
    if (code == '') {
      this.showAdd = false;
      this.notifier.notify('error', 'Codigo invalido.');
    } else {
      const data = {
        code: code,
      };

      const isValidRanking = await this.http.addRankingByCode(data);

      if (isValidRanking) {
        this.rankings = await this.http.getRanking();
        this.onGridSizeChanged(this.gridApi);
        this.nullRankings = false;
      } else {
        this.notifier.notify('error', 'Codigo invalido.');
        this.nullRankings = true;
        this.showAdd = false;
      }
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

  public onRowEditingStarted(event: any) {
    console.log(event);
  }

  // Al cambiar un elemento de la tabla le passamos al backend para realizar el update
  async onCellValueChanged(event: any) {
    console.log(event.newValue);

    if (event.data.idUser == this.idClient) {
      this.notifier.notify('error', 'No puedes ponerte puntos a ti mismo.');
    } else if (event.newValue > this.insiniaPoints && !this.isModerator) {
      this.notifier.notify('error', 'No tienes tantos puntos.');
    } else {
      // , userPoints: any
      console.log(event);
      // userPoints = -1;
      if (!isNaN(event.value)) {
        let insinia = event.colDef.field;

        if (insinia == 'Puntos') {
          const data = {
            idRanking: event.data.id,
            idUser: event.data.idUser,
            points: parseInt(event.value),
            idUserModified: event.data.idUser,
            insinia: 'puntos',
            oldValue: event.oldValue,
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
            oldValue: event.oldValue,
            isModerator: this.isModerator,
          };
          await this.http.updateInsinia(data);
        } else {
          event.value = event.oldValue;
        }
      }
    }

    this.rankingData(this.idSelect, this.nameSelect);
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

  async rankingData(rankingId: any, rankingName: string) {
    const data = {
      rankingId: rankingId,
    };

    this.rowData = await this.http.getRankingData(data);
    if (this.rowData.moderator) {
      this.columnDefsSelect = this.columnDefsModerator;
      this.isModerator = true;
    } else {
      this.columnDefsSelect = this.columnDefs;
      this.isModerator = false;
    }
    this.joinCode = this.rowData.joinCode;
    this.insiniaPoints = this.rowData.insiniaPoints;
    this.rowData = this.rowData.response;
    this.nameSelect = rankingName;
    this.idSelect = rankingId;

    this.rankingSelect = true;
  }

  clearLocalStorage() {
    localStorage.removeItem('token');
  }

  atobImg(data: any) {
    return atob(data);
  }

  async deleteRanking() {
    const data = {
      idRanking: this.idSelect,
    };
    console.log(data);

    await this.http.deleteRanking(data);
    this.rankings = await this.http.getRanking();
  }

  async exitRanking() {
    const data = {
      idRanking: this.idSelect,
    };
    console.log(data);

    await this.http.exitRanking(data);
    this.rankings = await this.http.getRanking();
    this.rankingSelect = false;
    if (this.rankings.length > 0) {
      this.nullRankings = false;
    } else {
      this.nullRankings = true;
    }
  }

  async renewJoinCode() {
    const data = {
      idRanking: this.idSelect,
    };
    await this.http.renewJoinCode(data);
    this.rankings = await this.http.getRanking();

  }
}
