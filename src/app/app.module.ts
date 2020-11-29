import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
// import { AgmCoreModule } from '@agm/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// import { GOOGLE_API_KEY } from './variables.js';
import { NavTopComponent } from './navigation/nav-top/nav-top.component';
import { NavSideComponent } from './navigation/nav-side/nav-side.component';
import { BuoyDetailsComponent } from './components/buoy-details/buoy-details.component';
import { MapComponent } from './components/map/map.component';


@NgModule({
  declarations: [
    AppComponent,
    NavTopComponent,
    NavSideComponent,
    BuoyDetailsComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    // AgmCoreModule.forRoot({
    //   apiKey: GOOGLE_API_KEY
    // })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }