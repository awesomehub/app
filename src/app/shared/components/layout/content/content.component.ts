import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Input,
  ContentChildren,
  QueryList, HostBinding
} from '@angular/core';
import { LayoutSidebarComponent } from '../sidebar';

@Component({
  selector: 'ah-content',
  template: `
    <ng-content select="sidebar"></ng-content>
    <div class="content mdl-cell"
      [ngClass]="{
        'mdl-cell--9-col': sidebar.length,
        'mdl-cell--12-col': !sidebar.length,
        'mdl-color--white mdl-shadow--4dp': !transparent || transparent === 'false'
      }">
      <ng-content></ng-content>
    </div>
`,
  styleUrls: [ 'content.component.css' ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutContentComponent {
  @Input('transparent') public transparent: any = false;
  @Input('layout') public layout: string;
  @ContentChildren(LayoutSidebarComponent) public sidebar: QueryList<LayoutSidebarComponent>;

  @HostBinding('class') private class = 'content-wrapper mdl-grid';
  @HostBinding('class.with-sidebar') get isWithSidebar() { return this.sidebar.length; };
  @HostBinding('class.layout-compact') get isCompact() { return this.layout === "compact"; };
}
