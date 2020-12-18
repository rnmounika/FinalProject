import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { HeroComponent } from './hero/hero.component';
import { FooterComponent } from './footer/footer.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ArticleComponent } from './article/article.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { P404Component } from './p404/p404.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { ContactComponent } from './contact/contact.component';
import { DataService } from './data.service';
import { GlobalStorageService } from './global-storage.service';
import { SuccessfulComponent } from './successful/successful.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LogoutComponent } from './logout/logout.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HeroComponent,
    FooterComponent,
    HomepageComponent,
    ArticleComponent,
    AboutComponent,
    LoginComponent,
    P404Component,
    BreadcrumbsComponent,
    ContactComponent,
    SuccessfulComponent,
    RegisterComponent,
    DashboardComponent,
    LogoutComponent
  ],
  entryComponents: [
    LoginComponent,
    RegisterComponent,
   DashboardComponent,
   LogoutComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
        ReactiveFormsModule,

      ],
  providers: [
    DataService,
    GlobalStorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
