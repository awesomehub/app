import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

import { ListRepoScoreService } from '../../services';

@Directive({
  selector: '[listRepoScoreStyle]'
})
export class ListRepoScoreStyleDirective {

  constructor(
    private repoScoreService: ListRepoScoreService,
    private el: ElementRef,
    private renderer: Renderer2,
  ) { }

  @Input('scoreType') scoreType: string;
  @Input()
  set listRepoScoreStyle(score: number) {
    let colors = this.repoScoreService.getScoreColor(this.scoreType, score);
    this.renderer.setStyle(this.el.nativeElement, 'color', colors.text)
    this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', colors.bg)
  }
}
