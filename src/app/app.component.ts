import {
  Component, Inject, ViewChild, AfterViewChecked, AfterViewInit,
  ViewEncapsulation, ChangeDetectionStrategy, ElementRef, Renderer2
} from '@angular/core';
import { DOCUMENT } from "@angular/common";
import { Store } from '@ngrx/store';

import { config } from '@constants';
import { AppState } from '@app';
import { TitleService, PrimaryRouteComponent, DrawerRouteComponent, AnalyticsService } from '@app/core';

@Component({
  selector: 'ah-root',
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements AfterViewChecked, AfterViewInit {
  public logo = config.appname;
  public drawer: DrawerRouteComponent;

  @ViewChild('layout', { static: false }) private layout: ElementRef;
  @ViewChild('drawerButton', { static: false }) private drawerButton: ElementRef;

  constructor (
    private store$: Store<AppState>,
    private titleService: TitleService,
    private renderer: Renderer2,
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
   * Updates the page title after appending the site name to the
   *  component title.
   *
   *  @param title string The component title
   */
  setPageTitle(title: string) {
    let pageTitle = config.appname;
    if (title) {
      pageTitle = title + ' - ' + pageTitle;
    }

    this.titleService.setTitle(pageTitle);
  }

  /**
   * Triggered when the main outlet is activated
   *
   * @param component PrimaryRouteComponent
   */
  onActivation(component: PrimaryRouteComponent) {
    this.setPageTitle(component.title);
  }

  /**
   * Triggered when the main outlet is deactivated
   *
   * @param component PageComponent
   */
  onDeactivation(component: PrimaryRouteComponent) { }

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
