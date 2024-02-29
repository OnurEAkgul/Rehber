import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { RehberListeComponent } from './features/actions/rehber-liste/rehber-liste.component';
import { RehberEkleComponent } from './features/actions/rehber-ekle/rehber-ekle.component';
import { RehberGuncelleComponent } from './features/actions/rehber-guncelle/rehber-guncelle.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './features/userActions/login/login.component';
import { SignUpComponent } from './features/userActions/sign-up/sign-up.component';
import { AdminPanelComponent } from './features/adminActions/admin-rehber-table/admin-panel.component';
import { UserInfoComponent } from './features/userActions/userInfo/user-info/user-info.component';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { AdminUserUpdateComponent } from './features/adminActions/admin-user-update/admin-user-update.component';
import { AdminRehberUpdateComponent } from './features/adminActions/admin-rehber-update/admin-rehber-update.component';
import { MenubarModule } from 'primeng/menubar';
import { TableModule } from 'primeng/table';
import { AppLayoutModule } from './layout/app.layout.module';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { AdminUsersPanelComponent } from './features/adminActions/admin-users-panel/admin-users-panel.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RehberListeComponent,
    RehberEkleComponent,
    RehberGuncelleComponent,
    LoginComponent,
    SignUpComponent,
    AdminPanelComponent,
    UserInfoComponent,
    AdminUserUpdateComponent,
    AdminRehberUpdateComponent,
    AdminUsersPanelComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MenubarModule,
    TableModule,
    AppLayoutModule,
    InputTextModule,
    InputMaskModule,
    RadioButtonModule,
    CheckboxModule,
    ButtonModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
