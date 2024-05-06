import { Routes } from '@angular/router';
// import { AuthGuard } from './main/bss/auth/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import('./main/bss/auth/auth.module').then(m => m.AuthModule) },
  { path: 'products', loadChildren: () => import('./main/bss/products/products.module').then(m => m.ProductsModule) }
];
