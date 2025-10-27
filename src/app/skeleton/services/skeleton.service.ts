import { Injectable, inject, QueryList } from '@angular/core'
import { Router, ActivationEnd, ActivationStart, NavigationStart } from '@angular/router'
import { Subscription } from 'rxjs'
import { filter } from 'rxjs/operators'
import { SkeletonOutletDirective } from '../directives'

@Injectable()
export class SkeletonService {
  private router = inject(Router)
  private router_: Subscription
  private resolved = false

  initialize(list: QueryList<SkeletonOutletDirective>) {
    const skeletons = Object.fromEntries(list.map((comp) => [comp.name, comp]))
    this.router_ = this.router.events
      .pipe(filter((e) => e instanceof NavigationStart || e instanceof ActivationStart || e instanceof ActivationEnd))
      .subscribe((e) => {
        if (e instanceof NavigationStart) {
          if (this.resolved) this.destroy()
          else this.resolved = true
          return
        }

        const { data, outlet } = e.snapshot
        const skeleton = skeletons[outlet]
        if (skeleton === undefined) {
          return
        }

        const skeletonComp = data['skeleton']
        if (skeletonComp == null) {
          return
        }

        if (e instanceof ActivationStart) {
          skeleton.attach(skeletonComp)
          return
        }

        skeleton.clear()
      })
  }

  destroy() {
    this.router_.unsubscribe()
  }
}
