import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsGridComponent } from './products-grid/products-grid.component';
import { Routes, RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { ProductService } from './product.service';
import { environment } from '../../../../environments/environment';
import { SharedModule } from '../../../shared/shared.module';
import { AdministratorProductsComponent } from './administrator-products/administrator-products.component';
import { MatIconModule } from '@angular/material/icon';
import { DynamicTableModule } from '../../components/dynamic-table/dynamic-table.module';
import { GenericDialogModule } from '../../components/generic-dialog/generic-dialog.module';
import { AddProductsComponent } from './administrator-products/add-products/add-products.component';


export const PRODUCT_ROUTES: Routes = [
  {
    path: 'products-grid',
    component: ProductsGridComponent
  },
  {
    path: 'administrator-products',
    component: AdministratorProductsComponent
  }
];

@NgModule({
  declarations: [
    ProductsGridComponent,
    AdministratorProductsComponent,
    AddProductsComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
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
    MatIconModule,
    SharedModule,
    DynamicTableModule,
    GenericDialogModule
  ],
  providers: [
    ProductService,
  ]
})
export class ProductsModule { }
