import { Component, OnInit, OnDestroy, ViewEncapsulation, ChangeDetectionStrategy, Inject, forwardRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AppComponent } from '../../../app.component';
import { PrimaryRouteComponent } from '../../../core';
import { ListsConfig } from '../../lists.config';
import { RecordsetFactoryService, RecordsetService, Recordset } from '../../../recordsets';
import { List, ListCategory, ListRepo } from '../../state';

@Component({
  template: `
    <content transparent="true" layout="compact">
      <list-repos
          [heading]="category.title"
          [recordset]="recordset$ | async"
          (needMore)="recordset.paginate()"
          (sort)="recordset.sort($event)"
          [sortable]="true"
          [infinite]="true"
          [wide]="true">
        </list-repos>
    </content>
`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListCategoryRouteComponent extends PrimaryRouteComponent implements OnInit, OnDestroy {

  public title;
  public list: List;
  public category: ListCategory;

  public recordset: RecordsetService<ListRepo>;
  public recordset$: Observable<Recordset<ListRepo>>;

  constructor(
    private route: ActivatedRoute,
    private recordsetFactory: RecordsetFactoryService,
    @Inject(forwardRef(() => AppComponent)) private app: AppComponent) {
    super();
  }

  ngOnInit() {
    // Fetch resolved list
    this.route.data.forEach(({list, category}) => {
      this.list = list;
      this.category = category;

      // Create repos recordset
      if (!this.recordset) {
        this.recordset = this.recordsetFactory.create('category-repos', ListsConfig.LIST_REPO_RECORDSET, {
          parent: this.list.id,
          size: ListsConfig.LIST_REPOS_PER_PAGE,
          sorting: {
            by: 'score',
            asc: false
          }
        });
        this.recordset$ = this.recordset.fetch();
      }

      // Re-invoke Outlet deactivation event since it's not invoked when navigating
      //  within the same component
      this.app.onDeactivation(this);

      // Set the category filter
      this.recordset.filter('category', this.category.id);

      // Set page title
      this.title = this.list.name + ' / ' + this.category.title;

      // Re-invoke Outlet activation eventsince it's not invoked when navigating
      //  within the same component
      this.app.onActivation(this);
    });
  }

  ngOnDestroy() {
    this.recordsetFactory.destroy('category-repos');
  }
}
