import {Component} from '@angular/core';
import {ICellRendererAngularComp} from 'ag-grid-angular';
import {ICellRendererParams} from 'ag-grid-community';

@Component({
  selector: 'mood-cell',
  template: `<img width="20px" [src]="imgForMood" /> `,
})
export class MoodRendererComponent implements ICellRendererAngularComp {
  private params!: ICellRendererParams;
  private mood!: string;
  public imgForMood!: string;

  agInit(params: ICellRendererParams): void {
    this.params = params;
    this.setMood(params);
  }

  refresh(params: ICellRendererParams): boolean {
    this.params = params;
    this.setMood(params);
    return true;
  }

  private setMood(params: ICellRendererParams) {
    this.mood = params.value;
    this.imgForMood =
      'https://www.ag-grid.com/example-assets/smileys/' +
      (this.mood === 'sad.png');
  }
}