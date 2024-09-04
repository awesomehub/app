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
      .forEach(
        ([
          {
            url,
            queryParams: { q },
          },
          { searchRouteMatch },
        ]) => {
          const isSearch = new RegExp(searchRouteMatch).test(url as string)
          if (!isSearch) {
            this.hasBack = true
          }
          this.query = isSearch ? q || '' : ''
          this.cd.markForCheck()
        },
      )
  }

  ngAfterViewInit() {
    // Prevents input focus getting lost during typing due to component re-initiation
    this.input.nativeElement.focus()
  }

  search(query: string): void {
    if (query === '') {
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
    this.hasBack ? this.location.back() : this.router.navigate([this.cancelRoute])

    this.cd.markForCheck()
  }
}
