import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { IonicModule } from '@ionic/angular';
import { SearchComponent } from './search.component';


@NgModule({
  declarations: [SearchComponent],
  imports: [
    CommonModule,
    SearchRoutingModule,
    IonicModule,
  ]
})
export class SearchModule { }
