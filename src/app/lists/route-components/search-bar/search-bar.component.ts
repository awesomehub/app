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
  inject,
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
  template: `<input #input type="search" [placeholder]="placeholder" [value]="query" (input)="search($event)" />`,
  styleUrls: ['./search-bar.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class SearchBarRouteComponent extends HeaderBarRouteComponent implements OnInit, AfterViewInit {
  public placeholder = 'Search...'
  public query = ''

  private searchRoute: string
  private cancelRoute: string
  private hasBack = false
  // true when we landed on a search route with a preexisting query and should refocus on load
  private shouldAutoFocus = false
  // remembers we need to restore focus after a navigation triggered by clearing the query
  private focusAfterNavigation = false

  private router = inject(Router)
  private route = inject(ActivatedRoute)
  private store$ = inject(Store)
  private location = inject(Location)
  private cd = inject(ChangeDetectorRef)

  @HostBinding('class') private class = 'list-search-bar'
  @ViewChild('input', { static: false }) private input: ElementRef<HTMLInputElement>

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

  search(e: Event): void {
    const query = (e.target as HTMLInputElement).value
    if (query === '') {
      // clearing the query navigates away; remember to restore focus once routing settles
      this.focusAfterNavigation = true
      this.cancel()
      return
    }

    const path = this.searchRoute
    const queryParams = { q: query }

    if (this.query === '') {
      const state: SearchBarNavState = { focusSearchAgain: true }
      this.router.navigate([path], { queryParams, state })
    } else {
      this.router.navigate([path], { queryParams, replaceUrl: true })
    }

    this.query = query
    this.cd.markForCheck()
  }

  cancel(): void {
    this.query = ''

    // If search is the very first page then go to the $cancelRoute
    if (this.hasBack) {
      this.location.back()
    } else {
      const state: SearchBarNavState = this.focusAfterNavigation ? { focusSearchAgain: true } : undefined
      this.router.navigate([this.cancelRoute], { state })
    }

    this.cd.markForCheck()
  }

  // defers DOM focus until after change detection completes and the router stabilizes
  private queueFocus(): void {
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
