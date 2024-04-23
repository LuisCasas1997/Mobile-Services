import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsModule } from './products/products.module';
import { CoreModule } from '@angular/flex-layout';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProductsModule,
    CoreModule
  ],
  exports: [
    ProductsModule
  ]
})
export class BssModule { }
