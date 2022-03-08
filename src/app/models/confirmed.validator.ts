import {FormGroup, AbstractControl, ValidatorFn, ValidationErrors, NG_VALIDATORS, Validator} from '@angular/forms';
import {Directive} from '@angular/core';

export function ConfirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
            return;
        }
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({confirmedValidator: true});
        } else {
            matchingControl.setErrors(null);
        }
    }
}


export function futureDate(date: Date) {
    console.log(date);
    console.log(Date.now);

}
