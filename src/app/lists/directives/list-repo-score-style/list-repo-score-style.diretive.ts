import { Directive, ElementRef, Input, Renderer2 } from '@angular/core'
import { ListRepoScoreService, ListRepoScoreType } from '@app/lists'

@Directive({
  selector: '[ahListRepoScoreStyle]',
})
export class ListRepoScoreStyleDirective {
  constructor(
    private repoScoreService: ListRepoScoreService,
    private el: ElementRef,
    private renderer: Renderer2,
  ) {}

  @Input() scoreType: ListRepoScoreType
  @Input()
  set ahListRepoScoreStyle(score: number) {
    const colors = this.repoScoreService.getScoreColor(this.scoreType, score)
    this.renderer.setStyle(this.el.nativeElement, 'color', colors.text)
    this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', colors.bg)
  }
}
