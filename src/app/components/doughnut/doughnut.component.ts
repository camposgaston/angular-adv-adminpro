import { Component, Input } from '@angular/core';

import { MultiDataSet, Label, Color } from 'ng2-charts';


@Component({
  selector: 'app-doughnut',
  templateUrl: './doughnut.component.html',
  styles: [
  ]
})
export class DoughnutComponent {

  @Input() title = 'No Title';
  // tslint:disable-next-line: no-input-rename
  @Input('label') doughnutChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  // tslint:disable-next-line: no-input-rename
  @Input('data') doughnutChartData: MultiDataSet = [[0, 0, 0]];

  //  public doughnutChartType: ChartType = 'doughnut';
  public colors: Color[] = [
    { backgroundColor: ['#6857E6', '#009FEE', '#F02059'] }
  ];
}
