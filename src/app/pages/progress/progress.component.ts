import { Component, } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent {

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
