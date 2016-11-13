import { Component } from '@angular/core';

import { BasePage } from '../base';

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
export class Error404Page extends BasePage {
  title = 'Page not found';
}
