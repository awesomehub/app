import { BehaviorSubject } from 'rxjs';
import { RouteComponent, HelmetDefinition } from '@app/core';

export abstract class PrimaryRouteComponent extends RouteComponent {
  public helmet: HelmetDefinition|BehaviorSubject<HelmetDefinition>;

  protected constructor(createHelmet$ = true) {
    super();

    this.helmet = createHelmet$
      ? new BehaviorSubject<HelmetDefinition>({})
      : {};
  }

  protected updateHelmet(helmet: HelmetDefinition): void {
    if (!(this.helmet instanceof BehaviorSubject)) {
      this.helmet = helmet;
      return;
    }

    this.helmet.next(helmet);
  }
}
