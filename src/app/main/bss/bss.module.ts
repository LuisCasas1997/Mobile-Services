import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsModule } from './products/products.module';
import { CoreModule } from '@angular/flex-layout';
import { AdministratorProductsComponent } from './products/administrator-products/administrator-products.component';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProductsModule,
    CoreModule
  ],
  providers: [
    AdministratorProductsComponent
  ], 
  exports: [
    ProductsModule
  ]
})
export class BssModule { }
