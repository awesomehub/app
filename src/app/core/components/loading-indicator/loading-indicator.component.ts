import { Component, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

@Component({
  selector: 'loading-indicator',
  styleUrls: [ './loading-indicator.component.css' ],
  template: `
    <spinner [active]="spinner"></spinner>
    <div *ngIf="message" class="message">{{message}}</div>
`,
  host: {
    'class': 'loading-indicator',
    '[class.active]': 'active',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingIndicatorComponent {

  public active: boolean = false;
  public spinner: boolean = false;
  public message: string;
  private _timeout;

  constructor(private router: Router, private ref: ChangeDetectorRef) {
    this.router.events.subscribe((e: Event) => {
      if (e instanceof NavigationStart) {
        this.activate();
        return;
      }

      if (e instanceof NavigationEnd || e instanceof NavigationCancel) {
        this.deactivate();
        return;
      }

      if (e instanceof NavigationError) {
        this.halt('An error has occured, please try reloading the page');
      }
    });
  }

  activate(message: string = null) {
    this.active = true;
    this.spinner = false;
    this.message = message;
    this.ref.markForCheck();
    this._timeout = setTimeout(() => {
      this.spinner = true;
      this.ref.markForCheck();
    }, 1000);
  }

  deactivate() {
    this.active = false;
    this.spinner = false;
    this.message = null;
    clearTimeout(this._timeout);
    this.ref.markForCheck();
  }

  halt(message: string = null) {
    this.active = true;
    this.spinner = false;
    this.message = message;
    clearTimeout(this._timeout);
    this.ref.markForCheck();
  }
}
