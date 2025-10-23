import { Component, ViewEncapsulation, ChangeDetectionStrategy, OnInit, OnDestroy, inject } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs'
import { config } from '@constants'
import { PrimaryRouteComponent } from '@app/core'
import { RecordsetFactoryService, RecordsetService, Recordset } from '@app/recordsets'
import type { List, ListRepo } from '../../state'

@Component({
  template: `
    <ah-content transparent="true" layout="compact">
      <div class="mdl-grid">
        <ah-list-repos
          [key]="list.id + '-best'"
          class="mdl-cell mdl-cell--6-col"
          heading="Best Repositories"
          [recordset]="repos$.best | async"
          (needMore)="repos.best.paginate()"
          [sortable]="false"
          [infinite]="false"
          [wide]="false"
        />
        <ah-list-repos
          [key]="list.id + '-trending'"
          class="mdl-cell mdl-cell--6-col"
          heading="Trending Repositories"
          [recordset]="repos$.trending | async"
          (needMore)="repos.trending.paginate()"
          [sortable]="false"
          [infinite]="false"
          [wide]="false"
        />
      </div>
    </ah-content>
  `,
  styleUrls: ['list-home.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ListHomeRouteComponent extends PrimaryRouteComponent implements OnInit, OnDestroy {
  public list: List
  public repos: {
    best: RecordsetService<ListRepo>
    trending: RecordsetService<ListRepo>
  }
  public repos$: {
    best: Observable<Recordset<ListRepo>>
    trending: Observable<Recordset<ListRepo>>
  }
  private recordsetFactory = inject(RecordsetFactoryService)
  private route = inject(ActivatedRoute)

  constructor() {
    super()

    this.list = this.route.snapshot.data['list']
  }

  ngOnInit() {
    const recordsetReducer = config.lists.recordsets.repo
    const recordsetSize = Math.round(config.lists.listReposPageSize / 2)

    // Create repos recordsets
    this.repos = {
      best: this.recordsetFactory.create('best-repos', recordsetReducer, {
        parent: this.list.id,
        size: recordsetSize,
        sorting: {
          by: 'score',
          asc: false,
        },
      }),
      trending: this.recordsetFactory.create('trending-repos', recordsetReducer, {
        parent: this.list.id,
        size: recordsetSize,
        sorting: {
          by: 'score.h',
          asc: false,
        },
      }),
    }

    // Set repos observables
    this.repos$ = {
      best: this.repos.best.fetch(),
      trending: this.repos.trending.fetch(),
    }

    // Update doc head
    this.updateHelmet({
      title: this.list.name,
      description: this.list.desc,
    })
  }

  ngOnDestroy() {
    this.recordsetFactory.destroy('best-repos')
    this.recordsetFactory.destroy('trending-repos')
  }
}
