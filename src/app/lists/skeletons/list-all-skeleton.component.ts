import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core'

@Component({
  template: `
    <ah-content transparent="true" layout="compact">
      <ah-skeleton type="heading" color="dark" />
      <ah-skeleton color="dark" class="sort-btn" />
      <div class="mdl-grid">
        @for (placeholder of placeholders; track placeholder) {
          <ah-skeleton type="card" class="mdl-cell--12-col mdl-cell--6-col-desktop" />
        }
      </div>
    </ah-content>
  `,
  styles: `
    .skl-block.sort-btn {
      position: absolute;
      top: 6px;
      right: 8px;
      width: 160px;
    }

    .is-small-screen .skl-block.sort-btn {
      position: relative;
      margin-left: 8px;
      top: -8px;
      right: 0;
    }
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ListAllSkeletonComponent {
  protected readonly placeholders = Array.from({ length: 8 }, (_, index) => index)
}
