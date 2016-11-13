import 'rxjs/add/operator/filter';
import { Subscription } from 'rxjs/Subscription';

import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Input, Output,
  OnInit, OnDestroy,
  ElementRef,
  EventEmitter
} from '@angular/core';

import { ScrollSpyService, ScrollSpyData } from '../../services';

@Component({
  selector: 'infinite-scroll',
  template: `
    <a *ngIf="!auto" href="javascript:void(0)" (click)="next.emit()">{{button}}</a>
`,
  host: {
    '[class.infinite-scroll]': '!auto',
    '[hidden]': 'paused'
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfiniteScrollComponent implements OnInit, OnDestroy {

  @Input() auto: boolean = true;
  @Input() distance: number = 40;
  @Input() debounce: number = 100;
  @Input() paused: boolean = false;
  @Input() button: string = 'Load more...';

  @Output() next: EventEmitter<any> = new EventEmitter(false);

  private el: Element;
  private scroll_: Subscription;

  constructor(elRef: ElementRef, private scrollSpy: ScrollSpyService) {
    this.el = elRef.nativeElement;
  }

  ngOnInit() {
    this.scroll_ = this.scrollSpy.getScrollData(this.debounce)
      .filter(d => this.auto && !this.paused)
      .subscribe(data => this.evaluate(data));
  }

  evaluate(data: ScrollSpyData): void {
    let rect = this.el.getBoundingClientRect();
    // The distance between the element and the viewport bottom
    let distance = rect.top - data.windowInnerHeight;
    let diff = distance - this.distance;

    if (diff <= 0) {
      // Emit the event to load extra data
      this.next.emit();
    }
  }

  ngOnDestroy() {
    this.scroll_.unsubscribe();
  }
}
