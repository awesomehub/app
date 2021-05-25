import { Component, Input, ViewEncapsulation, ChangeDetectionStrategy, HostBinding } from '@angular/core';
import { ListSummary } from '@app/lists';

@Component({
  selector: 'ah-list-card',
  styleUrls: [ 'list-card.component.css' ],
  template: `
      <div class="mdl-card__supporting-text">
          <h4><a [routerLink]="['/list', list.id]">{{list.name}}</a></h4>
          {{list.desc}}
      </div>
      <div class="mdl-card__actions mdl-card--border">
          <a class="meta" title="Total entries">
            <i class="icon icon-repo"></i> {{list.entries | number}}
          </a>
          <a class="meta" title="Average score">
              <i class="icon icon-flame"></i> {{list.score | ahScoreFormat}}
          </a>
          <a class="meta" title="Last updated">
              <i class="icon icon-pulse"></i> Updated {{list.updated | ahDateFormat}}
          </a>
      </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListCardComponent {
  @HostBinding('class') private class = 'list-card mdl-card';
  @Input() public list: ListSummary;
}
