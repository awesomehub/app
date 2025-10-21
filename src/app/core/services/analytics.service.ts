import { Injectable, inject } from '@angular/core'
import { DOCUMENT } from '@angular/common'

@Injectable()
export class AnalyticsService {
  private readonly document: Document = inject(DOCUMENT)
  private readonly dataLayer: any[]

  constructor() {
    const window = this.document.defaultView as any
    if (!Array.isArray(window.dataLayer)) {
      console.error('GTM dataLayer is not initialized')
    }
    this.dataLayer = window.dataLayer ?? []
  }

  public initialize() {
    /**/
  }

  public event(event: string, params?: Record<string, any>) {
    this.dataLayer.push({ event, ...params })
  }
}
