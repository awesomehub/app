import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core'

@Component({
  template: `<ah-skeleton color="dark" style="height: 5rem;" />`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class SearchBarSkeletonComponent {}
