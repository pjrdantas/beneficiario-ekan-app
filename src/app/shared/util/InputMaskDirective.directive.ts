import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
    selector: '[formControlName][inputDateMask]',
})
export class InputMaskDirective {
    constructor(public ngControl: NgControl) { }

    @HostListener('ngModelChange', ['$event'])
    onModelChange(event: any) {
        this.onInputChange(event, false);
    }

    @HostListener('keydown.backspace', ['$event'])
    keydownBackspace(event: any) {
        this.onInputChange(event.target.value, true);
    }

    onInputChange(event: any, backspace: any) {
        let newDate = '';

        let month: string = "";
        let day: string = "";
        let year: string = "";

        if (event)
            newDate = event.replace(/\D/g, '');

        if (backspace) {
            newDate = newDate.substring(0, newDate.length - 1);
        }
        if (newDate.length > 7) {

            if(newDate.match(/^[0-9]+$/) ? true : false)
            month = newDate.substring(0, 2);
            day = newDate.substring(2, 4);
            year = newDate.substring(4, 8);
            newDate = (`${month}/${day}/${year}`);

            this.ngControl?.valueAccessor?.writeValue(newDate);
        }
    }
}
