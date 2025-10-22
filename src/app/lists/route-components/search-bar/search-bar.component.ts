import {
  Component,
  OnInit,
  AfterViewInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewChild,
  HostBinding,
  ElementRef,
} from '@angular/core'
import { Location } from '@angular/common'
import { ActivatedRoute, Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { withLatestFrom, distinctUntilChanged } from 'rxjs/operators'
import { HeaderBarRouteComponent, selectRouterState } from '@app/core'

interface SearchBarNavState extends Record<string, unknown> {
  focusSearchAgain?: boolean
}

@Component({
  template: `
    <input #input type="search" [placeholder]="placeholder" [value]="query" (input)="search($event.target.value)" />
  `,
  styleUrls: ['./search-bar.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarRouteComponent extends HeaderBarRouteComponent implements OnInit, AfterViewInit {
  public placeholder = 'Search...'
  public query = ''

  private searchRoute: string
  private cancelRoute: string
  private hasBack = false
  // true when we landed on a search route with a preexisting query and should refocus on load
  private shouldAutoFocus = false
  // prevents queueFocus from triggering multiple setTimeout focus calls in quick succession
  private focusPending = false
  // remembers we need to restore focus after a navigation triggered by clearing the query
  private focusAfterNavigation = false

  @HostBinding('class') private class = 'list-search-bar'
  @ViewChild('input', { static: false }) private input: ElementRef

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store$: Store,
    private location: Location,
    private cd: ChangeDetectorRef,
  ) {
    super()
  }

  ngOnInit() {
    const navigationState = this.location.getState() as SearchBarNavState | undefined
    if (navigationState?.focusSearchAgain) {
      this.focusAfterNavigation = true
    }

    this.route.data.forEach(({ placeholder, searchRoute, cancelRoute, list }) => {
      this.placeholder = placeholder
      if (list) {
        this.searchRoute = searchRoute.replace('{{id}}', list.id)
        this.cancelRoute = cancelRoute.replace('{{id}}', list.id)
      } else {
        this.searchRoute = searchRoute
        this.cancelRoute = cancelRoute
      }
      this.cd.markForCheck()
    })

    this.store$
      .select(selectRouterState)
      .pipe(distinctUntilChanged(), withLatestFrom(this.route.data))
      .forEach(([routerState, resolvedData]) => {
        const { url, queryParams } = routerState
        const { searchRouteMatch } = resolvedData
        const isSearch = new RegExp(searchRouteMatch).test(url)
        if (!isSearch) {
          this.hasBack = true
        }
        this.query = isSearch ? queryParams['q'] || '' : ''
        this.shouldAutoFocus = isSearch && this.query.length > 0
        if (this.shouldAutoFocus || this.focusAfterNavigation) {
          this.queueFocus()
        }
        this.cd.markForCheck()
      })
  }

  ngAfterViewInit() {
    if (this.shouldAutoFocus || this.focusAfterNavigation) {
      this.queueFocus()
    }
  }

  search(query: string): void {
    if (query === '') {
      // clearing the query navigates away; remember to restore focus once routing settles
      this.focusAfterNavigation = true
      this.cancel()
      return
    }

    const path = this.searchRoute
    const queryParams = { q: query }

    this.query === ''
      ? this.router.navigate([path], { queryParams })
      : this.router.navigate([path], { queryParams, replaceUrl: true })

    this.query = query
    this.cd.markForCheck()
  }

  cancel(): void {
    this.query = ''

    // If search is the very first page then go to the $cancelRoute
    if (this.hasBack) {
      this.location.back()
    } else {
      const navigationExtras = this.focusAfterNavigation ? { state: { focusSearchAgain: true } } : undefined
      this.router.navigate([this.cancelRoute], navigationExtras)
    }

    this.cd.markForCheck()
  }

  // defers DOM focus until after change detection completes and the router stabilizes
  private queueFocus(): void {
    if (this.focusPending) {
      return
    }
    this.focusPending = true
    setTimeout(() => {
      this.focusPending = false
      const shouldFocus = this.shouldAutoFocus || this.focusAfterNavigation
      if (!shouldFocus || !this.input) {
        return
      }
      // consume the deferred focus flag so we only refocus once
      if (this.focusAfterNavigation) {
        this.clearFocusNavigationState()
      }
      this.focusAfterNavigation = false
      this.input.nativeElement.focus()
    })
  }

  // removes the transient focus flag from history.state so reloads don't reapply it
  private clearFocusNavigationState(): void {
    const state = this.location.getState() as SearchBarNavState | undefined
    if (!state || !('focusSearchAgain' in state)) {
      return
    }

    const { focusSearchAgain: _, ...rest } = state
    const [pathOnly, query = ''] = this.location.path().split('?')
    const nextState = Object.keys(rest).length > 0 ? rest : undefined
    this.location.replaceState(pathOnly, query, nextState)
  }
}
