import {Component} from '@angular/core';
import {ICellRendererAngularComp} from 'ag-grid-angular';
import {ICellRendererParams} from 'ag-grid-community';

@Component({
  selector: 'app-gender-renderer',
  template: ` <span> <img width="20px"  [src]="imageSource" />{{ value }}</span>  `,
})
export class GenderRendererComponent implements ICellRendererAngularComp {
  public imageSource!: string;
  public value: any;

  agInit(params: ICellRendererParams): void {
    this.imageSource = `https://www.ag-grid.com/static/angular-e185415c50bc1885eed6c6cc9d2b009e.svg`;
    this.value = "angular";
  }

  refresh(params: ICellRendererParams) {
    return false;
  }
}