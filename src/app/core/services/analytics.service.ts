import { Injectable, inject, DOCUMENT } from '@angular/core'

@Injectable()
export class AnalyticsService {
  private readonly document: Document = inject(DOCUMENT)
  private readonly dataLayer: any[]

  constructor() {
    const window = this.document.defaultView as any
    if (!Array.isArray(window.dataLayer)) {
      console.warn('GTM dataLayer is not initialized')
    }
    this.dataLayer = window.dataLayer ?? []
  }

  public initialize() {
    /**/
  }

  public event(eventName: string, params?: Record<string, any>) {
    this.dataLayer.push('event', eventName, params)
  }
}
