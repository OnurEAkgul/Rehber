import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RehberListeComponent } from './features/actions/rehber-liste/rehber-liste.component';
import { RehberEkleComponent } from './features/actions/rehber-ekle/rehber-ekle.component';
import { RehberGuncelleComponent } from './features/actions/rehber-guncelle/rehber-guncelle.component';
import { SignUpComponent } from './features/userActions/sign-up/sign-up.component';
import { LoginComponent } from './features/userActions/login/login.component';
import { AdminPanelComponent } from './features/adminActions/admin-rehber-table/admin-panel.component';
import { UserInfoComponent } from './features/userActions/userInfo/user-info/user-info.component';
import { authGuard } from './features/auth/guards/auth.guard';
import { AdminUserUpdateComponent } from './features/adminActions/admin-user-update/admin-user-update.component';
import { AdminRehberUpdateComponent } from './features/adminActions/admin-rehber-update/admin-rehber-update.component';
import { AppLayoutComponent } from './layout/app.layout.component';
import { AdminUsersPanelComponent } from './features/adminActions/admin-users-panel/admin-users-panel.component';
const routes: Routes = [
  {
    //LAYOUT COMPONENT
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        //LOGIN PAGE
        path: '',
        component: LoginComponent,
      },
      {
        //LOGIN PAGE
        path: 'userislem/giris',
        component: LoginComponent,
      },
      {
        //SIGN UP PAGE
        path: 'userislem/kaydol',
        component: SignUpComponent,
      },
      { 
         //SIGN UP PAGE
        path: 'kayit',
        component: SignUpComponent 
      },
      {
        //USERINFO PAGE
        path: 'info/:userId',
        component: UserInfoComponent,
        canActivate: [authGuard],
      },
      {
        //REHBER LISTELE PAGE
        path: 'tablo/:userId',
        component: RehberListeComponent,
        canActivate: [authGuard],
      },
      {
        //USERINFO PAGE
        path: 'userislem/info/:userId',
        component: UserInfoComponent,
        canActivate: [authGuard],
      },
      {
        //ADMIN PAGE
        path: 'admin/user',
        component: AdminUsersPanelComponent,
        canActivate: [authGuard],
      },
      {
        //ADMIN PAGE
        path: 'admin/rehber',
        component: AdminPanelComponent,
        canActivate: [authGuard],
      },
      {
        //ADMIN PAGE
        path: 'admin/user/guncelle/user/:userId',
        component: AdminUserUpdateComponent,
        canActivate: [authGuard],
      },
      {
        //ADMIN PAGE
        path: 'admin/rehber/guncelle/rehber/:userId/:id',
        component: AdminRehberUpdateComponent,
        canActivate: [authGuard],
      },
      {
        //REHBER LISTELE PAGE
        path: 'islem/goruntule/:userId',
        component: RehberListeComponent,
        canActivate: [authGuard],
      },
      {
        //REHBER GUNCELLE PAGE
        path: 'islem/guncelle/:userId/:id',
        component: RehberGuncelleComponent,
        canActivate: [authGuard],
      },
      {
        //REHBER EKLE PAGE
        path: 'islem/kaydet/:userId',
        component: RehberEkleComponent,
        canActivate: [authGuard],
      },
      {
        //REHBER EKLE PAGE
        path: 'islem/goruntule/kaydet/:userId',
        component: RehberEkleComponent,
        canActivate: [authGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
