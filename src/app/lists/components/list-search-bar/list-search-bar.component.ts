import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Input, Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'list-search-bar',
  template: `
    <input type="search" class="search-input" 
      [placeholder]="placeholder || 'Search Lists...'"
      [value]="query"
      (input)="dosearch.emit($event.target.value)"
      autofocus />
`,
  styleUrls: ['./list-search-bar.component.css'],
  host: {
    'class': 'list-search-bar',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListSearchBarComponent {
  @Input() query: string;
  @Input() placeholder: string;
  @Output() dosearch = new EventEmitter(false);
}
