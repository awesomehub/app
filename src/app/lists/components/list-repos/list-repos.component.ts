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
  ElementRef,
  HostBinding,
  inject,
} from '@angular/core'
import type { Recordset, RecordsetSorting } from '@app/recordsets'
import type { ListRepo } from '../../state'

@Component({
  selector: 'ah-list-repos',
  styleUrls: ['list-repos.component.css'],
  template: `
    @if (heading) {
      <h3 class="content-heading">
        {{ heading }}
        @if (count !== undefined) {
          <span>({{ count | number }})</span>
        }
      </h3>
    }
    @if (sortable) {
      <div class="repos-sort">
        <button #sortBtn class="mdl-button mdl-js-button">
          <span>
            @switch (recordset.sorting.by) {
              @case ('score') {
                <span>Overall Score</span>
              }
              @case ('score.p') {
                <span>Popularity</span>
              }
              @case ('score.h') {
                <span>Trending</span>
              }
              @case ('score.a') {
                <span>Activity</span>
              }
              @case ('score.m') {
                <span>Maturity</span>
              }
              @default {
                <span>None</span>
              }
            }
          </span>
          <ah-svg key="sort-desc" class="icon" />
        </button>
        <ul #sortMenu class="mdl-menu mdl-js-menu mdl-menu--unaligned">
          <li
            class="mdl-menu__item mdl-menu__item--full-bleed-divider"
            (click)="sort.emit({ by: 'score', asc: false })"
          >
            Overall Score
          </li>
          <li class="mdl-menu__item" (click)="sort.emit({ by: 'score.p', asc: false })">Popularity</li>
          <li class="mdl-menu__item" (click)="sort.emit({ by: 'score.h', asc: false })">Trending</li>
          <li class="mdl-menu__item" (click)="sort.emit({ by: 'score.a', asc: false })">Activity</li>
          <li class="mdl-menu__item" (click)="sort.emit({ by: 'score.m', asc: false })">Maturity</li>
        </ul>
      </div>
    }
    <div class="mdl-grid" [class.mdl-grid--no-spacing]="!wide">
      @for (repo of recordset.slice; track getRepoSlug(repo)) {
        <ah-list-repo-card
          [repo]="repo"
          class="mdl-cell mdl-cell--12-col mdl-shadow--2dp"
          [class.mdl-cell--6-col-desktop]="wide"
        />
      }

      @if (recordset.set.length === 0 && recordset.updated) {
        <div class="mdl-cell mdl-cell--12-col no-list-repos">No repositories found!</div>
      }

      <ah-infinite-scroll
        [key]="id"
        class="mdl-cell mdl-cell--12-col mdl-shadow--2dp"
        [disabled]="!infinite"
        [paused]="!recordset.pagination.hasNext || !recordset.updated"
        (next)="needMore.emit()"
      />
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ListReposComponent implements AfterViewInit {
  @HostBinding('class') private class = 'list-repos'
  @HostBinding('attr.id') get id() {
    return `list-repos-${this.key}`
  }

  @Input({ required: true }) key: string
  @Input() heading: string
  @Input() count: number
  @Input() sortable = false
  @Input() infinite = false
  @Input() wide = true
  @Input() recordset: Recordset<ListRepo>

  @Output() needMore = new EventEmitter<any>(false)
  @Output() sort = new EventEmitter<RecordsetSorting>(false)

  @ViewChild('sortBtn', { static: false }) private sortBtn: ElementRef<HTMLButtonElement>
  @ViewChild('sortMenu', { static: false }) private sortMenu: ElementRef<HTMLUListElement>

  private renderer = inject(Renderer2)

  ngAfterViewInit() {
    if (this.sortable) {
      // workaround for poor MDL menu markup
      const id = `${this.id}-sort`
      this.renderer.setAttribute(this.sortBtn.nativeElement, 'id', id)
      this.renderer.setAttribute(this.sortMenu.nativeElement, 'for', id)
    }
  }

  getRepoSlug(repo: ListRepo) {
    return `${repo.author}/${repo.name}`
  }
}
