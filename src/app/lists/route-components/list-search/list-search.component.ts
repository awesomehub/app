import { Component, OnInit, OnDestroy, ViewEncapsulation, ChangeDetectionStrategy, inject } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs'
import { config } from '@constants'
import { PrimaryRouteComponent } from '@app/core'
import { RecordsetRegistryService, RecordsetService, Recordset } from '@app/recordsets'
import type { List, ListRepo } from '../../state'

@Component({
  template: `
    <ah-content transparent="true" layout="compact">
      <ah-list-repos
        [key]="list.id + '-search'"
        heading="Search Results"
        [count]="(recordset$ | async).set.length"
        [recordset]="recordset$ | async"
        (needMore)="recordset.paginate()"
        (sort)="recordset.sort($event)"
        [sortable]="true"
        [infinite]="true"
        [wide]="true"
      />
    </ah-content>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ListSearchRouteComponent extends PrimaryRouteComponent implements OnInit, OnDestroy {
  public list: List
  public recordset: RecordsetService<ListRepo>
  public recordset$: Observable<Recordset<ListRepo>>
  private recordsetRegistry = inject(RecordsetRegistryService)
  private route = inject(ActivatedRoute)

  constructor() {
    super()

    this.list = this.route.snapshot.data['list']
  }

  ngOnInit() {
    // Create repos recordset
    this.recordset = this.recordsetRegistry.register('search-repos', config.lists.recordsets.repo, {
      parent: this.list.id,
      size: config.lists.listReposPageSize,
    })

    // Set recordset observable
    this.recordset$ = this.recordset.fetch()

    // Listen to query changes
    this.route.queryParams.forEach(({ q }) => {
      if (q) {
        this.recordset.filter('q', q)
      } else {
        this.recordset.unfilter('q')
      }
    })

    // Update doc head
    this.updateHelmet({
      title: this.list.name + ' / Search Results',
      description: this.list.desc,
    })
  }

  ngOnDestroy() {
    this.recordsetRegistry.destroy('search-repos')
  }
}
