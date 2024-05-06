import { EventEmitter } from "@angular/core";


export class IGenericDialog {
    data: any;
    actions?: any[];
    eventClose?: EventEmitter<any>;
}