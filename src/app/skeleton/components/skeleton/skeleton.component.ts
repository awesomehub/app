import { Component, ViewEncapsulation, ChangeDetectionStrategy, HostBinding, Input } from '@angular/core'

@Component({
  selector: 'ah-skeleton',
  template: `
    @if (type === 'card') {
      <div class="mdl-card__supporting-text">
        <div class="skl-block skl-title"></div>
        <div class="skl-block skl-text"></div>
        <div class="skl-block skl-text short"></div>
      </div>
      <div class="mdl-card__actions mdl-card--border">
        <span class="meta">
          <span class="skl-block skl-pill"></span>
        </span>
        <span class="meta">
          <span class="skl-block skl-pill"></span>
        </span>
        <span class="meta">
          <span class="skl-block skl-pill wide"></span>
        </span>
      </div>
    }
  `,
  styleUrls: ['./skeleton.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class SkeletonComponent {
  @Input() type: 'card' | 'block' | 'heading' = 'block'
  @Input() color: 'dark' | 'light' = 'light'

  @HostBinding('class')
  get mainClasses() {
    const clx = this.color === 'dark' ? ['skl-dark'] : ['skl-light']
    if (this.type === 'card') {
      clx.push('skl-card mdl-card mdl-cell mdl-shadow--2dp')
    } else if (this.type === 'heading') {
      clx.push('content-heading skl-block skl-heading')
    } else {
      clx.push('skl-block')
    }

    return clx.join(' ')
  }
}
