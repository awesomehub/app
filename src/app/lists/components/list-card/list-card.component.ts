import {
  Component,
  Input,
  inject,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  HostBinding,
  HostListener,
} from '@angular/core'
import { Router } from '@angular/router'
import type { ListSummary } from '../../state'

@Component({
  selector: 'ah-list-card',
  styleUrls: ['list-card.component.css'],
  host: {
    '[attr.tabindex]': '0',
    '[attr.role]': "'link'",
  },
  template: `
    <div class="mdl-card__supporting-text">
      <h4>
        <a [routerLink]="listRoute" title="View {{ list.name }} repositories">{{ list.name }}</a>
      </h4>
      {{ list.desc }}
    </div>
    <div class="mdl-card__actions mdl-card--border">
      <span class="meta" title="Total repositories"><ah-svg key="repo" class="icon" />{{ list.entries | number }}</span>
      <span class="meta" title="Average score"><ah-svg key="flame" class="icon" />{{ list.score | ahScoreFormat }}</span>
      <span class="meta" title="Last updated">
        <ah-svg key="pulse" class="icon" />Updated {{ list.updated | ahDateFormat }}
      </span>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ListCardComponent {
  @HostBinding('class') private class = 'list-card mdl-card'
  @Input() public list: ListSummary
  private readonly router = inject(Router)

  public get listRoute(): (string | number)[] {
    return ['/list', this.list.id]
  }

  @HostListener('click')
  public onClick(): void {
    void this.router.navigate(this.listRoute)
  }
}
