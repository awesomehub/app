import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Component, OnInit, OnDestroy, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BasePage } from '../../../core';
import { ListsConfig } from '../../lists.config';
import { RecordsetFactoryService, RecordsetService, Recordset } from '../../../recordsets';
import { ListCollection, ListSummary } from '../../state';

@Component({
  template: `
    <content transparent="true" layout="compact">
      <h3 class="content-heading">Featured Lists</h3>
      <lists
        [recordset]="recordset$ | async"
        (needMore)="recordset.paginate()">
      </lists>
    </content>
`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListsHomePage extends BasePage implements OnInit, OnDestroy {
  public title = 'Home';
  public recordset: RecordsetService<ListSummary>;
  public recordset$: Observable<Recordset<ListSummary>>;
  private query_: Subscription;

  constructor(private route: ActivatedRoute, private recordsetFactory: RecordsetFactoryService) {
    super();
  }

  ngOnInit() {
    // Get the resolved collection
    let collection: ListCollection = this.route.snapshot.data['collection'];

    // Create the lists recordset
    this.recordset = this.recordsetFactory.create('home-lists', ListsConfig.LIST_SUMMARY_RECORDSET, {
      parent: collection.id,
      size: ListsConfig.LISTS_PER_PAGE
    });

    // Fetch the recordset observable
    this.recordset$ = this.recordset.fetch();

    // Listen to query changes
    this.query_ = this.route.queryParams
      .map(params => params['q'] || null)
      .subscribe(q => {
        if (q) {
          this.recordset.filter('q', q);
        } else {
          this.recordset.unfilter('q');
        }
      });
  }

  ngOnDestroy() {
    this.query_.unsubscribe();
  }
}
