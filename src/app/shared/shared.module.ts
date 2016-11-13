import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScrollSpyModule } from '../scroll-spy';

import {
  LayoutContentComponent,
  LayoutSidebarComponent,
  SpinnerComponent
} from './components';
import { ScoreDiffDirective } from "./directives";
import { MomentFormatPipe } from "./pipes";

@NgModule({
  imports: [ CommonModule ],
  declarations: [
    LayoutContentComponent,
    LayoutSidebarComponent,
    SpinnerComponent,
    MomentFormatPipe,
    ScoreDiffDirective
  ],
  exports: [
    CommonModule,
    ScrollSpyModule,
    LayoutContentComponent,
    LayoutSidebarComponent,
    SpinnerComponent,
    MomentFormatPipe,
    ScoreDiffDirective
  ]
})
export class SharedModule {}
