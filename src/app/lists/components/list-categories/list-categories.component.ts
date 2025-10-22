import { Component, Input, Output, EventEmitter, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core'
import type { List, ListCategory } from '../../state'

@Component({
  selector: 'ah-list-categories',
  template: `
    @for (category of categories; track category) {
      <div>
        <a
          [class]="'mdl-navigation__link level-' + depth"
          routerLinkActive="mdl-navigation__link--current"
          [routerLink]="['/list', list.id, category.path]"
          (click)="navigate.emit(category)"
        >
          {{ category.title }}
        </a>
        <ah-list-categories [list]="list" [depth]="depth + 1" [parent]="category.id" (navigate)="navigate.emit($event)">
        </ah-list-categories>
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

  @Output() navigate = new EventEmitter<any>(false)
}
