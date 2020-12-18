import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { P404Component } from './p404/p404.component';
import { ContactComponent } from './contact/contact.component';
import { SuccessfulComponent } from './successful/successful.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
    pathMatch:'full'
  },
  {
    path: 'home',
    component: HomepageComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
     path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
   component: RegisterComponent
 },
  {
    path: 'contact',
   component: ContactComponent
 },
 {
  path: 'success',
 component: SuccessfulComponent
},
{
  path: 'dashboard/:email',
 component: DashboardComponent
},
   {
    path: '**',
   component: P404Component
 }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
