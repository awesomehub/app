import { Component, Input, ViewEncapsulation, ChangeDetectionStrategy, HostBinding, HostListener } from '@angular/core'
import { ListSummary } from '@app/lists'
import { Router } from '@angular/router'

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
        <a [routerLink]="listRoute">{{ list.name }}</a>
      </h4>
      {{ list.desc }}
    </div>
    <div class="mdl-card__actions mdl-card--border">
      <a class="meta" title="Total entries"> <i class="icon icon-repo"></i> {{ list.entries | number }} </a>
      <a class="meta" title="Average score"> <i class="icon icon-flame"></i> {{ list.score | ahScoreFormat }} </a>
      <a class="meta" title="Last updated">
        <i class="icon icon-pulse"></i> Updated {{ list.updated | ahDateFormat }}
      </a>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ListCardComponent {
  @HostBinding('class') private class = 'list-card mdl-card'
  @Input() public list: ListSummary

  public constructor(private readonly router: Router) {}

  public get listRoute(): (string | number)[] {
    return ['/list', this.list.id]
  }

  @HostListener('click')
  public onClick(): void {
    void this.router.navigate(this.listRoute)
  }
}
