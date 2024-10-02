import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoriteComponent } from './favorite.component';

const routes: Routes = [
  {
    path: '',
    component: FavoriteComponent,
  },
  {
    path: 'chaque-produi',
    loadChildren: () => import('src/app/tab1/chaque-produi/chaque-produi.module').then( m => m.ChaqueProduiPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FavoriteRoutingModule { }
