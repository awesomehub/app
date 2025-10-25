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
} from '@angular/core'
import { Router, NavigationEnd } from '@angular/router'
import { Subscription } from 'rxjs'
import { filter } from 'rxjs/operators'
import { PrimaryRouteComponent, DrawerRouteComponent, AnalyticsService, HelmetService } from './core'
import { ScrollSpyService } from './scroll-spy'

interface AppBreadcrumbSegment {
  label: string
  route: string[]
}

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
  public scrollPastFold: boolean
  public currentRoute = '/'
  public entryRoute = '/'
  public breadcrumbs: readonly AppBreadcrumbSegment[] = []

  @ViewChild('layout', { static: false }) private layout: ElementRef
  @ViewChild('drawerButton', { static: false }) private drawerButton: ElementRef

  private scroll_: Subscription
  private router_: Subscription

  private cd = inject(ChangeDetectorRef)
  private document = inject(DOCUMENT)
  private renderer = inject(Renderer2)
  private router = inject(Router)
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
    this.analytics.initialize()
    this.router_ = this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(({ urlAfterRedirects }) => {
        this.entryRoute ??= urlAfterRedirects
        this.currentRoute = urlAfterRedirects
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

  /**
   * Triggered when the main outlet is deactivated
   *
   * @param component PageComponent
   */
  onDeactivation(component: PrimaryRouteComponent) {
    this.helmet.unsubscribe()
  }

  /**
   * Triggered when the drawer outlet is activated
   *
   * @param component DrawerRouteComponent
   */
  onDrawerActivation(component: DrawerRouteComponent) {
    this.drawer = component
  }

  /**
   * Triggered when the drawer outlet is deactivated
   *
   * @param component DrawerRouteComponent
   */
  onDrawerDeactivation(component: DrawerRouteComponent) {
    this.drawer = null
  }

  ngOnDestroy() {
    this.router_.unsubscribe()
    this.scroll_.unsubscribe()
  }

  private buildBreadcrumbs(url: string): AppBreadcrumbSegment[] {
    // @todo a bit hacky because list category routes url-encoded, need to fix
    const segments = decodeURIComponent(url).split('/').filter(Boolean)
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
