import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavTopComponent } from './navigation/nav-top/nav-top.component';
import { NavSideComponent } from './navigation/nav-side/nav-side.component';
import { HttpClientModule } from '@angular/common/http';
import { BuoyDetailsComponent } from './components/buoy-details/buoy-details.component';

@NgModule({
  declarations: [
    AppComponent,
    NavTopComponent,
    NavSideComponent
    BuoyDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
