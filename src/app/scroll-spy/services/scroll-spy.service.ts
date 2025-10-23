import { Injectable, DOCUMENT, inject } from '@angular/core'
import { Observable, fromEvent, animationFrameScheduler } from 'rxjs'
import { map, debounceTime, throttleTime, startWith } from 'rxjs/operators'

export interface ScrollSpyData {
  windowInnerHeight: number
  windowPageYOffset: number
  bodyScrollHeight: number
}

@Injectable()
export class ScrollSpyService {
  public scroll$: Observable<Event>
  private document = inject(DOCUMENT)

  constructor() {
    this.scroll$ = fromEvent(this.document.defaultView, 'scroll')
  }

  public getScrollData(delay = 100, delayMode?: 'debounce' | 'throttle'): Observable<ScrollSpyData> {
    return this.scroll$.pipe(
      // Emit an initial data so that observers can update their view on page load
      startWith(null),
      delayMode === 'throttle' ? throttleTime(delay, animationFrameScheduler, { trailing: true }) : debounceTime(delay),
      map(() => {
        const { body, defaultView } = this.document
        return {
          windowInnerHeight: defaultView.innerHeight,
          windowPageYOffset: defaultView.scrollY,
          bodyScrollHeight: body.scrollHeight,
        }
      }),
    )
  }
}
