import { Component } from '@angular/core';

import { PrimaryRouteComponent } from '../models';

@Component({
  template: `
    <content>
      <h1>404: page not found!</h1>
      <p>
        The page you're looking for doesn't exist.
      </p>
    </content>
  `
})
export class Error404Component extends PrimaryRouteComponent {
  public title = 'Page not found';
}
