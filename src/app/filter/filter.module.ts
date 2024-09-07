import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilterRoutingModule } from './filter-routing.module';
import { FilterComponent } from './filter.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HommeComponent } from './homme/homme.component';
import { FemmeComponent } from './femme/femme.component';
import { ChoisirNoteComponent } from './choisir-note/choisir-note.component';



@NgModule({
  declarations: [
    FilterComponent,
    HommeComponent,
    FemmeComponent,
    ChoisirNoteComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FilterRoutingModule,
    ReactiveFormsModule
  ]
})
export class FilterModule { }
