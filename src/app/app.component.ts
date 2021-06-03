import {
  Component, Inject, ViewChild, AfterViewChecked, AfterViewInit,
  ViewEncapsulation, ChangeDetectionStrategy, ElementRef, Renderer2
} from '@angular/core';
import { DOCUMENT } from "@angular/common";
import { Store } from '@ngrx/store';

import { AppState } from '@app';
import { PrimaryRouteComponent, DrawerRouteComponent, AnalyticsService, HelmetService } from '@app/core';

@Component({
  selector: 'ah-root',
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements AfterViewChecked, AfterViewInit {
  public drawer: DrawerRouteComponent;

  @ViewChild('layout', { static: false }) private layout: ElementRef;
  @ViewChild('drawerButton', { static: false }) private drawerButton: ElementRef;

  constructor (
    private store$: Store<AppState>,
    private renderer: Renderer2,
    private helmetService: HelmetService,
    private analyticsService: AnalyticsService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngAfterViewChecked() {
    // Run MDL after each render to upgrade any new elements added
    const { componentHandler } = this.document.defaultView
    if (componentHandler) {
      componentHandler.upgradeAllRegistered()
    }
  }

  ngAfterViewInit() {
    this.analyticsService.initialize()
  }

  /**
   * Toggles current drawer state.
   *
   * It does this by triggering the click event of the MDL drawer button
   *  which we hide it in the markup.
   */
  toggleDrawer() {
    if (!this.drawer) {
      return;
    }

    const layout: Element = this.layout.nativeElement;
    const drawerButton: Element = this.drawerButton.nativeElement;

    if (-1 === layout.className.indexOf('is-small-screen')) {
      return;
    }

    this.renderer.selectRootElement(drawerButton).click();
  }

  /**
   * Triggered when the main outlet is activated
   *
   * @param component PrimaryRouteComponent
   */
  onActivation(component: PrimaryRouteComponent) {
    this.helmetService.apply(component.helmet);
  }

  /**
   * Triggered when the main outlet is deactivated
   *
   * @param component PageComponent
   */
  onDeactivation(component: PrimaryRouteComponent) {
    this.helmetService.unsubscribe();
  }

  /**
   * Triggered when the drawer outlet is activated
   *
   * @param component DrawerRouteComponent
   */
  onDrawerActivation(component: DrawerRouteComponent) {
    this.drawer = component;
  }

  /**
   * Triggered when the drawer outlet is deactivated
   *
   * @param component DrawerRouteComponent
   */
  onDrawerDeactivation(component: DrawerRouteComponent) {
    this.drawer = null;
  }
}
