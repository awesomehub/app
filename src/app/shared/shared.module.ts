import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollSpyModule } from '@app/scroll-spy';

import {
  LayoutContentComponent,
  LayoutSidebarComponent,
  SpinnerComponent
} from './components';
import { ScoreDiffDirective } from "./directives";
import { DateFormatPipe } from "./pipes";

@NgModule({
  imports: [ CommonModule ],
  declarations: [
    LayoutContentComponent,
    LayoutSidebarComponent,
    SpinnerComponent,
    DateFormatPipe,
    ScoreDiffDirective
  ],
  exports: [
    CommonModule,
    ScrollSpyModule,
    LayoutContentComponent,
    LayoutSidebarComponent,
    SpinnerComponent,
    DateFormatPipe,
    ScoreDiffDirective
  ]
})
export class SharedModule {}
