import { ThemePalette } from "@angular/material/core";
import { Observable } from "rxjs";

export class ColumnSource {
    columnDef!: string;
    headerName!: string;
    hideOnSm?: any
    hideOnXs?: any
    cell?: any;
    operations?: Operation[];
    toogle?: Toogle;
    defaultSort?: boolean;
    defaultSortDesc?: boolean;
    isIcon?: boolean;
    isActiveFormat?: boolean;
    contentClass?: string;
    conditionalClass?: any;
    headerClass?: string;
    footer?: any;
    contentTemplate?: any;
    isHtmlTemplate?: boolean;
    operationVisualization?: 'icons' | 'more' = "icons";
    headerTemplate?: any;
    columnType?: 'text' | 'input';
    inputType?: 'number' | 'text' | 'decimal' | 'email' | 'currency';
    placeholder?: string;
    valueChanges?: any;
    disabledInput?: boolean;
    conditionalInputClass?: any;
    isTemplate?: boolean;
}

export class Operation {
    icon!: string;
    color!: string;
    action: any;
    toolTip!: string;
    badge?: any;
    badgeColor?: ThemePalette;
    hideOnXs?: any;
    hideCondition?: any;
}

export class Toogle {
    value!: string;
    disabled?: string;
    action: any;
    hideCondition?: any;
}