import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core'

@Component({
  template: `
    <ah-content transparent="true" layout="compact">
      <div class="mdl-grid">
        <div class="mdl-cell mdl-cell--6-col">
          <ah-skeleton type="heading" color="dark" />
          <div class="mdl-grid mdl-grid--no-spacing">
            @for (placeholder of placeholders; track placeholder) {
              <ah-skeleton type="card" class="mdl-cell--12-col" />
            }
          </div>
        </div>
        <div class="mdl-cell mdl-cell--6-col">
          <ah-skeleton type="heading" color="dark" />
          <div class="mdl-grid mdl-grid--no-spacing">
            @for (placeholder of placeholders; track placeholder) {
              <ah-skeleton type="card" class="mdl-cell--12-col" />
            }
          </div>
        </div>
      </div>
    </ah-content>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ListHomeSkeletonComponent {
  protected readonly placeholders = Array.from({ length: 4 }, (_, index) => index)
}
