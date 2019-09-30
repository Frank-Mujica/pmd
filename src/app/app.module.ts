import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CarouselComponent } from './inicio/carousel/carousel.component';
import { NosotrosComponent } from './inicio/nosotros/nosotros.component';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardComponentPM } from './dashboard/dashboardpm.component';

const routes: Routes = [
  {path: 'inicio', component: InicioComponent},
  {path: '', redirectTo: 'inicio', pathMatch: 'full'},
  {path: 'inicio/carousel', component: CarouselComponent},
  {path: 'inicio/nosotros', component: NosotrosComponent},
  {path: 'inicio/contacto', component: FooterComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'dashboardpm', component: DashboardComponentPM},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    InicioComponent,
    CarouselComponent,
    NosotrosComponent,
    DashboardComponent,
    DashboardComponentPM,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
