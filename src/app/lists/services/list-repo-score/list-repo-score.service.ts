import { Injectable } from '@angular/core';

import { ColorScale } from "../../util";
import { ListsConfig } from "../../lists.config";

@Injectable()
export class ListRepoScoreService {

  public colorScales: {
    p, h, a, m: ColorScale;
  };

  constructor() {
    this.colorScales = {
      p: new ColorScale(ListsConfig.LIST_REPO_SCORE_COLOR, 0, ListsConfig.LIST_REPO_SCORE_SCALE_P),
      h: new ColorScale(ListsConfig.LIST_REPO_SCORE_COLOR, 0, ListsConfig.LIST_REPO_SCORE_SCALE_H),
      a: new ColorScale(ListsConfig.LIST_REPO_SCORE_COLOR, 0, ListsConfig.LIST_REPO_SCORE_SCALE_A),
      m: new ColorScale(ListsConfig.LIST_REPO_SCORE_COLOR, 0, ListsConfig.LIST_REPO_SCORE_SCALE_M),
    };
  }

  getScoreColorScale(type: string): ColorScale {
    if (typeof this.colorScales[type] === 'undefined') {
      throw new ReferenceError(`Invalid score type provided '${type}'`);
    }

    return this.colorScales[type];
  }

  getScoreColor(type: string, score: number): { bg: string, text: string } {
    let legend = this.getScoreColors();
    let color = this.getScoreColorScale(type).getColor(score);
    return {
      bg: color,
      text: this.isColorBright(color)
        ? legend[legend.length-2]
        : legend[1],
    };
  }

  getScoreColors(): Array<string> {
    return ListsConfig.LIST_REPO_SCORE_COLOR;
  }

  isColorBright(hex: string) {
    hex = hex.replace('#', '');
    let r = parseInt(hex.substr(0, 2),16),
      g = parseInt(hex.substr(2, 2),16),
      b = parseInt(hex.substr(4, 2),16);

    return 150 < ((r * 299) + (g * 587) + (b * 114)) / 1000;
  }
}
