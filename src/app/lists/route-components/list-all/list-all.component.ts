import { Component, OnInit, OnDestroy, ViewEncapsulation, ChangeDetectionStrategy, inject } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs'
import { config } from '@constants'
import { PrimaryRouteComponent } from '@app/core'
import { RecordsetFactoryService, RecordsetService, Recordset } from '@app/recordsets'
import type { List, ListRepo } from '../../state'

@Component({
  template: `
    <ah-content transparent="true" layout="compact">
      <ah-list-repos
        [key]="list.id + '-all'"
        class=""
        heading="All Repositories"
        [count]="list.entries['repo.github'].length"
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
export class ListAllRouteComponent extends PrimaryRouteComponent implements OnInit, OnDestroy {
  public list: List
  public recordset: RecordsetService<ListRepo>
  public recordset$: Observable<Recordset<ListRepo>>
  private route = inject(ActivatedRoute)
  private recordsetFactory = inject(RecordsetFactoryService)

  constructor() {
    super()
    this.list = this.route.snapshot.data['list']
  }

  ngOnInit() {
    this.recordset = this.recordsetFactory.create('all-repos', config.lists.recordsets.repo, {
      parent: this.list.id,
      size: config.lists.listReposPageSize,
      sorting: {
        by: 'score',
        asc: false,
      },
    })
    this.recordset$ = this.recordset.fetch()
    this.updateHelmet({
      title: this.list.name + ' / All Repositories',
      description: this.list.desc,
    })
  }

  ngOnDestroy() {
    this.recordsetFactory.destroy('all-repos')
  }
}
