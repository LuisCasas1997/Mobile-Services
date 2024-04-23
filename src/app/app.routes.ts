import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'products-grid', pathMatch: 'full' },
  { path: 'products-grid', loadChildren: () => import('./main/bss/products/products.module').then(m => m.ProductsModule) },
  { path: 'administrator-products', loadChildren: () => import('./main/bss/products/products.module').then(m => m.ProductsModule) }
];
