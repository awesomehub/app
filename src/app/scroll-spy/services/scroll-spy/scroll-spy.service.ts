import { Injectable } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';
import { map, debounceTime, startWith } from 'rxjs/operators';
import { ScrollSpyData } from './scroll-spy-data.interface';

@Injectable()
export class ScrollSpyService {

  public scroll$: Observable<Event>;

  constructor() {
    this.scroll$ = fromEvent<Event>(window, 'scroll');
  }

  public getScrollData(debounce: number = 100): Observable<ScrollSpyData> {
    return this.scroll$.pipe(
      // Emit an initial data so that observers can update their view on pageload
      startWith(<Event><any>{target: document}),
      debounceTime(debounce),
      map((event: Event) => {
        return this.createScrollData(event.target as HTMLDocument);
      })
    );
  }

  public getScrollDataSnapshot(): ScrollSpyData {
    return this.createScrollData(document);
  }

  private createScrollData(target: HTMLDocument): ScrollSpyData {
    const { body, defaultView } = target;
    return <ScrollSpyData>{
      windowInnerHeight: defaultView.innerHeight,
      windowPageYOffset: defaultView.pageYOffset,
      bodyScrollHeight: body.scrollHeight
    };
  }
}
