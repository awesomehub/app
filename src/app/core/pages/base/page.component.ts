export interface PageComponent {
  title: string;
  searchTitle?: string;
}

export class BasePage implements PageComponent {
  public title = null;
  public searchTitle = null;
}
