import { AbstractControl } from "@angular/forms";

export class CustomValidator {
    static numeric(control: AbstractControl) {
        let val = control.value;
        if (val === null || val === '') return null;
        if (!val.toString().match(/^[0-9]+(\.?[0-9]+)?$/)) return { 'invalidNumber': true };
        return null;
    }

    static dateValidator(control: AbstractControl) {
        let today: string | Date = new Date();
        today = today.toISOString().slice(0, -14);
        if (control.value < '1900-1-1') {
            return { preOld: true };
        } else if (control.value > today) {
            return { postToday: true };
        }
        return null;
    }

    static hasExtension(control: AbstractControl) {
        const value = control.value;
        if (value.includes('.')) {
            return { 'hasExtension': true }
        }
        return null;
    }

    static lastSlash(control: AbstractControl) {
        const value = control.value;
        if (value.slice(-1) !== '/') {
            return { 'lastSlash': true }
        }
        return null;
    }

    static isUpperCase(control: AbstractControl) {
        const value = control.value;
        if (value && value.toUpperCase() !== value) {
            return { 'notUpperCase': true }
        }
        return null;
    }

    static isVoid(control: AbstractControl) {
        const value = control.value;
        if (value == "" || value.length === 0) {
            return { 'isVoid': true }
        }
        return null;
    }
}