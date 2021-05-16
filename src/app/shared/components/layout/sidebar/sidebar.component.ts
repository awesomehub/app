import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'ah-sidebar',
  template: `<ng-content></ng-content>`,
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
  @Input('transparent') public transparent: boolean|string = false;

  @HostBinding('class') get class() {
    return 'sidebar mdl-cell mdl-cell--3-col' + (
      !this.transparent || this.transparent === "false"
        ? ' mdl-color--white mdl-shadow--4dp'
        : ''
    );
  };
}
