import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, Inject, forwardRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AppComponent } from '../../../app.component';
import { DrawerRouteComponent } from '../../../core';
import { List } from '../../state';

@Component({
  styleUrls: [ './list-categories.component.css' ],
  template: `
    <nav class="list-navigation mdl-navigation">
      <a class="mdl-navigation__link" routerLinkActive="mdl-navigation__link--current"
        [routerLink]="['/list', list.id]"
        [routerLinkActiveOptions]="{ exact: true }"
        (click)="app.toggleDrawer()">Home</a>
      <a class="divider"></a>
      <a class="mdl-navigation__link" routerLinkActive="mdl-navigation__link--current"
        [routerLink]="['/list', list.id, 'all']"
        (click)="app.toggleDrawer()">All <span class="category-count">{{allCount | number}}</span></a>
      <list-categories [list]="list" [parent]="0" (navigate)="app.toggleDrawer()"></list-categories>
    </nav> 
`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListCategoriesRouteComponent extends DrawerRouteComponent implements OnInit {

  public title;
  public list: List;
  public allCount: number;

  constructor(
    private route: ActivatedRoute,
    @Inject(forwardRef(() => AppComponent)) public app: AppComponent
  ) {
    super();
  }

  ngOnInit() {
    // Fetch resolved list
    this.route.data.forEach((data: {list: List}) => {
      this.list = data.list;
      this.title = this.list.name;
      this.allCount = this.list.entries['repo.github'].length;
    });
  }
}
