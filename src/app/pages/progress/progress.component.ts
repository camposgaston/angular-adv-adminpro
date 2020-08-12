import { Component, } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent {

  // progress[0] is not used
  public progress = [0, 25, 85];
  getPorcentual(value: number): string {
    return `${value}%`;
  }

}
