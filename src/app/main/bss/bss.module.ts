import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { CoreInitialModule } from './core/core-initial.module';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProductsModule,
    CoreInitialModule,
    AuthModule
  ],
  providers: [
    CoreInitialModule
  ],
})
export class BssModule { }
