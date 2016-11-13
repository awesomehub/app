import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, ViewChild, ElementRef, Renderer } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';

import { AppConfig } from './app.config';
import { TitleService, PageComponent, AuxDrawerComponent } from './core';
import { ListsSearchService } from './lists';

// App-wide Styles
import '../public/assets/css/main.css';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  public title: string;
  public drawer: AuxDrawerComponent;

  @ViewChild('layout') private layout: ElementRef;
  @ViewChild('drawerButton') private drawerButton: ElementRef;

  constructor (
    private router: Router,
    private titleService: TitleService,
    public searchService: ListsSearchService,
    public renderer: Renderer,
  ) {}

  ngOnInit() {
    this.router.events.subscribe((e: Event) => {
      if (e instanceof NavigationEnd) {
        // Run MDL componentHandler for any new elements added dynamically
        if (e.id > 1 && 'componentHandler' in window) {
          window.componentHandler.upgradeAllRegistered();
        }
      }
    });

    this.setHeaderTitle(AppConfig.NAME);
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

    this.renderer.invokeElementMethod(drawerButton, 'click');
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
   * Updates the Search title.
   *
   *  @param title string The Search title
   */
  setSearchTitle(title: string) {
    this.searchService.setSearchTitle(title);
  }

  /**
   * Triggered when the main router outlet is activated
   *
   * @param component PageComponent
   */
  onActivation(component: PageComponent) {
    this.setPageTitle(component.title);

    if ('searchTitle' in component) {
      this.setSearchTitle(component.searchTitle);
    }
  }

  /**
   * Triggered when the main router outlet is deactivated
   *
   * @param component PageComponent
   */
  onDeactivation(component: PageComponent) { }

  /**
   * Triggered when the aux router outlet is activated
   *
   * @param component AuxDrawerComponent
   */
  onAuxActivation(component: AuxDrawerComponent) {
    this.drawer = component;
  }

  /**
   * Triggered when the main router outlet is deactivated
   *
   * @param component AuxDrawerComponent
   */
  onAuxDeactivation(component: AuxDrawerComponent) {
    this.drawer = null;
  }
}
