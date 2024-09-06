import { ColorGradient } from './gradient'

/**
 * Represents a color scale for interpolating colors based on a given domain.
 */
export class ColorScale {
  private readonly min: number
  private readonly max: number
  private readonly colors: string[]
  private readonly gradients: ColorGradient[]

  /**
   * Creates a new instance of the color scale with the specified colors and domain range.
   */
  constructor(colors: string[], domain: [min: number, max: number] = [0, 100]) {
    // Set color domain
    if (domain[0] >= domain[1]) {
      throw new RangeError(`'Invalid color scale domain provided "${domain}"`)
    }
    this.min = domain[0]
    this.max = domain[1]

    // Set colors
    if (colors.length < 2) {
      throw new Error('Color scale must have two or more colors.')
    }
    this.colors = colors

    // Set gradients
    this.gradients = this.calculateGradients()
  }

  /**
   * Retrieves a color based on the given position.
   */
  getColor(position: number) {
    if (isNaN(position)) {
      throw new TypeError(`'Invalid color position provided "${position}"`)
    }

    if (this.gradients.length === 1) {
      return this.gradients[0].getColor(position)
    }

    const segment = (this.max - this.min) / this.gradients.length
    const index = Math.min(Math.floor((Math.max(position, this.min) - this.min) / segment), this.gradients.length - 1)
    return this.gradients[index].getColor(position)
  }

  /**
   * Calculates gradients based on the range between minimum and maximum values
   * and the number of colors provided. It creates an array of ColorGradient objects
   * where each gradient represents the transition between two consecutive colors
   * over a specific range of values.
   */
  private calculateGradients() {
    const increment = (this.max - this.min) / (this.colors.length - 1)
    const gradients = [new ColorGradient([this.colors[0], this.colors[1]], [this.min, this.min + increment])]
    for (let i = 1; i < this.colors.length - 1; i++) {
      gradients[i] = new ColorGradient(
        [this.colors[i], this.colors[i + 1]],
        [this.min + increment * i, this.min + increment * (i + 1)],
      )
    }
    return gradients
  }
}
