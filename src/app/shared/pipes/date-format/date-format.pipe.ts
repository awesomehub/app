import { Pipe, PipeTransform } from '@angular/core';
import { formatDistanceToNowStrict } from 'date-fns'

@Pipe({
  name: 'ahDateFormat'
})
export class DateFormatPipe implements PipeTransform {
  transform(date: Date | string | number, format: string = 'distance'): string {
    if (typeof date === 'number') {
      // Convert to from seconds to milliseconds
      date = date*1000;
    }

    return formatDistanceToNowStrict(new Date(date), { addSuffix: true })
  }
}