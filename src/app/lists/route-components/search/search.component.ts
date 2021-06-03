import { Component, OnInit, OnDestroy, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { config } from '@constants';
import { PrimaryRouteComponent } from '@app/core';
import { RecordsetFactoryService, RecordsetService, Recordset } from '@app/recordsets';
import { ListCollection, ListSummary } from '@app/lists';

@Component({
  template: `
      <ah-content transparent="true" layout="compact">
          <h3 class="content-heading">{{helmet.title}} ({{(recordset$ | async).set.length}})</h3>
          <ah-lists
                  [recordset]="recordset$ | async"
                  (needMore)="recordset.paginate()">
          </ah-lists>
      </ah-content>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchRouteComponent extends PrimaryRouteComponent implements OnInit, OnDestroy {
  public helmet = {
    title: 'Search Results'
  };
  public recordset: RecordsetService<ListSummary>;
  public recordset$: Observable<Recordset<ListSummary>>;

  constructor(private route: ActivatedRoute, private recordsetFactory: RecordsetFactoryService) {
    super();
  }

  ngOnInit() {
    // Get the resolved collection
    let collection: ListCollection = this.route.snapshot.data['collection'];

    // Create the lists recordset
    this.recordset = this.recordsetFactory.create('search-lists', config.lists.recordsets.summary, {
      parent: collection.id,
      size: config.lists.listsPageSize
    });

    // Fetch the recordset observable
    this.recordset$ = this.recordset.fetch();

    // Listen to query changes
    this.route.queryParams.forEach(({q}) => {
      if (q) {
        this.recordset.filter('q', q);
      } else {
        this.recordset.unfilter('q');
      }
    });
  }

  ngOnDestroy() {
    this.recordsetFactory.destroy('search-lists');
  }
}
