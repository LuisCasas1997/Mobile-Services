// app.module.ts

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { CoreModule } from '@angular/flex-layout';
import { routes } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    RouterModule.forRoot(routes, { enableTracing: true })  // Útil para depurar rutas
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
