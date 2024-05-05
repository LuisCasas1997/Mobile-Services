import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Angular Material Modules
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// CDK Table Module for Data Table support
import { CdkTableModule } from '@angular/cdk/table';

// Forms Modules for Template Driven and Reactive Forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Flex Layout Module for responsive layouts
import { FlexLayoutModule } from '@angular/flex-layout';

// Component and Pipes Module
import { DynamicTableComponent } from './dynamic-table.component';
import { PipeModule } from '../../../pipes/pipe.module';  // Make sure this path is correct
import { DynamicInputComponent } from './dynamic-input.component';

// Third-Party Module for Input Masks
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';


@NgModule({
  declarations: [DynamicTableComponent, DynamicInputComponent],
  imports: [
    CommonModule
    , MatTableModule
    , MatInputModule
    , MatIconModule
    , MatButtonModule
    , MatSortModule
    , MatPaginatorModule
    , CdkTableModule
    , MatFormFieldModule
    , FormsModule
    , MatTooltipModule
    , FlexLayoutModule
    , MatSlideToggleModule
    , MatBadgeModule
    , ReactiveFormsModule
    , PipeModule
    , MatMenuModule
    , MatOptionModule
    , MatSelectModule
    , MatProgressSpinnerModule
    , NgxMaskDirective
    , NgxMaskPipe
  ]
  , exports: [DynamicTableComponent]
  , providers: [
    provideNgxMask()
  ]
})
export class DynamicTableModule { }
