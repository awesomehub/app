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
import { Subscription } from 'rxjs'
import { PrimaryRouteComponent, DrawerRouteComponent, AnalyticsService, HelmetService } from './core'
import { ScrollSpyService } from './scroll-spy'

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

  @ViewChild('layout', { static: false }) private layout: ElementRef
  @ViewChild('drawerButton', { static: false }) private drawerButton: ElementRef

  private scroll_: Subscription

  private cd = inject(ChangeDetectorRef)
  private document = inject(DOCUMENT)
  private renderer = inject(Renderer2)
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
    this.scroll_.unsubscribe()
  }
}
