import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollSpyModule } from '@app/scroll-spy';

import {
  LayoutContentComponent,
  LayoutSidebarComponent,
  SpinnerComponent
} from './components';
import { DateFormatPipe, ScoreFormatPipe } from "./pipes";

@NgModule({
  imports: [ CommonModule ],
  declarations: [
    LayoutContentComponent,
    LayoutSidebarComponent,
    SpinnerComponent,
    DateFormatPipe,
    ScoreFormatPipe
  ],
  exports: [
    CommonModule,
    ScrollSpyModule,
    LayoutContentComponent,
    LayoutSidebarComponent,
    SpinnerComponent,
    DateFormatPipe,
    ScoreFormatPipe
  ]
})
export class SharedModule {}
