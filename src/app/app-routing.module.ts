import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './components/search/search.component';
import { SearchDetComponent } from './components/search-det/search-det.component';
import { EditSearchComponent } from './components/edit-search/edit-search.component';
import { SignupComponent } from './components/signup/signup.component';
import { ForgotpassComponent } from './components/forgotpass/forgotpass.component';
import { ResetTokenComponent } from './components/reset-token/reset-token.component';
import { LoginBComponent } from './components/login-b/login-b.component';
import { ValidateregisrationComponent } from './components/validateregistration/validateregisration.component';

const routes: Routes = [
  {path:'',component:LoginBComponent},
  {path:'search',component:SearchComponent}, 
  {path:'list', component:SearchDetComponent},
  {path:'update',component:EditSearchComponent},
  {path:'Add', component:EditSearchComponent},
  {path:'Sign', component:SignupComponent},
  {path:'Forgot', component:ForgotpassComponent},
  {path:'password-reset', component:ResetTokenComponent},
  {path:'first-time-token', component:ValidateregisrationComponent},

 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const RouteComponents = [LoginBComponent,SearchComponent,SearchDetComponent,EditSearchComponent,SignupComponent];
