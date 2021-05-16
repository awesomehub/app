import { Component, Input, ViewEncapsulation, ChangeDetectionStrategy, HostBinding } from '@angular/core';
import { ListRepo, ListRepoScoreService } from '@app/lists';

@Component({
  selector: 'ah-list-repo-card',
  styleUrls: [ './list-repo-card.component.css' ],
  template: `
      <div class="list-repo-inner">
          <div *ngIf="!extendedScores" class="mdl-card__media" (click)="extendedScores=true"
               title="Show extended scores">
              <div class="score">
                  <a>{{repo.score | number}}</a>
                  <span *ngIf="repo.score_d !== 0" [ahScoreDiff]="repo.score_d"></span>
              </div>
              <div class="scores" [style.border-color]="scoreColorLegend[scoreColorLegend.length-1]">
                  <span [ahListRepoScoreStyle]="repo.scores.p" scoreType="p"
                        title="Popularity: {{repo.scores.p}}">P</span>
                  <span [ahListRepoScoreStyle]="repo.scores.h" scoreType="h" title="Hotness: {{repo.scores.h}}">H</span>
                  <span [ahListRepoScoreStyle]="repo.scores.a" scoreType="a"
                        title="Activity: {{repo.scores.a}}">A</span>
                  <span [ahListRepoScoreStyle]="repo.scores.m" scoreType="m"
                        title="Maturity: {{repo.scores.m}}">M</span>
              </div>
          </div>
          <div *ngIf="extendedScores" class="mdl-card__media extended-scores"
               [style.border-color]="scoreColorLegend[scoreColorLegend.length-1]" (click)="extendedScores=false">
              <div [ahListRepoScoreStyle]="repo.scores.p" scoreType="p" title="Popularity Score">
                  <span class="score-seg">P</span>
                  <div class="score-seg-inf">
                      {{repo.scores.p | number}}
                      <span *ngIf="repo.scores_d.p !== 0" [ahScoreDiff]="repo.scores_d.p"></span>
                  </div>
              </div>
              <div [ahListRepoScoreStyle]="repo.scores.h" scoreType="h" title="Hotness Score">
                  <span class="score-seg">H</span>
                  <div class="score-seg-inf">
                      {{repo.scores.h | number}}
                      <span *ngIf="repo.scores_d.h !== 0" [ahScoreDiff]="repo.scores_d.h"></span>
                  </div>
              </div>
              <div [ahListRepoScoreStyle]="repo.scores.a" scoreType="a" title="Activity Score">
                  <span class="score-seg">A</span>
                  <div class="score-seg-inf">
                      {{repo.scores.a | number}}
                      <span *ngIf="repo.scores_d.a !== 0" [ahScoreDiff]="repo.scores_d.a"></span>
                  </div>
              </div>
              <div [ahListRepoScoreStyle]="repo.scores.m" scoreType="m" title="Maturity Score">
                  <span class="score-seg">M</span>
                  <div class="score-seg-inf">
                      {{repo.scores.m | number}}
                      <span *ngIf="repo.scores_d.m !== 0" [ahScoreDiff]="repo.scores_d.m"></span>
                  </div>
              </div>
          </div>
          <div class="mdl-card__supporting-text">
              <h4>
                  <a class="repo-author" href="//github.com/{{repo.author}}" title="Visit {{repo.author}}'s profile"
                     target="_blank">{{repo.author}}</a>
                  <a class="repo-name" href="//github.com/{{repo.author}}/{{repo.name}}"
                     title="Visit {{repo.author}}/{{repo.name}}" target="_blank">{{repo.name}}</a>
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
              <i class="icon icon-repo-pushed"></i> Pushed {{repo.pushed | ahDateFormat}}
          </a>
          <a class="meta" title="Last Updated">
              <i class="icon icon-pulse"></i> Updated {{repo.updated | ahDateFormat}}
          </a>
      </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListRepoCardComponent {
  @HostBinding('class') private class = 'list-repo-card mdl-card';
  @Input() public repo: ListRepo;
  @Input('extended') public extendedScores = false;

  public scoreColorLegend: Array<string>;

  constructor(private repoScoreService: ListRepoScoreService) {
    this.scoreColorLegend = repoScoreService.getScoreColors();
  }
}
