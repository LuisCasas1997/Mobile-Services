// Ejemplo: core/core.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import {  MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AdministratorProductsComponent } from '../products/administrator-products/administrator-products.component';
import { ProductsModule } from '../products/products.module';


@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
  ],
  exports: [
    NavbarComponent,
    SidebarComponent
  ],
  // providers:[
  //   AdministratorProductsComponent
  // ]
})
export class CoreModule { }
