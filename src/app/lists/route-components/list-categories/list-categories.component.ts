import { Component, ViewEncapsulation, ChangeDetectionStrategy, forwardRef, inject } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { AppComponent } from '@app/app.component'
import { DrawerRouteComponent } from '@app/core'
import type { List } from '../../state'

@Component({
  styleUrls: ['./list-categories.component.css'],
  template: `
    @if (list.copyright) {
      <div class="list-copyright">
        <button id="list-copyright-btn" class="mdl-button mdl-js-button">
          <ah-svg key="info" class="icon icon-24" />
        </button>
        <div for="list-copyright-btn" class="mdl-menu mdl-js-menu mdl-menu--unaligned">
          <ah-markdown [value]="list.copyright" />
        </div>
      </div>
    }
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
      <a
        class="mdl-navigation__link"
        routerLinkActive="mdl-navigation__link--current"
        [routerLink]="['/list', list.id, 'all']"
        (click)="app.toggleDrawer()"
      >
        Browse All
      </a>
      <span class="divider"></span>
      <ah-list-categories
        [list]="list"
        [parent]="0"
        (navigate)="app.toggleDrawer()"
        style="height: calc(100vh - 190px); overflow: auto;"
      />
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
