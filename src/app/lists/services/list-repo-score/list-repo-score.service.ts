import { Injectable } from '@angular/core'
import { config } from '@constants'
import { ListRepoScoreType } from '@app/lists'
import { ColorScale } from '@app/lists/util'

@Injectable()
export class ListRepoScoreService {
  private readonly theme = config.lists.listRepoScoreTheme
  private readonly colorScales: Record<ListRepoScoreType, ColorScale>

  constructor() {
    const { p, h, a, m } = config.lists.listRepoScoreScale
    this.colorScales = {
      p: new ColorScale(this.theme, [0, p]),
      h: new ColorScale(this.theme, [0, h]),
      a: new ColorScale(this.theme, [0, a]),
      m: new ColorScale(this.theme, [0, m]),
    }
  }

  getScoreColorScale(type: ListRepoScoreType): ColorScale {
    if (typeof this.colorScales[type] === 'undefined') {
      throw new ReferenceError(`Invalid score type provided '${type}'`)
    }

    return this.colorScales[type]
  }

  getScoreColor(type: ListRepoScoreType, score: number): { bg: string; text: string } {
    const color = this.getScoreColorScale(type).getColor(score)
    return {
      bg: color,
      text: this.isColorBright(color) ? this.theme[this.theme.length - 2] : this.theme[1],
    }
  }

  getScoreColorTheme(): string[] {
    return this.theme
  }

  isColorBright(color: string) {
    const hex = color.substring(color.length - 6, color.length)
    const r = parseInt(hex.substring(0, 2), 16),
      g = parseInt(hex.substring(2, 4), 16),
      b = parseInt(hex.substring(4, 6), 16)

    return 150 < (r * 299 + g * 587 + b * 114) / 1000
  }
}
