import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChoisirNoteComponent } from './choisir-note.component';

const routes: Routes = [
  {
    path: '',
    component: ChoisirNoteComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChoisirNoteRoutingModule { }
