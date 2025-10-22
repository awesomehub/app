import { Component, Input, ViewEncapsulation, ChangeDetectionStrategy, HostBinding, inject } from '@angular/core'
import { ListRepoScoreService } from '../../services'
import type { ListRepo } from '../../state'

@Component({
  selector: 'ah-list-repo-card',
  styleUrls: ['./list-repo-card.component.css'],
  template: `
    <div class="list-repo-inner">
      @if (!extendedScores) {
        <div class="mdl-card__media" (click)="extendedScores = true" title="Show extended scores">
          <div class="score">
            <a>{{ repo.score | ahScoreFormat }}</a>
          </div>
          <div class="scores" [style.border-color]="scoreColorLegend[scoreColorLegend.length - 1]">
            <span
              [ahListRepoScoreStyle]="repo.scores.p"
              scoreType="p"
              title="Popularity: {{ repo.scores.p | ahScoreFormat }}"
            >
              P
            </span>
            <span
              [ahListRepoScoreStyle]="repo.scores.a"
              scoreType="a"
              title="Activity: {{ repo.scores.a | ahScoreFormat }}"
            >
              A
            </span>
            <span
              [ahListRepoScoreStyle]="repo.scores.m"
              scoreType="m"
              title="Maturity: {{ repo.scores.m | ahScoreFormat }}"
            >
              M
            </span>
            <span
              [ahListRepoScoreStyle]="repo.scores.h"
              scoreType="h"
              title="Trending: {{ repo.scores.h | ahScoreFormat }}"
            >
              T
            </span>
          </div>
        </div>
      }
      @if (extendedScores) {
        <div
          class="mdl-card__media extended-scores"
          [style.border-color]="scoreColorLegend[scoreColorLegend.length - 1]"
          (click)="extendedScores = false"
        >
          <div [ahListRepoScoreStyle]="repo.scores.p" scoreType="p" title="Popularity score">
            <span class="score-seg">P</span>
            <div class="score-seg-inf">
              {{ repo.scores.p | ahScoreFormat }}
            </div>
          </div>
          <div [ahListRepoScoreStyle]="repo.scores.a" scoreType="a" title="Activity score">
            <span class="score-seg">A</span>
            <div class="score-seg-inf">
              {{ repo.scores.a | ahScoreFormat }}
            </div>
          </div>
          <div [ahListRepoScoreStyle]="repo.scores.m" scoreType="m" title="Maturity score">
            <span class="score-seg">M</span>
            <div class="score-seg-inf">
              {{ repo.scores.m | ahScoreFormat }}
            </div>
          </div>
          <div [ahListRepoScoreStyle]="repo.scores.h" scoreType="h" title="Trending score">
            <span class="score-seg">T</span>
            <div class="score-seg-inf">
              {{ repo.scores.h | ahScoreFormat }}
            </div>
          </div>
        </div>
      }
      <div class="mdl-card__supporting-text">
        <h4>
          <a
            class="repo-author"
            href="//github.com/{{ repo.author }}"
            title="Visit {{ repo.author }}'s profile"
            target="_blank"
          >
            {{ repo.author }}
          </a>
          <a
            class="repo-name"
            href="//github.com/{{ repo.author }}/{{ repo.name }}"
            title="Visit {{ repo.author }}/{{ repo.name }}"
            target="_blank"
          >
            {{ repo.name }}
          </a>
        </h4>
        <span class="repo-desc" [class.no-desc]="!repo.desc.length">
          {{ repo.desc || 'No description provided.' }}
        </span>
      </div>
    </div>
    <div class="mdl-card__actions mdl-card--border">
      <span class="meta" title="Language"> <i class="icon icon-code"></i> {{ repo.lang || 'None' }}</span>
      @if (repo.lic) {
        <span class="meta" title="License"> <i class="icon icon-license"></i> {{ repo.lic }}</span>
      }
      <span class="meta highlight" title="Score Highlight"> <i class="icon icon-pulse"></i> {{ repo.hglt }}</span>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ListRepoCardComponent {
  @HostBinding('class') private class = 'list-repo-card mdl-card'
  @Input() public repo: ListRepo
  @Input() public extendedScores = false

  public scoreColorLegend: string[]
  private repoScoreService = inject(ListRepoScoreService)

  constructor() {
    this.scoreColorLegend = this.repoScoreService.getScoreColorTheme()
  }
}
