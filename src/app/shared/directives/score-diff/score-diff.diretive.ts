import { Directive, Input, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[scoreDiff]'
})
export class ScoreDiffDirective {

  private classes = [
    'score-diff',
    'score-diff-up',
    'score-diff-down'
  ];

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @Input() set scoreDiff(diff: number) {
    this.classes.forEach(c => {
      this._toggleClass(c, false);
    });

    let text = 0;
    diff = +diff;
    if (diff !== 0 && !isNaN(diff)) {
      this._toggleClass(this.classes[0], true);
      if (diff > 0) {
        this._toggleClass(this.classes[1], true);
      } else {
        this._toggleClass(this.classes[2], true);
      }
      text = Math.abs(diff);
    }

    this.renderer.setProperty(this.el.nativeElement, 'innerText', text);
  }

  private _toggleClass(klass: string, enabled: boolean): void {
    this.renderer[enabled ? 'addClass' : 'removeClass'](this.el.nativeElement, klass);
  }
}
