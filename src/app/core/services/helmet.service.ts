import { Inject, Injectable } from '@angular/core';
import { DOCUMENT, ɵDomAdapter as DomAdapter, ɵgetDOM as getDOM } from "@angular/common";
import { MetaDefinition } from '@angular/platform-browser';

import { config } from '@constants';
import { Observable, Subscription } from "rxjs";

export interface HelmetDefinition {
  title?: string;
  description?: string;
  meta?: MetaDefinition[];
}

@Injectable()
export class HelmetService {
  private _dom: DomAdapter;
  private _helmet: Subscription;

  constructor(@Inject(DOCUMENT) private _doc: Document) {
    this._dom = getDOM();
  }

  public apply(helmet: HelmetDefinition|Observable<HelmetDefinition>): void {
    if (helmet instanceof Observable) {
      this._helmet = helmet.subscribe({
        next: value => this.applyDefinition(value)
      });

      return;
    }

    this.applyDefinition(helmet);
  }

  public unsubscribe() {
    if (this._helmet){
      this._helmet.unsubscribe();
      this._helmet = null;
    }
  }

  private applyDefinition(helmet: HelmetDefinition): void {
    const { title, description, meta = [] } = helmet;

    if (description !== undefined) {
      meta.unshift(
        { name: 'description', content: description },
        { property: 'og:description', content: description },
      );
    }

    if (title !== undefined) {
      this._doc.title = title ? title + ' - ' + config.appname : config.appname;
      meta.unshift({ property: 'og:title', content: this._doc.title });
    }

    if (meta.length) {
      const fragElem = this._doc.createDocumentFragment();
      meta.forEach(tag => {
        const props = Object.keys(tag);
        const attr = tag.name ? 'name' : 'property';
        let elem: HTMLMetaElement = this._doc.querySelector(`meta[${attr}="${tag[attr]}"]`);

        if (elem) {
          // If the MetaDefinition has no content, remove the corresponding tag
          if (!tag.content && typeof tag.content !== 'string') {
            return this._dom.remove(elem);
          }
          // Remove obsolete props
          elem.getAttributeNames().forEach((prop: string) => {
            if (props.indexOf(prop) === -1) {
              elem.removeAttribute(prop);
            }
          });
        } else {
          elem = this._dom.createElement('meta') as HTMLMetaElement;
        }

        props.forEach((prop: string) => elem.setAttribute(prop, tag[prop]));
        fragElem.appendChild(elem);
      });

      // Insert right after <base> element
      const baseElem = this._doc.getElementsByTagName('base')[0];
      baseElem.parentNode.insertBefore(fragElem, baseElem.nextSibling);
    }
  }
}
