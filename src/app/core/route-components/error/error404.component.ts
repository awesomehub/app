import { Component } from '@angular/core'
import { PrimaryRouteComponent } from '../models'

@Component({
  template: `
    <ah-content>
      <h1>404: Not found!</h1>
      <p>You just hit a route that doesn't exist.</p>
    </ah-content>
  `,
  standalone: false,
})
export class Error404Component extends PrimaryRouteComponent {
  public override helmet = {
    title: 'Page not found',
    meta: [{ name: 'robots', content: 'noindex' }],
  }

  constructor() {
    super(false)
  }
}
