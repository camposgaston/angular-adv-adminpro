import { Component } from '@angular/core';

@Component({
  selector: 'app-progress-bar-increase',
  templateUrl: './progress-bar-increase.component.html',
  styles: [
  ]
})
export class ProgressBarIncreaseComponent  {

  public progress = 50;

  get getPercentage(): string {
    return `${this.progress}%`;
  }

  changeValue(value: number): any {
    if (this.progress >= 100 && value >= 0) {
      return this.progress = 100;
    }
    if (this.progress <= 0 && value < 0) {
      return this.progress = 0;
    }

    this.progress = this.progress + value;
  }
}
