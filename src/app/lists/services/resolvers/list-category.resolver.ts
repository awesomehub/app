import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { List, ListCategory } from '@app/lists';

@Injectable()
export class ListCategoryDataResolver implements Resolve<any> {
  constructor(private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): ListCategory | boolean {
    let list: List = route.parent.data['list'];
    let category = list.cats.find(c => c.path === route.params['category']);
    if (!category) {
      this.router.navigate(['404']);
      return false;
    }

    return category;
  }
}
