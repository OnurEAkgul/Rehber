import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { RehberListeComponent } from './features/actions/rehber-liste/rehber-liste.component';
import { RehberEkleComponent } from './features/actions/rehber-ekle/rehber-ekle.component';
import { RehberGuncelleComponent } from './features/actions/rehber-guncelle/rehber-guncelle.component';
import { RehberSilComponent } from './features/actions/rehber-sil/rehber-sil.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './features/userActions/login/login.component';
import { SignUpComponent } from './features/userActions/sign-up/sign-up.component';
import { AdminPanelComponent } from './features/adminActions/admin-panel/admin-panel.component';
import { UserInfoComponent } from './features/userActions/userInfo/user-info/user-info.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RehberListeComponent,
    RehberEkleComponent,
    RehberGuncelleComponent,
    RehberSilComponent,
    LoginComponent,
    SignUpComponent,
    AdminPanelComponent,
    UserInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
