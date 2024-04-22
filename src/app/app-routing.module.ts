// En app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';  // Importa las rutas desde app.routes.ts

@NgModule({
  imports: [RouterModule.forRoot(routes)],  // Utiliza el arreglo de rutas importado
  exports: [RouterModule]
})
export class AppRoutingModule { }
