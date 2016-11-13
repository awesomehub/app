import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Input, Output,
  EventEmitter
} from '@angular/core';

import { Recordset } from '../../../recordsets';
import { ListSummary } from '../../state';

@Component({
  selector: 'lists',
  styleUrls: [ 'lists.component.css' ],
  template: `    
    <list-card
      *ngFor="let list of recordset.slice; trackBy: trackByLists"
      class="mdl-cell mdl-cell--12-col mdl-cell--6-col-desktop mdl-shadow--2dp"
      [list]="list">  
    </list-card>

    <div *ngIf="recordset.set.length == 0 && recordset.updated" class="mdl-cell mdl-cell--12-col no-lists">
      <i class="icon icon-frown-o"></i> Nothing found!
    </div>

    <spinner class="mdl-cell mdl-cell--12-col" [active]="!recordset.updated"></spinner>
    <infinite-scroll
      class="mdl-cell mdl-cell--12-col"
      [distance]="80"
      [debounce]="50"
      [paused]="!recordset.pagination.hasNext || !recordset.updated"
      (next)="needMore.emit()">  
    </infinite-scroll>
`,
  host: {
    'class': 'list-collection mdl-grid'
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListsComponent {
  @Input() recordset: Recordset<ListSummary>;
  @Output() needMore: EventEmitter<any> = new EventEmitter(false);

  trackByLists(i: number, list: ListSummary) {
    return list.id;
  }
}
