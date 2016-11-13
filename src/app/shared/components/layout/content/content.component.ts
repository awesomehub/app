import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Input,
  ContentChildren,
  QueryList
} from '@angular/core';

import { LayoutSidebarComponent } from '../sidebar';

@Component({
  selector: 'content',
  template: `
    <ng-content select="sidebar"></ng-content>
    <div class="content mdl-cell"
      [ngClass]="{
        'mdl-cell--9-col': sidebar.length,
        'mdl-cell--12-col': !sidebar.length,
        'mdl-color--white mdl-shadow--4dp': !transparent || transparent == 'false'
      }">
      <ng-content></ng-content>
    </div>
`,
  styleUrls: [ 'content.component.css' ],
  host: {
    'class': 'content-wrapper mdl-grid',
    '[class.with-sidebar]': 'sidebar.length',
    '[class.layout-compact]': 'layout === "compact"'
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutContentComponent {
  @Input('transparent') public transparent: any = false;
  @Input('layout') public layout: string;
  @ContentChildren(LayoutSidebarComponent) public sidebar: QueryList<LayoutSidebarComponent>;
}
