import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuoyDetailsComponent } from './components/buoy-details/buoy-details.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { RegisterpageComponent } from './registerpage/registerpage.component';

const routes: Routes = [
  { path: 'buoy', component: BuoyDetailsComponent },
  {
    path: 'login',
    component: LoginpageComponent
  },
  {
    path: 'register',
    component: RegisterpageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
