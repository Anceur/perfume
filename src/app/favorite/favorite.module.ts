import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavoriteRoutingModule } from './favorite-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FavoriteComponent } from './favorite.component';


@NgModule({
  declarations: [FavoriteComponent],
  imports: [
    CommonModule,
    FavoriteRoutingModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule
  ]
})
export class FavoriteModule { }
