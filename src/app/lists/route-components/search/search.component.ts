import { Component, OnInit, OnDestroy, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { PrimaryRouteComponent } from '../../../core';
import { ListsConfig } from '../../lists.config';
import { RecordsetFactoryService, RecordsetService, Recordset } from '../../../recordsets';
import { ListCollection, ListSummary } from '../../state';

@Component({
  template: `
    <content transparent="true" layout="compact">
      <h3 class="content-heading">{{title}} ({{(recordset$ | async).set.length}})</h3>
      <lists
        [recordset]="recordset$ | async"
        (needMore)="recordset.paginate()">
      </lists>
    </content>
`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchRouteComponent extends PrimaryRouteComponent implements OnInit, OnDestroy {
  public title = 'Search results';
  public recordset: RecordsetService<ListSummary>;
  public recordset$: Observable<Recordset<ListSummary>>;

  constructor(private route: ActivatedRoute, private recordsetFactory: RecordsetFactoryService) {
    super();
  }

  ngOnInit() {
    // Get the resolved collection
    let collection: ListCollection = this.route.snapshot.data['collection'];

    // Create the lists recordset
    this.recordset = this.recordsetFactory.create('search-lists', ListsConfig.LIST_SUMMARY_RECORDSET, {
      parent: collection.id,
      size: ListsConfig.LISTS_PER_PAGE
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
