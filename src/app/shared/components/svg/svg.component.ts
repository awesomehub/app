import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input } from '@angular/core'
import type { SvgSpiritKey } from '../svg-spirit'

@Component({
  selector: 'ah-svg',
  template: `
    <svg [attr.width]="width" [attr.height]="height" [attr.viewBox]="viewBox">
      <use [attr.xlink:href]="'#s-' + key"></use>
    </svg>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class SvgComponent {
  @Input({ required: true }) public key: SvgSpiritKey
  @Input() public width?: string
  @Input() public height?: string
  @Input() public viewBox?: string
}
