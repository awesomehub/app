import { Component, Input, Output, EventEmitter, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core'
import { List, ListCategory } from '@app/lists'

@Component({
  selector: 'ah-list-categories',
  template: `
    <div *ngFor="let category of categories">
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
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListCategoriesComponent {
  public categories: ListCategory[]

  @Input() list: List
  @Input() depth = 0
  @Input() set parent(id: number) {
    this.categories = this.list.cats.filter((cat: ListCategory) => cat.parent === id).sort((a, b) => a.order - b.order)
  }

  @Output() navigate = new EventEmitter<any>(false)
}
