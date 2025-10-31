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
import { MarkdownDirective } from './directives'
import { DateFormatPipe, ScoreFormatPipe } from './pipes'

@NgModule({
  imports: [CommonModule],
  declarations: [
    LayoutContentComponent,
    LayoutSidebarComponent,
    SpinnerComponent,
    SvgSpiritComponent,
    SvgComponent,
    MarkdownDirective,
    DateFormatPipe,
    ScoreFormatPipe,
  ],
  exports: [
    CommonModule,
    SkeletonModule,
    ScrollSpyModule,
    LayoutContentComponent,
    LayoutSidebarComponent,
    SvgSpiritComponent,
    SvgComponent,
    MarkdownDirective,
    SpinnerComponent,
    DateFormatPipe,
    ScoreFormatPipe,
  ],
})
export class SharedModule {}
