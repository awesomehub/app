import { Component, OnInit, OnDestroy, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { config } from '@constants';
import { PrimaryRouteComponent } from '@app/core';
import { RecordsetFactoryService, RecordsetService, Recordset } from '@app/recordsets';
import { List, ListRepo } from '@app/lists';

@Component({
  template: `
      <ah-content transparent="true" layout="compact">
          <ah-list-repos class=""
                         heading="All Repositories"
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
export class ListAllRouteComponent extends PrimaryRouteComponent implements OnInit, OnDestroy {
  public list: List;
  public recordset: RecordsetService<ListRepo>;
  public recordset$: Observable<Recordset<ListRepo>>;

  constructor(private route: ActivatedRoute, private recordsetFactory: RecordsetFactoryService) {
    super();

    this.list = route.snapshot.data.list;
  }

  ngOnInit() {
    this.recordset = this.recordsetFactory.create('all-repos', config.lists.recordsets.repo, {
      parent: this.list.id,
      size: config.lists.listReposPageSize,
      sorting: {
        by: 'score',
        asc: false
      }
    });
    this.recordset$ = this.recordset.fetch();
    this.updateHelmet({
      title: this.list.name + ' / All Repositories',
      description: this.list.desc
    });
  }

  ngOnDestroy() {
    this.recordsetFactory.destroy('all-repos');
  }
}
