import { Component, } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent {

  public progress1 = 25;
  public progress2 = 35;

  getPorcentual(value: number): string {
    return `${value}%`;
  }

}
