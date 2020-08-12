import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-progress-bar-increase',
  templateUrl: './progress-bar-increase.component.html',
  styles: [
  ]
})
export class ProgressBarIncreaseComponent {

  // renaming progress value in parent component as 'value'
  // tslint:disable-next-line: no-input-rename
  @Input('value') progress = 50;
  // renaming value received from user as 'value'
  // tslint:disable-next-line: no-output-rename
  @Output('value') valueFromUser: EventEmitter<number> = new EventEmitter();

  changeValue(value: number): any {
    if (this.progress >= 100 && value >= 0) {
      this.valueFromUser.emit(100);
      return this.progress = 100;
    }
    if (this.progress <= 0 && value < 0) {
      this.valueFromUser.emit(0);
      return this.progress = 0;
    }

    this.progress = this.progress + value;
    this.valueFromUser.emit(this.progress);
  }
}
