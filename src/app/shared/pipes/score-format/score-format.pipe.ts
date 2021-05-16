import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ahScoreFormat'
})
export class ScoreFormatPipe implements PipeTransform {
  transform(score: string | number): string {
    if (typeof score === 'string') {
      score = parseInt(score)
    }

    return (score < 1e3 || score <= 0)
      ? String(score)
      : +(score / 1e3).toFixed(1) + "K"
  }
}