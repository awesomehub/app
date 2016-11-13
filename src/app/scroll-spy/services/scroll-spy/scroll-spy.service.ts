import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { Injectable } from '@angular/core';

import { ScrollSpyData } from './scroll-spy-data.interface';

@Injectable()
export class ScrollSpyService {

  public scroll$: Observable<Event>;

  constructor() {
    this.scroll$ = Observable.fromEvent<Event>(window, 'scroll');
  }

  public getScrollData(debounce: number = 100): Observable<ScrollSpyData> {
    return this.scroll$
      // Emit an initial data so that observers can update their view on pageload
      .startWith(<Event><any>{target: document})
      .debounceTime(debounce)
      .map((event: Event) => {
        return this.createScrollData(event.target as HTMLDocument);
      });
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
