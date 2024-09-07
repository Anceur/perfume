import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FemmeComponent } from './femme.component';

const routes: Routes = [
  {
    path: '',
    component: FemmeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FemmeRoutingModule { }
