import { Component } from '@angular/core';

import { PrimaryRouteComponent } from '../models';

@Component({
  template: `
      <ah-content>
          <h1>404: page not found!</h1>
          <p>
              The page you're looking for doesn't exist.
          </p>
      </ah-content>
  `
})
export class Error404Component extends PrimaryRouteComponent {
  public helmet = {
    title: 'Page not found',
    meta: [
      { name: 'robots', content: 'noindex' }
    ]
  };

  constructor() {
    super(false);
  }
}
