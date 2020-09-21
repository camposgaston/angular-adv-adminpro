import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';

import { ProgressBarIncreaseComponent } from './progress-bar-increase/progress-bar-increase.component';
import { DoughnutComponent } from './doughnut/doughnut.component';
import { ModalImageComponent } from './modal-image/modal-image.component';



@NgModule({
  declarations: [ProgressBarIncreaseComponent, DoughnutComponent, ModalImageComponent],
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule
  ],
  exports: [ProgressBarIncreaseComponent, DoughnutComponent, ModalImageComponent]
})
export class ComponentsModule { }
