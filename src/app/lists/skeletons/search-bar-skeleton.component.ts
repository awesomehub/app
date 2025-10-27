import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core'

@Component({
  template: `<ah-skeleton color="dark" style="width: 100%; height: 5rem;" />`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class SearchBarSkeletonComponent {}
