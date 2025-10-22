import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Input,
  Output,
  OnInit,
  OnDestroy,
  ElementRef,
  EventEmitter,
  HostBinding,
  inject,
} from '@angular/core'
import { Subscription } from 'rxjs'
import { filter } from 'rxjs/operators'
import { ScrollSpyService, ScrollSpyData } from '../../services'

@Component({
  selector: 'ah-infinite-scroll',
  styleUrls: ['infinite-scroll.component.css'],
  template: `
    @if (disabled) {
      <a href="javascript:void(0)" (click)="next.emit()">{{ button }}</a>
    }
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class InfiniteScrollComponent implements OnInit, OnDestroy {
  @HostBinding('class') private class = 'infinite-scroll mdl-card'

  @Input() @HostBinding('class.disabled') disabled = false
  @Input() distance = 500
  @Input() debounce = 100
  @Input() @HostBinding('hidden') paused = false
  @Input() button = 'Load more...'

  @Output() next = new EventEmitter<any>(false)

  private el: Element
  private scroll_: Subscription

  private scrollSpy = inject(ScrollSpyService)
  private elRef = inject(ElementRef)

  constructor() {
    this.el = this.elRef.nativeElement
  }

  ngOnInit() {
    this.scroll_ = this.scrollSpy
      .getScrollData(this.debounce)
      .pipe(filter((d) => !this.disabled && !this.paused))
      .subscribe((data) => this.evaluate(data))
  }

  evaluate(data: ScrollSpyData): void {
    const rect = this.el.getBoundingClientRect()
    // The distance between the element and the viewport bottom
    const distance = rect.top - data.windowInnerHeight - rect.height
    const diff = distance - this.distance

    if (diff <= 0) {
      // Emit the event to load extra data
      this.next.emit()
    }
  }

  ngOnDestroy() {
    this.scroll_.unsubscribe()
  }
}
