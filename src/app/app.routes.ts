// En app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'products-grid', pathMatch: 'full' },
  { path: 'products-grid', loadChildren: () => import('./main/bss/products/products.module').then(m => m.ProductsModule) }
  // Puedes agregar más rutas aquí según sea necesario
];
