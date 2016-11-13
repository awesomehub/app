import { Component, Input, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

import { ListSummary } from '../../state';

@Component({
  selector: 'list-card',
  styleUrls: [ './list-card.component.css' ],
  template: `
    <div class="mdl-card__supporting-text">
      <h4><a [routerLink]="['/list', list.id]">{{list.name}}</a></h4>
      {{list.desc}}
    </div>
    <div class="mdl-card__actions mdl-card--border">
      <a class="meta" title="Score">
        <i class="icon icon-flame"></i> {{list.score | number}}
      </a>
      <a class="meta" title="Entries Count">
        <i class="icon icon-repo"></i> {{list.entries | number}}
      </a>
      <a class="meta" title="Last Updated">
        <i class="icon icon-pulse"></i> Updated {{list.updated | momentFormat}}
      </a>
    </div>
`,
  host: {
    'class': 'list-card mdl-card'
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListCardComponent {
  @Input() public list: ListSummary;
}
