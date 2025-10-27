import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ScrollSpyModule } from '@app/scroll-spy'
import { SkeletonModule } from '@app/skeleton'
import {
  LayoutContentComponent,
  LayoutSidebarComponent,
  SpinnerComponent,
  SvgSpiritComponent,
  SvgComponent,
} from './components'
import { DateFormatPipe, ScoreFormatPipe } from './pipes'

@NgModule({
  imports: [CommonModule],
  declarations: [
    LayoutContentComponent,
    LayoutSidebarComponent,
    SpinnerComponent,
    SvgSpiritComponent,
    SvgComponent,
    DateFormatPipe,
    ScoreFormatPipe,
  ],
  exports: [
    CommonModule,
    SkeletonModule,
    ScrollSpyModule,
    LayoutContentComponent,
    LayoutSidebarComponent,
    SpinnerComponent,
    DateFormatPipe,
    ScoreFormatPipe,
    SvgSpiritComponent,
    SvgComponent,
  ],
})
export class SharedModule {}
