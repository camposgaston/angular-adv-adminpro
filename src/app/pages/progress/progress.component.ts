import { Component, } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent {

  // progress[0] & progressColors[0] are not used
  public progress = [0, 25, 85, 15, 20, 35, 40];
  public progressColors = ['', 'info', 'primary', 'danger', 'warning', 'dark', 'success'];

  getPorcentual(value: number): string {
    return `${value}%`;
  }

  getColor(color: string) {
    return `bg-${color}`;
  }

}
