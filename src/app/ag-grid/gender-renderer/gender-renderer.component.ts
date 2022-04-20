import {Component} from '@angular/core';
import {ICellRendererAngularComp} from 'ag-grid-angular';
import {ICellRendererParams} from 'ag-grid-community';

@Component({
  selector: 'app-gender-renderer',
  templateUrl: './gender-renderer.component.html',
  styleUrls: ['./gender-renderer.component.css']
})


export class GenderRendererComponent implements ICellRendererAngularComp {
  public imageSource!: string;
  public value: any;
  public nivel: any

  agInit(params: ICellRendererParams): void {
    if (params.value < 1000 && params.value > 0) {
      this.imageSource = `https://www.ag-grid.com/static/angular-e185415c50bc1885eed6c6cc9d2b009e.svg`;
      this.nivel = "NIVEL 1"
      this.value = params.value + " pts.";
    }
    else if (params.value < 4000 && params.value > 2000) {
      this.imageSource = `https://www.ag-grid.com/static/angular-e185415c50bc1885eed6c6cc9d2b009e.svg`;
      this.nivel = "NIVEL 2"
      this.value = params.value + " pts.";
    }
    else if (params.value < 7000 && params.value > 4000) {
      this.imageSource = `https://www.ag-grid.com/static/angular-e185415c50bc1885eed6c6cc9d2b009e.svg`;
      this.nivel = "NIVEL 3"
      this.value = params.value + " pts.";
    }
    else if (params.value < 10000 && params.value > 7000) {
      this.imageSource = `https://www.ag-grid.com/static/angular-e185415c50bc1885eed6c6cc9d2b009e.svg`;
      this.nivel = "NIVEL 4"
      this.value = params.value + " pts.";
    }
    else if (params.value >= 10000) {
      this.imageSource = `https://www.ag-grid.com/static/angular-e185415c50bc1885eed6c6cc9d2b009e.svg`;
      this.nivel = "NIVEL 5"
      this.value = params.value + " pts.";
    }


  }

  refresh(params: ICellRendererParams) {
    return false;
  }
}