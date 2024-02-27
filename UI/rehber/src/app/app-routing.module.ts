import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RehberListeComponent } from './features/actions/rehber-liste/rehber-liste.component';
import { RehberEkleComponent } from './features/actions/rehber-ekle/rehber-ekle.component';
import { RehberGuncelleComponent } from './features/actions/rehber-guncelle/rehber-guncelle.component';
import { SignUpComponent } from './features/userActions/sign-up/sign-up.component';
import { LoginComponent } from './features/userActions/login/login.component';
import { AdminPanelComponent } from './features/adminActions/admin-panel/admin-panel.component';
import { UserInfoComponent } from './features/userActions/userInfo/user-info/user-info.component';
import { authGuard } from './features/auth/guards/auth.guard';
import { AdminUserUpdateComponent } from './features/adminActions/admin-user-update/admin-user-update.component';
import { AdminRehberUpdateComponent } from './features/adminActions/admin-rehber-update/admin-rehber-update.component';
import { AppLayoutComponent } from './layout/app.layout.component';
const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: '',
        component: LoginComponent,
      },
      {path:'kayit',
      component:SignUpComponent,
    },
    {
      path:'info/:userId',
      component:UserInfoComponent,canActivate: [authGuard],
    },{
      path:'tablo/:userId',
      component:RehberListeComponent,
      canActivate: [authGuard],
    },
    {
      //SIGN UP PAGE
      path: 'userislem/kaydol',
      component: SignUpComponent,
    },
    {
      //LOGIN PAGE
      path: 'userislem/giris',
      component: LoginComponent,
    },
    {
      //USERINFO PAGE
      path: 'userislem/info/:userId',
      component: UserInfoComponent,
      canActivate: [authGuard],
    },
    {
      //ADMIN PAGE
      path: 'admin/islem',
      component: AdminPanelComponent,
      canActivate: [authGuard],
    },
    {
      //ADMIN PAGE
      path: 'admin/islem/guncelle/user/:userId',
      component: AdminUserUpdateComponent,
      canActivate: [authGuard],
    },
    {
      //ADMIN PAGE
      path: 'admin/islem/guncelle/rehber/:id',
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
  // {
  //   path: 'loginn',
  //   component: LoginComponent,
  // },
  // {
  //   //SIGN UP PAGE
  //   path: 'userislem/kaydol',
  //   component: SignUpComponent,
  // },
  // {
  //   //LOGIN PAGE
  //   path: 'userislem/giris',
  //   component: LoginComponent,
  // },
  // {
  //   //USERINFO PAGE
  //   path: 'userislem/info/:userId',
  //   component: UserInfoComponent,
  //   canActivate: [authGuard],
  // },
  // {
  //   //ADMIN PAGE
  //   path: 'admin/islem',
  //   component: AdminPanelComponent,
  //   canActivate: [authGuard],
  // },
  // {
  //   //ADMIN PAGE
  //   path: 'admin/islem/guncelle/user/:userId',
  //   component: AdminUserUpdateComponent,
  //   canActivate: [authGuard],
  // },
  // {
  //   //ADMIN PAGE
  //   path: 'admin/islem/guncelle/rehber/:id',
  //   component: AdminRehberUpdateComponent,
  //   canActivate: [authGuard],
  // },
  // {
  //   //REHBER LISTELE PAGE
  //   path: 'islem/goruntule/:userId',
  //   component: RehberListeComponent,
  //   canActivate: [authGuard],
  // },
  // {
  //   //REHBER GUNCELLE PAGE
  //   path: 'islem/guncelle/:userId/:id',
  //   component: RehberGuncelleComponent,
  //   canActivate: [authGuard],
  // },
  // {
  //   //REHBER EKLE PAGE
  //   path: 'islem/kaydet/:userId',
  //   component: RehberEkleComponent,
  //   canActivate: [authGuard],
  // },
  // {
  //   //REHBER EKLE PAGE
  //   path: 'islem/goruntule/kaydet/:userId',
  //   component: RehberEkleComponent,
  //   canActivate: [authGuard],
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
