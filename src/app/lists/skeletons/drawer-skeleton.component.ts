import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core'

@Component({
  template: `
    <nav class="mdl-navigation">
      <div class="mdl-navigation__link">
        <ah-skeleton style="width: 80%; height: 28px; margin: 14px 0" />
      </div>
      <span class="divider"></span>
      @for (item of placeholders; track item) {
        <div class="mdl-navigation__link">
          <ah-skeleton style="width: 90%; height: 24px; margin: 16px 0 0" />
        </div>
      }
    </nav>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class DrawerSkeletonComponent {
  protected readonly placeholders = Array.from({ length: 10 }, (_, index) => index)
}
