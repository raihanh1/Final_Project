import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavTopComponent } from './navigation/nav-top/nav-top.component';
import { NavSideComponent } from './navigation/nav-side/nav-side.component';

@NgModule({
  declarations: [
    AppComponent,
    NavTopComponent,
    NavSideComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
