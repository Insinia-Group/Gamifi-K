import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-gender-renderer',
  templateUrl: './gender-renderer.component.html',
  styleUrls: ['./gender-renderer.component.css']
})


export class GenderRendererComponent implements ICellRendererAngularComp {
  public imageSource!: string;
  public value: any;
  public nivel: any
  public ran = (Math.random() + 1).toString(36).substring(7);
  public al = (Math.random() + 1).toString(36).substring(7);


  agInit(params: ICellRendererParams): void {

    if (isNaN(params.value)) {
      this.imageSource = `https://pngset.com/images/circulo-de-prohibido-2-image-stop-clothing-apparel-symbol-sign-transparent-png-2816430.png`;
      this.nivel = "CARACTERES NO VALIDOS"
      this.value = "introduce un numero";
    }

    else if (params.value < 2000 && params.value > 0) {
      switch (params.colDef?.field) {
        case "Inteligencia": this.imageSource = '..\\assets\\pensamiento_1.svg'; break;
        case "Responsabilidad": this.imageSource = '..\\assets\\responsabilidad_1.svg'; break;
        case "Cooperacion": this.imageSource = '..\\assets\\cooperacion_1.svg'; break;
        case "Autonomia": this.imageSource = '..\\assets\\autonomia_1.svg'; break;
        case "Emocional": this.imageSource = '..\\assets\\emocional_1.svg'; break;
      }

      this.nivel = "NIVEL 1"
      this.value = params.value + " pts.";
    }
    else if (params.value < 4000 && params.value >= 2000) {
      switch (params.colDef?.field) {
        case "Inteligencia": this.imageSource = '..\\assets\\pensamiento_2.svg'; break;
        case "Responsabilidad": this.imageSource = '..\\assets\\responsabilidad_2.svg'; break;
        case "Cooperacion": this.imageSource = '..\\assets\\cooperacion_2.svg'; break;
        case "Autonomia": this.imageSource = '..\\assets\\autonomia_2.svg'; break;
        case "Emocional": this.imageSource = '..\\assets\\emocional_2.svg'; break;
      }
      this.nivel = "NIVEL 2"
      this.value = params.value + " pts.";
    }
    else if (params.value < 7000 && params.value >= 4000) {
      switch (params.colDef?.field) {
        case "Inteligencia": this.imageSource = '..\\assets\\pensamiento_3.svg'; break;
        case "Responsabilidad": this.imageSource = '..\\assets\\responsabilidad_3.svg'; break;
        case "Cooperacion": this.imageSource = '..\\assets\\cooperacion_3.svg'; break;
        case "Autonomia": this.imageSource = '..\\assets\\autonomia_3.svg'; break;
        case "Emocional": this.imageSource = '..\\assets\\emocional_3.svg'; break;
      }
      this.nivel = "NIVEL 3"
      this.value = params.value + " pts.";
    }
    else if (params.value < 10000 && params.value >= 7000) {
      switch (params.colDef?.field) {
        case "Inteligencia": this.imageSource = '..\\assets\\pensamiento_4.svg'; break;
        case "Responsabilidad": this.imageSource = '..\\assets\\responsabilidad_4.svg'; break;
        case "Cooperacion": this.imageSource = '..\\assets\\cooperacion_4.svg'; break;
        case "Autonomia": this.imageSource = '..\\assets\\autonomia_4.svg'; break;
        case "Emocional": this.imageSource = '..\\assets\\emocional_4.svg'; break;
      }
      this.nivel = "NIVEL 4"
      this.value = params.value + " pts.";
    }
    else if (params.value >= 10000) {
      switch (params.colDef?.field) {
        case "Inteligencia": this.imageSource = '..\\assets\\pensamiento_5.svg'; break;
        case "Responsabilidad": this.imageSource = '..\\assets\\responsabilidad_5.svg'; break;
        case "Cooperacion": this.imageSource = '..\\assets\\cooperacion_5.svg'; break;
        case "Autonomia": this.imageSource = '..\\assets\\autonomia_5.svg'; break;
        case "Emocional": this.imageSource = '..\\assets\\emocional_5.svg'; break;
      }
      this.nivel = "NIVEL 5"
      this.value = params.value + " pts.";
    }


  }

  refresh(params: ICellRendererParams) {
    return false;
  }
}