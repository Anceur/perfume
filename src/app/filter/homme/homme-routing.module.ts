import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HommeComponent } from './homme.component';

const routes: Routes = [
  {
    path: '',
    component: HommeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HommeRoutingModule { }
