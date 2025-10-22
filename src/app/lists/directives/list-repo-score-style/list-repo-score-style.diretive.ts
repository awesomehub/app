import { Directive, ElementRef, inject, Input, Renderer2 } from '@angular/core'
import { ListRepoScoreService } from '../../services'
import type { ListRepoScoreType } from '../../state'

@Directive({
  selector: '[ahListRepoScoreStyle]',
  standalone: false,
})
export class ListRepoScoreStyleDirective {
  private repoScoreService = inject(ListRepoScoreService)
  private el = inject(ElementRef)
  private renderer = inject(Renderer2)

  @Input() scoreType: ListRepoScoreType
  @Input()
  set ahListRepoScoreStyle(score: number) {
    const colors = this.repoScoreService.getScoreColor(this.scoreType, score)
    this.renderer.setStyle(this.el.nativeElement, 'color', colors.text)
    this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', colors.bg)
  }
}
