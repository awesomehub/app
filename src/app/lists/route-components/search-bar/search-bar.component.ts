import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { go, replace, back } from '@ngrx/router-store';

import { AppState } from '../../../app.state';
import { HeaderBarRouteComponent } from '../../../core';

@Component({
  template: `
    <input type="search" class="search-input" 
      [placeholder]="'Search Lists...'"
      [value]="query"
      (input)="search($event.target.value)" />
`,
  styleUrls: ['./search-bar.component.css'],
  host: {
    'class': 'list-search-bar',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchBarRouteComponent extends HeaderBarRouteComponent implements OnInit {

  public query: string = '';

  private searchRoute: string[] = [''];
  private cancelRoute: string[] = [''];

  constructor(
    private route: ActivatedRoute,
    private store$: Store<AppState>,
    private cd: ChangeDetectorRef) {
    super();
  }

  ngOnInit() {
    this.route.queryParams.forEach(({q}) => {
      this.query = q || '';
      this.cd.markForCheck();
    });
  }

  search(query: string): void {
    if (query === '') {
      this.cancel();
      return;
    }

    const params = { q: query };
    const action = this.query === ''
      ? go(this.searchRoute, params)
      : replace(this.searchRoute, params);
    this.query = query;
    this.store$.dispatch(action);
    this.cd.markForCheck();
  }

  cancel(): void {
    this.query = '';
    // If search is the very first page then go to the $cancelRoute
    const action = document.referrer
      ? back()
      : go(this.cancelRoute);
    this.store$.dispatch(action);
    this.cd.markForCheck();
  }
}
