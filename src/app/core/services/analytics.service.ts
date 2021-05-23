import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from "@angular/common";

import { environment } from '@constants';

export interface GtagCore {
  (cmd: 'js', date: Date): void;
  (cmd: 'config', targetId: string, config?: GtagConfigParams): void;
  (cmd: 'event', action: string, params?: GtagEventParams): void;
}

export interface GtagParams {
  [key:string]: any;
}

export interface GtagConfigParams extends GtagParams {
  /** @see https://developers.google.com/gtagjs/reference/parameter#control_parameters */
  groups?: string | string[];
  /** @see https://developers.google.com/analytics/devguides/collection/gtagjs#disable_pageview_measurement */
  send_page_view?: boolean;
  /** @see https://developers.google.com/analytics/devguides/collection/gtagjs/ip-anonymization */
  anonymize_ip?: boolean;
  /** @see https://developers.google.com/analytics/devguides/collection/gtagjs/display-features */
  allow_google_signals?: boolean;
  allow_ad_personalization_signals?: boolean;
}

/** @see https://developers.google.com/analytics/devguides/collection/gtagjs/events */
export interface GtagEventParams extends GtagParams {
  send_to?: string | string[];
  event_callback?: () => void;
  event_timeout?: number;
  non_interaction?: true;
  event_category?: string;
  event_label?: string;
  value?: string|number;
}

@Injectable()
export class AnalyticsService {
  private readonly trakingId = environment.ga;
  private readonly gtag: GtagCore;

  constructor(@Inject(DOCUMENT) private document: Document) {
    const window = document.defaultView as any
    this.gtag = function() {
      window.dataLayer.push(arguments);
    }
    window.dataLayer = [];
    window.gtag = this.gtag;
    this.gtag('js', new Date())
    this.gtag('config', this.trakingId);
  }

  public initialize() {
    const script = this.document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${this.trakingId}`;
    script.async = true;
    this.document.head.appendChild(script);
  }

  public config(params: GtagConfigParams): void {
    return this.gtag('config', this.trakingId, params);
  }

  /** @see https://developers.google.com/analytics/devguides/collection/gtagjs/events */
  public event(name: string, params?: GtagEventParams) {
    return this.gtag('event', name, {
      ...params,
      send_to: this.trakingId
    });
  }
}
