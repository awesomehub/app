import { Injectable, DOCUMENT, inject } from '@angular/core'
import { Observable, fromEvent } from 'rxjs'
import { map, debounceTime, startWith } from 'rxjs/operators'

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

  public getScrollData(debounce = 100): Observable<ScrollSpyData> {
    return this.scroll$.pipe(
      // Emit an initial data so that observers can update their view on pageload
      startWith({ target: this.document } as any as Event),
      debounceTime(debounce),
      map((event) => {
        const { body, defaultView } = event.target as Document
        return {
          windowInnerHeight: defaultView.innerHeight,
          windowPageYOffset: defaultView.scrollY,
          bodyScrollHeight: body.scrollHeight,
        }
      }),
    )
  }
}
