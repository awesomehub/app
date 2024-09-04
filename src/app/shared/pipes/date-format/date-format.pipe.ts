import { Pipe, PipeTransform } from '@angular/core'
import { formatDistanceToNowStrict, fromUnixTime } from 'date-fns'

@Pipe({
  name: 'ahDateFormat',
})
export class DateFormatPipe implements PipeTransform {
  transform(date: Date | string | number, format = 'distance'): string {
    if (typeof date === 'number') {
      // Convert from Unix timestamp (in seconds)
      date = fromUnixTime(date)
    }

    return formatDistanceToNowStrict(date, { addSuffix: true })
  }
}
