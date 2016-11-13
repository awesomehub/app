import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Injectable()
export class ListsSearchService {

  public query: string = '';
  public searchTitle: string = '';
  public cancelUrl: string = '/';

  constructor(private router: Router) {
    this.connectRouter();
  }

  connectRouter(): void {
    this.router.events
      .filter((event: NavigationEnd) => event instanceof NavigationEnd)
      .subscribe((event: NavigationEnd) => {
        if (/^\/\?q=/.test(event.url)) {
          this.query = this.router.routerState.snapshot.root.queryParams['q'];
        } else {
          if (this.query) {
            this.query = '';
          }

          this.cancelUrl = event.url;
        }
      });
  }

  search(query: string): void {
    if (query === '') {
      this.cancel();
      return;
    }

    this.router.navigate([''], {
      queryParams: {
        q: query
      }
    });
  }

  cancel(): void {
    this.router.navigateByUrl(this.cancelUrl);
  }

  setSearchTitle(title: string): void {
    this.searchTitle = title;
  }
}
