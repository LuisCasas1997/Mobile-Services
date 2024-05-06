// Angular Imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Angular Material Imports
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

// Component & Service Imports
import { GenericDialogComponent } from './generic-dialog.component';
import { GenericDialogDirective } from './generic-dialog.directive';
import { GenericDialogService } from './generic-dialog.service';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [
    GenericDialogComponent,
    GenericDialogDirective
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatTooltipModule,
  ],
  exports: [
    GenericDialogComponent
  ],
  providers: [
    GenericDialogService
  ]
})
export class GenericDialogModule { }