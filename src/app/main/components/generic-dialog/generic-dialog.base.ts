import { EventEmitter } from "@angular/core";
import { GenericAction } from "./generic-dialog-entities/generic-action";
import { IGenericDialog } from "./generic-dialog.inteface";

export class GenericDialog implements IGenericDialog {
    eventClose: EventEmitter<any> = new EventEmitter<any>();
    
    public data: any;
    public actions: GenericAction[] = [];

    public close(dialogResult: any=undefined) {
        console.log("Close");
        this.eventClose.emit(dialogResult);
    }
}