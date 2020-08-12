import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { ProgressBarIncreaseComponent } from './progress-bar-increase/progress-bar-increase.component';



@NgModule({
  declarations: [ProgressBarIncreaseComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [ProgressBarIncreaseComponent]
})
export class ComponentsModule { }
