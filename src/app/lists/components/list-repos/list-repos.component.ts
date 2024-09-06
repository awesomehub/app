import {
  Component,
  AfterViewInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  Renderer2,
  HostBinding,
} from '@angular/core'
import { Recordset, RecordsetSorting } from '@app/recordsets'
import { ListRepo } from '@app/lists'

@Component({
  selector: 'ah-list-repos',
  styleUrls: ['list-repos.component.css'],
  template: `
    <h3 *ngIf="heading" class="content-heading">
      {{ heading }}
      <span *ngIf="count">({{ count | number }})</span>
    </h3>
    <div *ngIf="sortable" class="repos-sort">
      <button #sortbtn class="mdl-button mdl-js-button">
        <span [ngSwitch]="recordset.sorting.by">
          <span *ngSwitchCase="'score'">Overall Score</span>
          <span *ngSwitchCase="'score.p'">Popularity</span>
          <span *ngSwitchCase="'score.h'">Trending</span>
          <span *ngSwitchCase="'score.a'">Activity</span>
          <span *ngSwitchCase="'score.m'">Maturity</span>
          <span *ngSwitchDefault>None</span>
        </span>
        <i class="icon icon-sort-desc"></i>
      </button>
      <ul #sortmenu class="mdl-menu mdl-js-menu mdl-menu--unaligned">
        <li class="mdl-menu__item mdl-menu__item--full-bleed-divider" (click)="sort.emit({ by: 'score', asc: false })">
          Overall Score
        </li>
        <li class="mdl-menu__item" (click)="sort.emit({ by: 'score.p', asc: false })">Popularity</li>
        <li class="mdl-menu__item" (click)="sort.emit({ by: 'score.h', asc: false })">Trending</li>
        <li class="mdl-menu__item" (click)="sort.emit({ by: 'score.a', asc: false })">Activity</li>
        <li class="mdl-menu__item" (click)="sort.emit({ by: 'score.m', asc: false })">Maturity</li>
      </ul>
    </div>
    <div class="mdl-grid" [class.mdl-grid--no-spacing]="!wide">
      <ah-list-repo-card
        *ngFor="let repo of recordset.slice; trackBy: trackByRepos"
        [repo]="repo"
        class="mdl-cell mdl-cell--12-col mdl-shadow--2dp"
        [class.mdl-cell--6-col-desktop]="wide"
      >
      </ah-list-repo-card>

      <div *ngIf="recordset.set.length === 0 && recordset.updated" class="mdl-cell mdl-cell--12-col no-list-repos">
        No repositories found!
      </div>

      <ah-infinite-scroll
        class="mdl-cell mdl-cell--12-col mdl-shadow--2dp"
        [disabled]="!infinite"
        [paused]="!recordset.pagination.hasNext || !recordset.updated"
        (next)="needMore.emit()"
      >
      </ah-infinite-scroll>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListReposComponent implements AfterViewInit {
  @HostBinding('class') private class = 'list-repos'

  @Input() heading: string
  @Input() count: number
  @Input() sortable = false
  @Input() infinite = false
  @Input() wide = true
  @Input() recordset: Recordset<ListRepo>

  @Output() needMore = new EventEmitter<any>(false)
  @Output() sort = new EventEmitter<RecordsetSorting>(false)

  @ViewChild('sortbtn', { static: false }) private sortbtn
  @ViewChild('sortmenu', { static: false }) private sortmenu

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {
    if (this.sortable) {
      // workaround for poor MDL menu markup
      const id = ('repos-sort-' + Math.random()).replace(/\./g, '')
      this.renderer.setAttribute(this.sortbtn.nativeElement, 'id', id)
      this.renderer.setAttribute(this.sortmenu.nativeElement, 'for', id)
    }
  }

  trackByRepos(i: number, repo: ListRepo) {
    return repo.author + '/' + repo.name
  }
}
