import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilterComponent } from './filter.component';

const routes: Routes = [
  {
    path: '',
    component: FilterComponent,
  },
  {
    path: 'homme',
    loadChildren: () => import('./homme/homme.module').then( m => m.HommeModule)
  },
  {
    path: 'femme',
    loadChildren: () => import('./femme/femme.module').then( m => m.FemmeModule)
  },
  {
    path: 'choisir-note',
    loadChildren: () => import('./choisir-note/choisir-note.module').then( m => m.ChoisirNoteModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FilterRoutingModule { }
