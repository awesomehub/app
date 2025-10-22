import { Component, OnInit, OnDestroy, ViewEncapsulation, ChangeDetectionStrategy, inject } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs'
import { config } from '@constants'
import { PrimaryRouteComponent } from '@app/core'
import { RecordsetFactoryService, RecordsetService, Recordset } from '@app/recordsets'
import type { ListCollection, ListSummary } from '../../state'

@Component({
  template: `
    <ah-content transparent="true" layout="compact">
      <h3 class="content-heading">{{ helmet.title }} ({{ (recordset$ | async).set.length }})</h3>
      <ah-lists [recordset]="recordset$ | async" (needMore)="recordset.paginate()" />
    </ah-content>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class SearchRouteComponent extends PrimaryRouteComponent implements OnInit, OnDestroy {
  public override helmet = {
    title: 'Search Results',
  }
  public recordset: RecordsetService<ListSummary>
  public recordset$: Observable<Recordset<ListSummary>>
  private recordsetFactory = inject(RecordsetFactoryService)
  private route = inject(ActivatedRoute)

  constructor() {
    super()
  }

  ngOnInit() {
    // Get the resolved collection
    const collection: ListCollection = this.route.snapshot.data['collection']

    // Create the lists recordset
    this.recordset = this.recordsetFactory.create('search-lists', config.lists.recordsets.summary, {
      parent: collection.id,
      size: config.lists.listsPageSize,
    })

    // Fetch the recordset observable
    this.recordset$ = this.recordset.fetch()

    // Listen to query changes
    this.route.queryParams.forEach(({ q }) => {
      if (q) {
        this.recordset.filter('q', q)
      } else {
        this.recordset.unfilter('q')
      }
    })
  }

  ngOnDestroy() {
    this.recordsetFactory.destroy('search-lists')
  }
}
