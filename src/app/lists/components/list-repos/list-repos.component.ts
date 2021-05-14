import {
  Component, AfterViewInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Input, Output,
  EventEmitter, ViewChild, Renderer2
} from '@angular/core';

import { Recordset, RecordsetSorting } from '../../../recordsets';
import { ListRepo } from '../../state';

@Component({
  selector: 'list-repos',
  styleUrls: [ 'list-repos.component.css' ],
  template: `
    <h3 *ngIf="heading" class="content-heading">{{heading}}</h3>
    <div *ngIf="sortable" class="repos-sort">
      <button #sortbtn class="mdl-button mdl-js-button">
        <span [ngSwitch]="recordset.sorting.by">
          <span *ngSwitchCase="'score'">Best</span>
          <span *ngSwitchCase="'score.p'">Popularity</span>
          <span *ngSwitchCase="'score.h'">Hotness</span>
          <span *ngSwitchCase="'score.a'">Activity</span>
          <span *ngSwitchCase="'score.m'">Maturity</span>
          <span *ngSwitchDefault>None</span>
        </span>
        <i class="icon icon-sort-desc"></i>
      </button>
      <ul #sortmenu class="mdl-menu mdl-js-menu mdl-menu--bottom-right">
        <li class="mdl-menu__item mdl-menu__item--full-bleed-divider" (click)="sort.emit({by: 'score', asc: false})">Best</li>
        <li class="mdl-menu__item" (click)="sort.emit({by: 'score.p', asc: false})">Popularity</li>
        <li class="mdl-menu__item" (click)="sort.emit({by: 'score.h', asc: false})">Hotness</li>
        <li class="mdl-menu__item" (click)="sort.emit({by: 'score.a', asc: false})">Activity</li>
        <li class="mdl-menu__item" (click)="sort.emit({by: 'score.m', asc: false})">Maturity</li>
      </ul>
    </div>
    <div class="mdl-grid" [class.mdl-grid--no-spacing]="!wide">
      <list-repo-card
        *ngFor="let repo of recordset.slice; trackBy: trackByRepos"
        [repo]="repo"
        class="mdl-cell mdl-cell--12-col mdl-shadow--2dp"
        [class.mdl-cell--6-col-desktop]="wide">
      </list-repo-card>
      
    <div *ngIf="recordset.set.length == 0 && recordset.updated" class="mdl-cell mdl-cell--12-col no-list-repos">
      No Repositories found!
    </div>
    
    <infinite-scroll
      class="mdl-cell mdl-cell--12-col mdl-shadow--2dp"
      [auto]="infinite"
      [paused]="!recordset.pagination.hasNext || !recordset.updated"
      (next)="needMore.emit()">
    </infinite-scroll>
    </div>
`,
  host: {
    'class': 'list-repos'
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListReposComponent implements AfterViewInit {

  @Input() heading: string;
  @Input() sortable: boolean = false;
  @Input() infinite: boolean = false;
  @Input() wide: boolean = true;
  @Input() recordset: Recordset<ListRepo>;

  @Output() needMore: EventEmitter<any> = new EventEmitter(false);
  @Output() sort: EventEmitter<RecordsetSorting> = new EventEmitter(false);

  @ViewChild('sortbtn', { static: false }) private sortbtn;
  @ViewChild('sortmenu', { static: false }) private sortmenu;

  constructor(private renderer: Renderer2) { }

  ngAfterViewInit () {
    if (this.sortable) {
      // workaround for poor MDL menu markup
      let id = ('repos-sort-' + Math.random()).replace(/\./g, '');
      this.renderer.setAttribute(this.sortbtn.nativeElement, 'id', id);
      this.renderer.setAttribute(this.sortmenu.nativeElement, 'for', id);
    }
  }

  trackByRepos(i: number, repo: ListRepo) {
    return repo.author+'/'+repo.name;
  }
}
