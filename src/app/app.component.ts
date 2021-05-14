import { Component, OnInit, AfterViewChecked, ViewEncapsulation, ChangeDetectionStrategy, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './app.state';
import { AppConfig } from './app.config';
import { TitleService, PrimaryRouteComponent, DrawerRouteComponent } from './core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, AfterViewChecked {

  public title: string;
  public drawer: DrawerRouteComponent;

  @ViewChild('layout', { static: false }) private layout: ElementRef;
  @ViewChild('drawerButton', { static: false }) private drawerButton: ElementRef;

  constructor (
    private store$: Store<AppState>,
    private titleService: TitleService,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.setHeaderTitle(AppConfig.NAME);
  }

  ngAfterViewChecked() {
    // Run MDL after each render to update any new elements added
    if ('componentHandler' in window) {
      window.componentHandler.upgradeAllRegistered()
    }
  }

  /**
   * Toggles current drawer state.
   *
   * It does this by triggering the click event of the MDL drawer button
   *  which we hide it in the markup.
   */
  toggleDrawer() {
    if (!this.drawer) {
      return false;
    }

    const layout: Element = this.layout.nativeElement;
    const drawerButton: Element = this.drawerButton.nativeElement;

    if (-1 === layout.className.indexOf('is-small-screen')) {
      return false;
    }

    this.renderer.selectRootElement(drawerButton).click();
  }

  /**
   * Updates header title.
   *
   *  @param title string The component title
   */
  setHeaderTitle(title: string) {
    this.title = title;
  }

  /**
   * Updates the page title after appending the site name to the
   *  component title.
   *
   *  @param title string The component title
   */
  setPageTitle(title: string) {
    let pageTitle = AppConfig.NAME;
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
