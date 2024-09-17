import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MtpsoublieRoutingModule } from './mtpsoublie-routing.module';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MtpsoublieComponent } from './mtpsoublie.component';


@NgModule({
  declarations: [MtpsoublieComponent],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule,
    MtpsoublieRoutingModule,
  
  ]
})
export class MtpsoublieModule { }
