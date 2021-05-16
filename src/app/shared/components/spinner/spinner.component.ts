import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'ah-spinner',
  template: `<div class="mdl-spinner mdl-js-spinner is-active"></div>`,
  styles: [`
    .spinner {
      text-align: center;
    }
`],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpinnerComponent {
  @Input() public active: boolean = false;

  @HostBinding('class') private class = 'spinner';
  @HostBinding('style.display') get displayStyle() { return !this.active ? "none" : null; };
}
