import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  HostBinding,
} from '@angular/core'
import type { Recordset } from '@app/recordsets'
import type { ListSummary } from '../../state'

@Component({
  selector: 'ah-lists',
  styleUrls: ['lists.component.css'],
  template: `
    @for (list of recordset.slice; track trackByLists($index, list)) {
      <ah-list-card class="mdl-cell mdl-cell--12-col mdl-cell--6-col-desktop mdl-shadow--2dp" [list]="list" />
    }

    @if (recordset.set.length === 0 && recordset.updated) {
      <div class="mdl-cell mdl-cell--12-col no-lists">No lists found!</div>
    }

    <ah-spinner class="mdl-cell mdl-cell--12-col" [active]="!recordset.updated" />
    <ah-infinite-scroll
      class="mdl-cell mdl-cell--12-col"
      [paused]="!recordset.pagination.hasNext || !recordset.updated"
      (next)="needMore.emit()"
    />
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ListsComponent {
  @HostBinding('class') private class = 'list-collection mdl-grid'

  @Input() recordset: Recordset<ListSummary>
  @Output() needMore = new EventEmitter<any>(false)

  trackByLists(_i: number, list: ListSummary) {
    return list.id
  }
}
