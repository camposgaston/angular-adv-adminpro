import { Component } from '@angular/core';


@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component {

  public labels = [
    ['Download Sales JAN', 'In-Store Sales', 'Mail-Order Sales'],
    ['Download Sales FEB', 'In-Store Sales', 'Mail-Order Sales'],
    ['Download Sales MARCH', 'In-Store Sales', 'Mail-Order Sales'],
    ['Download Sales APR', 'In-Store Sales', 'Mail-Order Sales']
  ];

  public titles = ['Sales JAN', 'Sales FEB', 'Sales MAR', 'Sales APR'];

  public data = [
    [30, 50, 90],
    [300, 80, 65],
    [150, 60, 200],
    [15, 50, 20]
];
}
