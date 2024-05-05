// Ejemplo: core/core.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import {  MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ProductsModule } from '../products/products.module';


@NgModule({
  declarations: [
    NavbarComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    ProductsModule
  ],
  exports: [
    NavbarComponent,
  ],
})
export class CoreModule { }
