import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core'

@Component({
  template: `
    <ah-content transparent="true" layout="compact">
      <ah-skeleton type="heading" color="dark" />
      <div class="mdl-grid">
        @for (placeholder of placeholders; track placeholder) {
          <ah-skeleton type="card" class="mdl-cell--12-col mdl-cell--6-col-desktop" />
        }
      </div>
    </ah-content>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ListAllSkeletonComponent {
  protected readonly placeholders = Array.from({ length: 6 }, (_, index) => index)
}
