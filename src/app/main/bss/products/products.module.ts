import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsGridComponent } from './products-grid/products-grid.component';
import { Routes, RouterModule } from '@angular/router';
import { CoreModule, FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { ProductService } from './product.service';
import { environment } from '../../../../environments/environment';
import { ResizeImagePipe } from '../../../pipes/resize-image.pipe';
import { SharedModule } from '../../../shared/shared.module';
import { AdministratorProductsComponent } from './administrator-products/administrator-products.component';


export const PRODUCT_ROUTES: Routes = [
  {
    path: '',
    component: ProductsGridComponent
  },
  {
    path:'administrator-products',
    component: AdministratorProductsComponent
  }
];

@NgModule({
  declarations: [
    ProductsGridComponent,
    AdministratorProductsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(PRODUCT_ROUTES),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    SharedModule
  ],
  providers: [
    ProductService,
  ]
})
export class ProductsModule {}
