import { Component, ViewEncapsulation, ChangeDetectionStrategy, forwardRef, inject } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { AppComponent } from '@app'
import { DrawerRouteComponent } from '@app/core'
import type { List } from '../../state'

@Component({
  styleUrls: ['./list-categories.component.css'],
  template: `
    <nav class="list-navigation mdl-navigation">
      <a
        class="mdl-navigation__link"
        routerLinkActive="mdl-navigation__link--current"
        [routerLink]="['/list', list.id]"
        [routerLinkActiveOptions]="{ exact: true }"
        (click)="app.toggleDrawer()"
      >
        Home
      </a>
      <a class="divider"></a>
      <a
        class="mdl-navigation__link"
        routerLinkActive="mdl-navigation__link--current"
        [routerLink]="['/list', list.id, 'all']"
        (click)="app.toggleDrawer()"
      >
        All
      </a>
      <ah-list-categories [list]="list" [parent]="0" (navigate)="app.toggleDrawer()" />
    </nav>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ListCategoriesRouteComponent extends DrawerRouteComponent {
  public title: string
  public list: List
  private route = inject(ActivatedRoute)
  public app = inject<AppComponent>(forwardRef(() => AppComponent))

  constructor() {
    super()

    // Fetch resolved list
    this.route.data.forEach((data: { list: List }) => {
      this.list = data.list
      this.title = this.list.name
    })
  }
}
