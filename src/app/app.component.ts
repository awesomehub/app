import {
  Component,
  ViewChild,
  AfterViewChecked,
  AfterViewInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ElementRef,
  Renderer2,
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
  public drawer: DrawerRouteComponent
  public drawerSkeleton = null
  public scrollPastFold: boolean
  public initialNavigation = true
  public currentRoute?: string
  public entryRoute?: string
  public breadcrumbs: readonly AppBreadcrumbSegment[] = []

  @ViewChild('layout', { static: false }) private layout: ElementRef
  @ViewChild('drawerButton', { static: false }) private drawerButton: ElementRef
  @ViewChildren(SkeletonOutletDirective) skeletons: QueryList<SkeletonOutletDirective>

  private scroll_: Subscription
  private router_: Subscription

  private cd = inject(ChangeDetectorRef)
  private document = inject(DOCUMENT)
  private renderer = inject(Renderer2)
  private router = inject(Router)
  private skeleton = inject(SkeletonService)
  private helmet = inject(HelmetService)
  private scrollSpy = inject(ScrollSpyService)
  private analytics = inject(AnalyticsService)

  ngAfterViewChecked() {
    // Run MDL after each render to upgrade any new elements added
    const { componentHandler } = this.document.defaultView
    if (componentHandler) {
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
        if (this.entryRoute !== this.currentRoute) {
          this.initialNavigation = false
        }
        this.breadcrumbs = this.buildBreadcrumbs(urlAfterRedirects)
        this.cd.markForCheck()
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

    const layout: Element = this.layout.nativeElement
    const drawerButton: Element = this.drawerButton.nativeElement

    if (-1 === layout.className.indexOf('is-small-screen')) {
      return
    }

    this.renderer.selectRootElement(drawerButton).click()
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
