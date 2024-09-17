import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MtpsoublieComponent } from './mtpsoublie.component';

const routes: Routes = [
  {
    path: '',
    component: MtpsoublieComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MtpsoublieRoutingModule { }
