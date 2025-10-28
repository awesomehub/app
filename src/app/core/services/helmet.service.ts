import { Injectable, inject, DOCUMENT } from '@angular/core'
import { ɵDomAdapter as DomAdapter, ɵgetDOM as getDOM } from '@angular/common'
import { MetaDefinition } from '@angular/platform-browser'
import { Router } from '@angular/router'
import { Observable, Subscription } from 'rxjs'
import { config, environment } from '@constants'

export interface HelmetDefinition {
  title?: string
  description?: string
  meta?: MetaDefinition[]
}

@Injectable()
export class HelmetService {
  private readonly router: Router = inject(Router)
  private readonly doc: Document = inject(DOCUMENT)
  private readonly dom: DomAdapter
  private helmet_: Subscription

  constructor() {
    this.dom = getDOM()
  }

  public apply(helmet: HelmetDefinition | Observable<HelmetDefinition>): void {
    if (helmet instanceof Observable) {
      this.helmet_ = helmet.subscribe({
        next: (value) => this.applyDefinition(value),
      })

      return
    }

    this.applyDefinition(helmet)
  }

  public unsubscribe() {
    if (this.helmet_) {
      this.helmet_.unsubscribe()
      this.helmet_ = null
    }
  }

  private applyDefinition(helmet: HelmetDefinition): void {
    const { title, description, meta = [] } = helmet

    const canUrl = environment.baseUrl + (this.router.url === '/' ? '' : this.router.url)
    meta.unshift({ rel: 'canonical', href: canUrl })
    meta.unshift({ property: 'og:url', content: canUrl })

    if (description !== undefined) {
      meta.unshift({ name: 'description', content: description }, { property: 'og:description', content: description })
    }

    if (title !== undefined) {
      this.doc.title = title ? title + ' - ' + config.name : config.name
      meta.unshift({ property: 'og:title', content: this.doc.title })
    }

    if (meta.length) {
      const fragElem = this.doc.createDocumentFragment()
      meta.forEach((tag) => {
        const props = Object.keys(tag)
        const attr = tag['rel'] ? 'rel' : tag.name ? 'name' : 'property'
        let elem: HTMLMetaElement = this.doc.querySelector(`meta[${attr}="${tag[attr]}"]`)

        if (elem) {
          // If the MetaDefinition has no content, remove the corresponding tag
          if ((attr === 'rel' && !tag['href']) || (attr !== 'rel' && !tag.content)) {
            return this.dom.remove(elem)
          }
          // Remove obsolete props
          elem.getAttributeNames().forEach((prop: string) => {
            if (props.indexOf(prop) === -1) {
              elem.removeAttribute(prop)
            }
          })
        } else {
          elem = this.dom.createElement('meta') as HTMLMetaElement
        }

        props.forEach((prop: string) => elem.setAttribute(prop, tag[prop]))
        fragElem.appendChild(elem)
      })

      // Insert right after <base> element
      const baseElem = this.doc.getElementsByTagName('base')[0]
      baseElem.parentNode.insertBefore(fragElem, baseElem.nextSibling)
    }
  }
}
