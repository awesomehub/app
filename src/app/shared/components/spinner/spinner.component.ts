import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input } from '@angular/core';

@Component({
  selector: 'spinner',
  template: `<div class="mdl-spinner mdl-js-spinner" [class.is-active]="active"></div>`,
  host: {
    'class': 'spinner',
    '[style.display]': '!active ? "none" : null',
  },
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
}
