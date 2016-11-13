import { Directive, ElementRef, Input, Renderer } from '@angular/core';

import { ListRepoScoreService } from '../../services';

@Directive({
  selector: '[listRepoScoreStyle]'
})
export class ListRepoScoreStyleDirective {

  constructor(private repoScoreService: ListRepoScoreService,
              private el: ElementRef, private renderer: Renderer) { }

  @Input('scoreType') scoreType: string;
  @Input()
  set listRepoScoreStyle(score: number) {
    let colors = this.repoScoreService.getScoreColor(this.scoreType, score);
    this.renderer.setElementStyle(this.el.nativeElement, 'color', colors.text);
    this.renderer.setElementStyle(this.el.nativeElement, 'backgroundColor', colors.bg);
  }
}
