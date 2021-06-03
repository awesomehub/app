import { Component, OnInit, OnDestroy, ViewEncapsulation, ChangeDetectionStrategy, Inject, forwardRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { config } from '@constants';
import { AppComponent } from '@app';
import { PrimaryRouteComponent } from '@app/core';
import { RecordsetFactoryService, RecordsetService, Recordset } from '@app/recordsets';
import { List, ListCategory, ListRepo } from '@app/lists';

@Component({
  template: `
      <ah-content transparent="true" layout="compact">
          <ah-list-repos
                  [heading]="category.title"
                  [recordset]="recordset$ | async"
                  (needMore)="recordset.paginate()"
                  (sort)="recordset.sort($event)"
                  [sortable]="true"
                  [infinite]="true"
                  [wide]="true">
          </ah-list-repos>
      </ah-content>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListCategoryRouteComponent extends PrimaryRouteComponent implements OnInit, OnDestroy {
  public list: List;
  public category: ListCategory;
  public recordset: RecordsetService<ListRepo>;
  public recordset$: Observable<Recordset<ListRepo>>;

  constructor(
    private route: ActivatedRoute,
    private recordsetFactory: RecordsetFactoryService,
    @Inject(forwardRef(() => AppComponent)) private app: AppComponent
  ) {
    super();

    this.list = route.snapshot.data.list;
  }

  ngOnInit() {
    this.recordset = this.recordsetFactory.create('category-repos', config.lists.recordsets.repo, {
      parent: this.list.id,
      size: config.lists.listReposPageSize,
      sorting: {
        by: 'score',
        asc: false
      }
    });
    this.recordset$ = this.recordset.fetch();
    this.route.data.forEach(({ category }) => {
      this.category = category;
      this.recordset.filter('category', category.id);
      this.updateHelmet({
        title: this.list.name + ' / ' + category.title,
        description: this.list.desc
      });
    });
  }

  ngOnDestroy() {
    this.recordsetFactory.destroy('category-repos');
  }
}
