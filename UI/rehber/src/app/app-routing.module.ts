import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RehberListeComponent } from './features/actions/rehber-liste/rehber-liste.component';
import { RehberEkleComponent } from './features/actions/rehber-ekle/rehber-ekle.component';
import { RehberGuncelleComponent } from './features/actions/rehber-guncelle/rehber-guncelle.component';
import { SignUpComponent } from './features/userActions/sign-up/sign-up.component';
import { LoginComponent } from './features/userActions/login/login.component';
import { AdminPanelComponent } from './features/adminActions/admin-panel/admin-panel.component';
import { UserInfoComponent } from './features/userActions/userInfo/user-info/user-info.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },

  // userislem/kaydol
  // userislem/giris
  // userislem/info
  //admin/islem

  {
    path: 'userislem/kaydol',
    component: SignUpComponent,
  },
  {
    path: 'userislem/info',
    component: UserInfoComponent,
  },
  {
    path: 'userislem/info/:id',
    component: UserInfoComponent,
  },
  {
    path: 'admin/islem',
    component: AdminPanelComponent,
  },
  {
    path: 'userislem/giris',
    component: LoginComponent,
  },
  {
    path: 'islem/goruntule',
    component: RehberListeComponent,
  },
  {
    path: 'islem/goruntule/:id',
    component: RehberListeComponent,
  },
  {
    path: 'islem/goruntule/kaydet/:id',
    component: RehberEkleComponent,
  },
  {
    path: 'islem/kaydet',
    component: RehberEkleComponent,
  },
  {
    path: 'islem/kaydet/:id',
    component: RehberEkleComponent,
  },
  {
    path: 'islem/guncelle/:id',
    component: RehberGuncelleComponent,
  },
  {
    path: 'islem/guncelle/:userId/:id',
    component: RehberGuncelleComponent,
  },
  {
    path: 'islem/guncelle',
    component: RehberGuncelleComponent,
  },
  {
    path: 'islem/goruntule/kaydet',
    component: RehberEkleComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
