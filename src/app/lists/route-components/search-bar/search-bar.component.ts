import 'rxjs/add/operator/withLatestFrom';

import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { go, replace, back } from '@ngrx/router-store';

import { AppState } from '../../../app.state';
import { HeaderBarRouteComponent, getRouterPath } from '../../../core';

@Component({
  template: `
    <input #input type="search" [placeholder]="placeholder"
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

  public placeholder: string = 'Search...';
  public query: string = '';

  private searchRoute: string;
  private cancelRoute: string;
  private hasBack: boolean = false;

  @ViewChild('input') private input: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private store$: Store<AppState>,
    private cd: ChangeDetectorRef) {
    super();
  }

  ngOnInit() {
    // Prevents input focus getting lost during typing due to component re-initiation
    this.input.nativeElement.focus();

    this.route.data.forEach(({placeholder, searchRoute, cancelRoute, list}) => {
      this.placeholder = placeholder;
      if (list) {
        this.searchRoute = searchRoute.replace('{{id}}', list.id);
        this.cancelRoute = cancelRoute.replace('{{id}}', list.id);
      } else {
        this.searchRoute = searchRoute;
        this.cancelRoute = cancelRoute;
      }
      this.cd.markForCheck();
    });

    this.store$
      .let(getRouterPath())
      .withLatestFrom(this.route.data, this.route.queryParams)
      .forEach(([url, {searchRouteMatch}, {q}]) => {
        const isSearch = new RegExp(searchRouteMatch).test(<string>url);
        if(!isSearch){
          this.hasBack = true;
        }
        this.query = isSearch ? q || '' : '';
        this.cd.markForCheck();
      });
  }

  search(query: string): void {
    if (query === '') {
      this.cancel();
      return;
    }

    const path = [this.searchRoute];
    const params = {q: query};
    const action = this.query === ''
      ? go(path, params)
      : replace(path, params);
    this.query = query;
    this.store$.dispatch(action);
    this.cd.markForCheck();
  }

  cancel(): void {
    this.query = '';
    // If search is the very first page then go to the $cancelRoute
    const action = this.hasBack
      ? back()
      : go([this.cancelRoute]);
    this.store$.dispatch(action);
    this.cd.markForCheck();
  }
}
