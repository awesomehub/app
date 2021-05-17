import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Observable, fromEvent } from 'rxjs';
import { map, debounceTime, startWith } from 'rxjs/operators';

export interface ScrollSpyData {
  windowInnerHeight: number;
  windowPageYOffset: number;
  bodyScrollHeight: number;
}

@Injectable()
export class ScrollSpyService {
  public scroll$: Observable<Event>;

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.scroll$ = fromEvent(document.defaultView, 'scroll');
  }

  public getScrollData(debounce: number = 100): Observable<ScrollSpyData> {
    return this.scroll$.pipe(
      // Emit an initial data so that observers can update their view on pageload
      startWith(<Event><any>{ target: this.document }),
      debounceTime(debounce),
      map(event => {
        const { body, defaultView } = event.target as Document;
        return {
          windowInnerHeight: defaultView.innerHeight,
          windowPageYOffset: defaultView.pageYOffset,
          bodyScrollHeight: body.scrollHeight
        };
      })
    );
  }
}
