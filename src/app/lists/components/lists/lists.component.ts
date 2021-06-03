import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Input, Output,
  EventEmitter, HostBinding
} from '@angular/core';
import { Recordset } from '@app/recordsets';
import { ListSummary } from '@app/lists';

@Component({
  selector: 'ah-lists',
  styleUrls: [ 'lists.component.css' ],
  template: `
      <ah-list-card
              *ngFor="let list of recordset.slice; trackBy: trackByLists"
              class="mdl-cell mdl-cell--12-col mdl-cell--6-col-desktop mdl-shadow--2dp"
              [list]="list">
      </ah-list-card>

      <div *ngIf="recordset.set.length === 0 && recordset.updated" class="mdl-cell mdl-cell--12-col no-lists">
          No lists found!
      </div>

      <ah-spinner class="mdl-cell mdl-cell--12-col" [active]="!recordset.updated"></ah-spinner>
      <ah-infinite-scroll
              class="mdl-cell mdl-cell--12-col"
              [paused]="!recordset.pagination.hasNext || !recordset.updated"
              (next)="needMore.emit()">
      </ah-infinite-scroll>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListsComponent {
  @HostBinding('class') private class = 'list-collection mdl-grid';

  @Input() recordset: Recordset<ListSummary>;
  @Output() needMore: EventEmitter<any> = new EventEmitter(false);

  trackByLists(i: number, list: ListSummary) {
    return list.id;
  }
}
