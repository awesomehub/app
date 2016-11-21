import { Component, ViewEncapsulation, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { PrimaryRouteComponent } from '../../../core';
import { ListsConfig } from '../../lists.config';
import { RecordsetFactoryService, RecordsetService, Recordset } from '../../../recordsets';
import { List, ListRepo } from '../../state';

@Component({
  template: `
    <content transparent="true" layout="compact">
      <div class="mdl-grid">
        <list-repos class="mdl-cell mdl-cell--6-col"
          heading="Best Repositories"
          [recordset]="repos$.best | async"
          (needMore)="repos.best.paginate()"
          [sortable]="false"
          [infinite]="false"
          [wide]="false">
        </list-repos>
        <list-repos class="mdl-cell mdl-cell--6-col"
          heading="Trending Repositories"
          [recordset]="repos$.trending | async"
          (needMore)="repos.trending.paginate()"
          [sortable]="false"
          [infinite]="false"
          [wide]="false">
        </list-repos>
      </div>
    </content>
`,
  styleUrls: [ 'list-home.component.css' ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListHomeRouteComponent extends PrimaryRouteComponent implements OnInit, OnDestroy {

  public title;
  public list: List;
  public repos: {
    best: RecordsetService<ListRepo>;
    trending: RecordsetService<ListRepo>;
  };
  public repos$: {
    best: Observable<Recordset<ListRepo>>;
    trending: Observable<Recordset<ListRepo>>;
  };

  constructor(private route: ActivatedRoute, private recordsetFactory: RecordsetFactoryService) {
    super();
  }

  ngOnInit() {
    // Fetch resolved list
    this.route.data.forEach(({list}) => {
      this.list = list;
      this.title = this.list.name;
    });

    // Create repos recordsets
    this.repos = {
      best: this.recordsetFactory.create('best-repos', ListsConfig.LIST_REPO_RECORDSET, {
        parent: this.list.id,
        size: ListsConfig.LIST_REPOS_PER_PAGE,
        sorting: {
          by: 'score',
          asc: false
        }
      }),
      trending: this.recordsetFactory.create('trending-repos', ListsConfig.LIST_REPO_RECORDSET, {
        parent: this.list.id,
        size: ListsConfig.LISTS_PER_PAGE,
        sorting: {
          by: 'score.h',
          asc: false
        }
      })
    };

    // Set repos observables
    this.repos$ = {
      best: this.repos.best.fetch(),
      trending: this.repos.trending.fetch()
    };
  }

  ngOnDestroy() {
    this.recordsetFactory.destroy('best-repos');
    this.recordsetFactory.destroy('trending-repos');
  }
}
