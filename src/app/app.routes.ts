import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'products/products-grid', pathMatch: 'full' },
  { path: 'products', loadChildren: () => import('./main/bss/products/products.module').then(m => m.ProductsModule) },
];
