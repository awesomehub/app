import { Component, Input, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

import { ListRepo } from '../../state';
import { ListRepoScoreService } from '../../services';

@Component({
  selector: 'list-repo-card',
  styleUrls: [ './list-repo-card.component.css' ],
  template: `
    <div class="list-repo-inner">
      <div *ngIf="!extendedScores" class="mdl-card__media" (click)="extendedScores=true" title="Show extended scores">
        <div class="score">
            <a>{{repo.score | number}}</a>
            <span *ngIf="repo.score_d !== 0" [scoreDiff]="repo.score_d"></span>
        </div>
        <div class="scores" [style.border-color]="scoreColorLegend[scoreColorLegend.length-1]">
          <span [listRepoScoreStyle]="repo.scores.p" scoreType="p" title="Popularity: {{repo.scores.p}}">P</span>
          <span [listRepoScoreStyle]="repo.scores.h" scoreType="h" title="Hotness: {{repo.scores.h}}">H</span>
          <span [listRepoScoreStyle]="repo.scores.a" scoreType="a" title="Activity: {{repo.scores.a}}">A</span>
          <span [listRepoScoreStyle]="repo.scores.m" scoreType="m" title="Maturity: {{repo.scores.m}}">M</span>
        </div>
      </div>
      <div *ngIf="extendedScores" class="mdl-card__media extended-scores" [style.border-color]="scoreColorLegend[scoreColorLegend.length-1]" (click)="extendedScores=false">
        <div [listRepoScoreStyle]="repo.scores.p" scoreType="p" title="Popularity Score">
            <span class="score-seg">P</span>
            <div class="score-seg-inf">
                {{repo.scores.p | number}}
                <span *ngIf="repo.scores_d.p !== 0" [scoreDiff]="repo.scores_d.p"></span>
            </div>
        </div>
        <div [listRepoScoreStyle]="repo.scores.h" scoreType="h" title="Hotness Score">
            <span class="score-seg">H</span>
            <div class="score-seg-inf">
                {{repo.scores.h | number}}
                <span *ngIf="repo.scores_d.h !== 0" [scoreDiff]="repo.scores_d.h"></span>
            </div>
        </div>
        <div [listRepoScoreStyle]="repo.scores.a" scoreType="a" title="Activity Score">
            <span  class="score-seg">A</span>
            <div  class="score-seg-inf">
                {{repo.scores.a | number}}
                <span *ngIf="repo.scores_d.a !== 0" [scoreDiff]="repo.scores_d.a"></span>
            </div>
        </div>
        <div [listRepoScoreStyle]="repo.scores.m" scoreType="m" title="Maturity Score">
            <span class="score-seg">M</span>
            <div class="score-seg-inf">
                {{repo.scores.m | number}}
                <span *ngIf="repo.scores_d.m !== 0" [scoreDiff]="repo.scores_d.m"></span>
            </div>
        </div>
      </div>
      <div class="mdl-card__supporting-text">
        <h4>
          <a class="repo-author" href="//github.com/{{repo.author}}" title="Visit {{repo.author}}'s profile" target="_blank">{{repo.author}}</a>
          <a class="repo-name" href="//github.com/{{repo.author}}/{{repo.name}}" title="Visit {{repo.author}}/{{repo.name}}" target="_blank">{{repo.name}}</a>
        </h4>
        <span class="repo-desc" [class.no-desc]="!repo.desc.length">
          {{repo.desc || 'No description provided.'}}
        </span>
      </div>
    </div>
    <div class="mdl-card__actions mdl-card--border">
      <a class="meta" title="Language">
        <i class="icon icon-code"></i> {{repo.lang || 'None'}}
      </a>
      <a class="meta" title="Last Pushed">
        <i class="icon icon-repo-pushed"></i> Pushed {{repo.pushed | momentFormat}}
      </a>
      <a class="meta" title="Last Updated">
        <i class="icon icon-pulse"></i> Updated {{repo.updated | momentFormat}}
      </a>
    </div>
`,
  host: {
    'class': 'list-repo-card mdl-card'
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListRepoCardComponent {

  @Input() public repo: ListRepo;
  @Input('extended') public extendedScores: boolean = false;

  public scoreColorLegend: Array<string>;

  constructor(private repoScoreService: ListRepoScoreService) {
    this.scoreColorLegend = repoScoreService.getScoreColors();
  }
}
