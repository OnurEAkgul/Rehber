import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RehberListeComponent } from './features/actions/rehber-liste/rehber-liste.component';
import { RehberEkleComponent } from './features/actions/rehber-ekle/rehber-ekle.component';
import { RehberGuncelleComponent } from './features/actions/rehber-guncelle/rehber-guncelle.component';
import { RehberSilComponent } from './features/actions/rehber-sil/rehber-sil.component';

const routes: Routes = [

  {
    path:'',
    component:RehberListeComponent
  },
  {
    path:'islem/goruntule',
    component:RehberListeComponent
  },
  {
    path:'islem/kaydet',
    component:RehberEkleComponent
  },
  {
    path:'islem/guncelle',
    component:RehberGuncelleComponent
  },
  {
    path:'islem/sil',
    component:RehberSilComponent
  },
  {
    path:'islem/goruntule/kaydet',
    component:RehberEkleComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }