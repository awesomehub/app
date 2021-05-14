import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'momentFormat'
})
export class MomentFormatPipe implements PipeTransform {
  transform(date: Date | moment.Moment | string | number, type: string = 'fromNow'): string {
    if (typeof date == 'number') {
      date = date*1000;
    }

    let m = moment(date);
    switch (type) {
      default:
      case 'fromNow':
        return m.fromNow();
    }
  }
}