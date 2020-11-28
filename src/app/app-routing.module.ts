import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuoyDetailsComponent } from './components/buoy-details/buoy-details.component';

const routes: Routes = [
  { path: 'buoy', component: BuoyDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
