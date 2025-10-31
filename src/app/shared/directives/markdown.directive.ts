import { Directive, ElementRef, inject, Input, OnChanges, Renderer2, SecurityContext } from '@angular/core'
import { DomSanitizer } from '@angular/platform-browser'

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'ah-markdown',
  exportAs: 'markdown',
  standalone: false,
})
export class MarkdownDirective implements OnChanges {
  @Input() value = ''

  private el: ElementRef<HTMLElement> = inject(ElementRef)
  private renderer = inject(Renderer2)
  private sanitizer = inject(DomSanitizer)

  ngOnChanges() {
    const html = this.renderMarkdown(this.value)
    const safeHtml = this.sanitizer.bypassSecurityTrustHtml(html)
    const innerHTML = this.sanitizer.sanitize(SecurityContext.HTML, safeHtml)
    this.renderer.setProperty(this.el.nativeElement, 'innerHTML', `<div class="markdown">${innerHTML}</div>`)
  }

  // simple markdown renderer
  private renderMarkdown(value: string): string {
    if (!value) return ''

    return (
      value
        // headers
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        // bold + italic
        .replace(/\*\*(.*?)\*\*/gim, '<b>$1</b>')
        .replace(/\*(.*?)\*/gim, '<i>$1</i>')
        // links
        .replace(/\[(.*?)]\((.*?)\)/gim, '<a href="$2" target="_blank" rel="noopener">$1</a>')
        // line breaks
        .replace(/\n/gim, '<br>')
    )
  }
}
