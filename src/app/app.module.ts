import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PropertyCardComponent } from './components/property-card/property-card.component';
import { HeaderComponent } from './components/header/header.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { MainComponent } from './components/main/main.component';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CardsListComponent } from './components/cards-list/cards-list.component';
import { ProperyPageComponent } from './components/propery-page/propery-page.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminPropertiesComponent } from './pages/admin-properties/admin-properties.component';
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';
import { PropertyCardAdminComponent } from './components/property-card-admin/property-card-admin.component';
import { EditionWindowComponent } from './components/edition-window/edition-window.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    PropertyCardComponent,
    HeaderComponent,
    TopBarComponent,
    MainComponent,
    CardsListComponent,
    ProperyPageComponent,
    LoginComponent,
    AdminPropertiesComponent,
    PropertyCardAdminComponent,
    EditionWindowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
        JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
