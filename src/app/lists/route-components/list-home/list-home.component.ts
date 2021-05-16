import { Component, ViewEncapsulation, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { config } from '@constants';
import { PrimaryRouteComponent } from '@app/core';
import { RecordsetFactoryService, RecordsetService, Recordset } from '@app/recordsets';
import { List, ListRepo } from '@app/lists';

@Component({
  template: `
      <ah-content transparent="true" layout="compact">
          <div class="mdl-grid">
              <ah-list-repos class="mdl-cell mdl-cell--6-col"
                             heading="Best Repositories"
                             [recordset]="repos$.best | async"
                             (needMore)="repos.best.paginate()"
                             [sortable]="false"
                             [infinite]="false"
                             [wide]="false">
              </ah-list-repos>
              <ah-list-repos class="mdl-cell mdl-cell--6-col"
                             heading="Trending Repositories"
                             [recordset]="repos$.trending | async"
                             (needMore)="repos.trending.paginate()"
                             [sortable]="false"
                             [infinite]="false"
                             [wide]="false">
              </ah-list-repos>
          </div>
      </ah-content>
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

    // Fetch resolved list
    this.route.data.forEach(({list}) => {
      this.list = list;
      this.title = this.list.name;
    });
  }

  ngOnInit() {
    const { recordsets, listReposPageSize } = config.lists
    // Create repos recordsets
    this.repos = {
      best: this.recordsetFactory.create('best-repos', recordsets.repo, {
        parent: this.list.id,
        size: listReposPageSize,
        sorting: {
          by: 'score',
          asc: false
        }
      }),
      trending: this.recordsetFactory.create('trending-repos', recordsets.repo, {
        parent: this.list.id,
        size: listReposPageSize,
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
