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
      <h3 class="content-heading">Explore</h3>
      <ah-lists [key]="collection.id" [recordset]="recordset$ | async" (needMore)="recordset.paginate()" />
    </ah-content>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class HomeRouteComponent extends PrimaryRouteComponent implements OnInit, OnDestroy {
  public override helmet = {
    title: 'Explore',
  }
  public collection: ListCollection
  public recordset: RecordsetService<ListSummary>
  public recordset$: Observable<Recordset<ListSummary>>
  private route = inject(ActivatedRoute)
  private recordsetFactory = inject(RecordsetFactoryService)

  constructor() {
    super()
    // Get the resolved collection
    this.collection = this.route.snapshot.data['collection']
  }

  ngOnInit() {
    // Create the lists recordset
    this.recordset = this.recordsetFactory.create('browse-lists', config.lists.recordsets.summary, {
      parent: this.collection.id,
      size: config.lists.listsPageSize,
    })

    // Fetch the recordset observable
    this.recordset$ = this.recordset.fetch()
  }

  ngOnDestroy() {
    this.recordsetFactory.destroy('browse-lists')
  }
}
