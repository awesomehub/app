import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input } from '@angular/core';

@Component({
  selector: 'sidebar',
  template: `<ng-content></ng-content>`,
  host: {
    'class': 'sidebar mdl-cell mdl-cell--3-col',
    '[class.mdl-color--white]': '!transparent || transparent == "false"',
    '[class.mdl-shadow--4dp]': '!transparent || transparent == "false"'
  },
  styles: [`
    .sidebar {
      border-radius: 2px;
      padding: 20px;
    }
`],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutSidebarComponent {
  @Input('transparent') public transparent: any = false;
}
