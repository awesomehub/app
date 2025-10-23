import { Injectable, inject, DOCUMENT } from '@angular/core'

@Injectable()
export class AnalyticsService {
  private readonly document: Document = inject(DOCUMENT)
  private readonly gtag: Gtag.Gtag

  constructor() {
    const window = this.document.defaultView as any
    if (typeof window?.gtag !== 'function') {
      console.warn('Gtag is not initialized')
      this.gtag = () => {
        /* fallback */
      }
      return
    }
    this.gtag = window.gtag
  }

  public initialize() {
    /* We can't initialize Gtag here, as we are using enhanced measurement. */
  }

  public event(eventName: string, params?: Record<string, any>) {
    this.gtag('event', eventName, params)
  }
}
