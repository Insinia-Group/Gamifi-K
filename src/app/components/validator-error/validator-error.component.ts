import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { fadeIn } from 'src/app/config/animations.config';

@Component({
  selector: 'validator',
  templateUrl: './validator-error.component.html',
  styleUrls: ['./validator-error.component.css'],
  animations: [fadeIn],
})
export class ValidatorErrorComponent {
  @Input() ctrl: FormControl | any;
  @Input() isTouched: boolean = false;

  ERROR_MESSAGE: any = {
    required: () => `El campo es obligatorio.`,
    email: () => `Debes introducir un email.`,
    emailAlreadyExist: () => `Este email ya existe.`,
    minlength: (par: any) => `Mínimo ${par.requiredLength} caracteres.`,
    maxlength: (par: any) => `Máximo ${par.requiredLength} caracteres.`,
    pattern: () => `Este formato no es válido.`,
    nameExists: () => `Este nombre ya existe.`,
    invalidNumber: () => `Debes introducir un número válido.`,
    preOld: () => `Fecha demasiado antigua.`,
    postToday: () => `Fecha futura.`,
    hasExtension: () => `No hace falta escribir la extensión.`,
    lastSlash: () => `La última letra tiene que ser /.`,
    max: (par: any) => `El valor máximo es ${par.max}.`,
    min: (par: any) => `El valor mínimo es ${par.min}.`,
    codeExist: () => `Este código no esta disponible.`,
    notUpperCase: () => `Debe estar en mayúsculas.`,
    invalidEmail: () => `El email es inválido.`,
    emailNotExists: () => `El email no existe.`
  };

  constructor() { }

  shouldShowErrors(): boolean {
    if (!this.isTouched) return this.ctrl && this.ctrl.errors;
    return this.ctrl && this.ctrl.errors && this.ctrl.touched;
  }

  listOfErrors(): string[] {
    return Object.keys(this.ctrl.errors).map((err) =>
      this.ERROR_MESSAGE[err](this.ctrl.getError(err))
    );
  }
}
