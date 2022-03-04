import {Directive, HostListener, ElementRef} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {FormGroup} from '@angular/forms';

@Directive({
    selector: '[focusInvalidInput]'
})
export class FormDirective {

    constructor(private el: ElementRef) {}

    @HostListener('submit')
    onFormSubmit() {
        const invalidControl = this.el.nativeElement.querySelector('.ng-invalid');

        if (invalidControl) {
            invalidControl.focus();
        }
    }
}