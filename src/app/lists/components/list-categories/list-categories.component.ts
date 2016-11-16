import { Component, Input, Output, EventEmitter, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

import { List, ListCategory } from '../../state';

@Component({
  selector: 'list-categories',
  template: `
    <div *ngFor="let category of categories">
      <a [class]="'mdl-navigation__link level-'+depth" routerLinkActive="mdl-navigation__link--current"
        [routerLink]="['/list', list.id, category.path]"
        (click)="navigate.emit(category)">
            {{category.title}} <span class="category-count">{{category.count.all | number}}</span>
      </a>
      <list-categories [list]="list" [depth]="depth+1" [parent]="category.id" (navigate)="navigate.emit($event)"></list-categories>
    </div>
`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListCategoriesComponent {

  public categories: Array<ListCategory>;

  @Input() list: List;
  @Input() depth: number = 0;
  @Input() set parent(id: number) {
    this.categories = this.list.cats
      .filter((cat: ListCategory) => cat.parent === id)
      .sort((a,b) => a.order - b.order);
  }

  @Output() navigate: EventEmitter<any> = new EventEmitter(false);
}
