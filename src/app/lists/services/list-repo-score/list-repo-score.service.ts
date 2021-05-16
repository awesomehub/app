import { Injectable } from '@angular/core';
import { config } from "@constants";
import { ColorScale } from "@app/lists/util";

@Injectable()
export class ListRepoScoreService {
  private theme = config.lists.listRepoScoreTheme
  public colorScales: {
    p, h, a, m: ColorScale;
  };

  constructor() {
    const { p, h, a, m } = config.lists.listRepoScoreScale
    this.colorScales = {
      p: new ColorScale(this.theme, 0, p),
      h: new ColorScale(this.theme, 0, h),
      a: new ColorScale(this.theme, 0, a),
      m: new ColorScale(this.theme, 0, m),
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
    return this.theme;
  }

  isColorBright(hex: string) {
    hex = hex.replace('#', '');
    let r = parseInt(hex.substr(0, 2),16),
      g = parseInt(hex.substr(2, 2),16),
      b = parseInt(hex.substr(4, 2),16);

    return 150 < ((r * 299) + (g * 587) + (b * 114)) / 1000;
  }
}
