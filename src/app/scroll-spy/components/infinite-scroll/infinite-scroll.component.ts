import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Input, Output,
  OnInit, OnDestroy,
  ElementRef,
  EventEmitter, HostBinding
} from '@angular/core';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ScrollSpyService, ScrollSpyData } from '../../services';

@Component({
  selector: 'ah-infinite-scroll',
  template: `
    <a *ngIf="!auto" href="javascript:void(0)" (click)="next.emit()">{{button}}</a>
`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfiniteScrollComponent implements OnInit, OnDestroy {
  @Input() auto = true;
  @Input() distance = 40;
  @Input() debounce = 100;
  @Input() @HostBinding('hidden') paused = false;
  @Input() button = 'Load more...';

  @Output() next: EventEmitter<any> = new EventEmitter(false);

  @HostBinding('class.infinite-scroll') get classActive() { return !this.auto; };

  private el: Element;
  private scroll_: Subscription;

  constructor(elRef: ElementRef, private scrollSpy: ScrollSpyService) {
    this.el = elRef.nativeElement;
  }

  ngOnInit() {
    this.scroll_ = this.scrollSpy.getScrollData(this.debounce)
      .pipe(filter(d => this.auto && !this.paused))
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
