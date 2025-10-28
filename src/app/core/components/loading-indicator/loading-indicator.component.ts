import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  HostBinding,
  inject,
} from '@angular/core'
import { Router, Event, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router'

@Component({
  selector: 'ah-loading-indicator',
  styleUrls: ['./loading-indicator.component.css'],
  template: `
    <ah-spinner [active]="spinner" />
    @if (message) {
      <div class="message">{{ message }}</div>
    }
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class LoadingIndicatorComponent {
  protected message: string
  private _timeout: ReturnType<typeof setTimeout>

  @HostBinding('class') private class = 'loading-indicator'
  @HostBinding('class.active') protected active = false
  @HostBinding('class.blur') protected spinner = false

  private router = inject(Router)
  private ref = inject(ChangeDetectorRef)
  private initialNavigation = true

  constructor() {
    this.router.events.subscribe((e: Event) => {
      if (e instanceof NavigationStart) {
        // we already render skeletons on initial navigation
        if (this.initialNavigation) {
          this.initialNavigation = false
          return
        }
        this.activate()
        return
      }

      if (e instanceof NavigationEnd || e instanceof NavigationCancel) {
        this.deactivate()
        return
      }

      if (e instanceof NavigationError) {
        this.halt('An error has occurred, please try reloading the page')
      }
    })
  }

  private activate(message: string = null) {
    this.active = true
    this.spinner = false
    this.message = message
    this.ref.markForCheck()
    this._timeout = setTimeout(() => {
      this.spinner = true
      this.ref.markForCheck()
    }, 1000)
  }

  private deactivate() {
    this.active = false
    this.spinner = false
    this.message = null
    clearTimeout(this._timeout)
    this.ref.markForCheck()
  }

  private halt(message: string = null) {
    this.active = true
    this.spinner = false
    this.message = message
    clearTimeout(this._timeout)
    this.ref.markForCheck()
  }
}
