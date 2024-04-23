import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
// import { AppRoutingModule } from './app-routing.module';
import { BssModule } from './main/bss/bss.module';
import { CoreModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    AppComponent,],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BssModule,
    // AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
