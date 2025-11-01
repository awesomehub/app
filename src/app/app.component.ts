import {
  Component,
  ViewChild,
  AfterViewChecked,
  AfterViewInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ElementRef,
  DOCUMENT,
  inject,
  OnDestroy,
  ChangeDetectorRef,
  ViewChildren,
  QueryList,
} from '@angular/core'
import { Router, NavigationEnd } from '@angular/router'
import { Subscription } from 'rxjs'
import { filter } from 'rxjs/operators'
import { PrimaryRouteComponent, DrawerRouteComponent, AnalyticsService, HelmetService } from './core'
import { ScrollSpyService } from './scroll-spy'
import { SkeletonOutletDirective, SkeletonService } from './skeleton'

@Component({
  selector: 'ah-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class AppComponent implements AfterViewChecked, AfterViewInit, OnDestroy {
  protected drawer: DrawerRouteComponent
  protected drawerSkeleton = null
  protected scrollPastFold: boolean
  protected initialNavigation = true
  protected currentRoute?: string
  protected entryRoute?: string
  protected breadcrumbs: readonly AppBreadcrumbSegment[] = []

  @ViewChild('layout', { static: true }) private layout: ElementRef<HTMLDivElement>
  @ViewChild('drawerButton', { static: true }) private drawerButton: ElementRef<HTMLButtonElement>
  @ViewChildren(SkeletonOutletDirective) private skeletons: QueryList<SkeletonOutletDirective>

  private scroll_: Subscription
  private router_: Subscription

  private cd = inject(ChangeDetectorRef)
  private document = inject(DOCUMENT)
  private router = inject(Router)
  private skeleton = inject(SkeletonService)
  private helmet = inject(HelmetService)
  private scrollSpy = inject(ScrollSpyService)
  private analytics = inject(AnalyticsService)

  ngAfterViewChecked() {
    // Run MDL after each render to upgrade any new elements added
    const { componentHandler } = this.document.defaultView
    if (componentHandler) {
      componentHandler.registerUpgradedCallback('MaterialLayout', (elm) => {
        // this callback runs once after MDL is loaded
        // It's necessary to remove invalid `aria-hidden: true` on desktop
        requestAnimationFrame(() => {
          if (!elm.classList.contains('is-small-screen')) {
            elm.MaterialLayout.drawer_.removeAttribute('aria-hidden')
          }
        })
      })
      componentHandler.upgradeAllRegistered()
    }
  }

  ngAfterViewInit() {
    this.skeleton.initialize(this.skeletons)
    this.analytics.initialize()
    this.router_ = this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(({ urlAfterRedirects }) => {
        this.entryRoute ??= urlAfterRedirects
        this.currentRoute = urlAfterRedirects
        this.breadcrumbs = this.buildBreadcrumbs(urlAfterRedirects)
        this.cd.markForCheck()
        if (this.initialNavigation) {
          setTimeout(() => {
            this.initialNavigation = false
            this.cd.markForCheck()
          }, 500)
        }
      })
    this.scroll_ = this.scrollSpy
      .getScrollData(500, 'throttle')
      .subscribe(({ windowPageYOffset, windowInnerHeight }) => {
        const condition = windowPageYOffset > windowInnerHeight
        if (condition !== this.scrollPastFold) {
          this.scrollPastFold = condition
          this.cd.markForCheck()
        }
      })
  }

  isInitialNavigation() {
    return this.initialNavigation
  }

  /**
   * Toggles current drawer state.
   *
   * It does this by triggering the click event of the MDL drawer button
   *  which we hide it in the markup.
   */
  toggleDrawer() {
    if (!this.drawer) {
      return
    }

    const layout = this.layout.nativeElement
    const drawerButton = this.drawerButton.nativeElement

    if (!layout.classList.contains('is-small-screen')) {
      return
    }

    // trigger MDL drawer click handler
    drawerButton.click()
  }

  scrollTop() {
    this.layout.nativeElement.scrollIntoView({ behavior: 'smooth' })
  }

  /**
   * Triggered when the main outlet is activated
   *
   * @param component PrimaryRouteComponent
   */
  onActivation(component: PrimaryRouteComponent) {
    this.helmet.apply(component.helmet)
  }

  onDeactivation() {
    this.helmet.unsubscribe()
  }

  onDrawerActivation(component: DrawerRouteComponent) {
    this.drawer = component
  }

  onDrawerSkeletonActivation(component: any) {
    this.drawerSkeleton = component
  }

  onDrawerDeactivation() {
    this.drawer = null
  }

  onDrawerSkeletonDeactivation() {
    this.drawerSkeleton = null
  }

  ngOnDestroy() {
    this.router_.unsubscribe()
    this.scroll_.unsubscribe()
    this.skeleton.destroy()
  }

  private buildBreadcrumbs(url: string): AppBreadcrumbSegment[] {
    const segments = url.split('?')[0].split('/').filter(Boolean)
    const breadcrumbs: AppBreadcrumbSegment[] = []
    const pathSegments: string[] = []

    for (const segment of segments) {
      pathSegments.push(segment)
      if (segment === 'list') {
        // Skip the ^/list/ segment when rendering breadcrumbs
        continue
      }

      breadcrumbs.push({
        label: segment,
        route: ['/', ...pathSegments],
      })
    }

    return breadcrumbs
  }
}

interface AppBreadcrumbSegment {
  label: string
  route: string[]
}
