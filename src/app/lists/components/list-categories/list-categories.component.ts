import { Component, Input, Output, EventEmitter, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core'
import type { List, ListCategory } from '../../state'

export interface ListCategoryActiveEvent {
  ref: HTMLAnchorElement
  category: ListCategory
  active: boolean
}

@Component({
  selector: 'ah-list-categories',
  template: `
    @for (category of categories; track category) {
      <div>
        <a
          #ref
          [class]="'mdl-navigation__link level-' + depth"
          routerLinkActive="mdl-navigation__link--current"
          (isActiveChange)="activate.emit({ category, ref, active: $event })"
          [routerLink]="['/list', list.id].concat(category.path.split('/'))"
          (click)="navigate.emit(category)"
        >
          {{ category.title }}
        </a>
        <ah-list-categories
          [list]="list"
          [depth]="depth + 1"
          [parent]="category.id"
          (navigate)="navigate.emit($event)"
          (activate)="activate.emit($event)"
        />
      </div>
    }
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ListCategoriesComponent {
  public categories: ListCategory[]

  @Input() list: List
  @Input() depth = 0
  @Input() set parent(id: number) {
    this.categories = this.list.cats.filter((cat: ListCategory) => cat.parent === id)
  }

  @Output() navigate = new EventEmitter<ListCategory>(false)
  @Output() activate = new EventEmitter<ListCategoryActiveEvent>(false)
}
