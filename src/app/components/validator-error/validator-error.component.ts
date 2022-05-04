import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-validator-error',
  templateUrl: './validator-error.component.html',
  styleUrls: ['./validator-error.component.css']
})
export class ValidatorErrorComponent implements OnInit {
  @Input() ctrl: FormControl | any;
  @Input() isTouched: boolean = false;

  ERROR_MESSAGE: any = {
    required: () => `El campo es obligatorio.`,
    minlength: (par: any) => `Mínimo ${par.requiredLength} caracteres.`,
    maxlength: (par: any) => `Máximo ${par.requiredLength} caracteres.`,
    pattern: () => `No se permiten cáracteres especiales.`,
    nameExists: () => `Este nombre ya existe.`,
    invalidNumber: () => `Debes introducir un número válido.`,
    preOld: () => `Fecha demasiado antigua.`,
    postToday: () => `Fecha futura.`,
    hasExtension: () => `No hace falta escribir la extensión.`,
    lastSlash: () => `La última letra tiene que ser /.`,
    max: (par: any) => `El valor máximo es ${par.max}.`,
    min: (par: any) => `El valor mínimo es ${par.min}.`
  };

  constructor() { }

  ngOnInit(): void {
  }

  shouldShowErrors(): boolean {
    if (!this.isTouched) return this.ctrl && this.ctrl.errors;
    return this.ctrl && this.ctrl.errors && this.ctrl.touched;
  }

  listOfErrors(): string[] {
    return Object.keys(this.ctrl.errors).map(
      err => this.ERROR_MESSAGE[err](this.ctrl.getError(err))
    );
  }


}
