import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core'

export type SvgSpiritKey =
  | 'star'
  | 'graph'
  | 'globe'
  | 'pulse'
  | 'github'
  | 'heart'
  | 'flame'
  | 'repo'
  | 'bars'
  | 'sort-desc'
  | 'code'
  | 'license'
  | 'chevrons-up'
  | 'info'

@Component({
  selector: 'ah-svg-spirit',
  templateUrl: './svg-spirit.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class SvgSpiritComponent {}
