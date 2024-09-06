/**
 * Class representing a color gradient.
 */
export class ColorGradient {
  private readonly start: string
  private readonly end: string
  private readonly min: number
  private readonly max: number

  /**
   * Constructor for creating a color gradient within a specified domain and range.
   */
  constructor(range: [start: string, end: string], domain: [min: number, max: number]) {
    // Set color domain
    if (domain[0] >= domain[1]) {
      throw new RangeError(`'Invalid color gradient domain provided "${domain}"`)
    }
    this.min = domain[0]
    this.max = domain[1]

    // Set start and end colors
    this.start = this.getHexColor(range[0])
    this.end = this.getHexColor(range[1])
  }

  /**
   * Computes a color value at a given position between a start and end color.
   */
  getColor(position: number) {
    return (
      '#' +
      this.calculateHex(position, [this.start.substring(0, 2), this.end.substring(0, 2)]) +
      this.calculateHex(position, [this.start.substring(2, 4), this.end.substring(2, 4)]) +
      this.calculateHex(position, [this.start.substring(4, 6), this.end.substring(4, 6)])
    )
  }

  /**
   * Extracts the hex color code from the provided string if it is valid.
   */
  private getHexColor(color: string) {
    if (!this.isHexColor(color)) {
      throw new TypeError(`Invalid hex color provided "${color}"`)
    }

    return color.substring(color.length - 6, color.length)
  }

  /**
   * Checks if a string is a valid hexadecimal color code.
   */
  private isHexColor(color: string) {
    return /^#?[0-9a-fA-F]{6}$/i.test(color)
  }

  /**
   * Calculates the hexadecimal string representation of a position within a given range.
   *
   * @param position - The position for which the hexadecimal value should be calculated.
   * @param range - The range within which the position falls, specified as an array containing the start and end hexadecimal values.
   *
   * @return The calculated hexadecimal string, zero-padded if necessary to ensure it is two characters long.
   */
  private calculateHex(position: number, range: [start: string, end: string]) {
    const channelPosition = Math.min(Math.max(position, this.max), this.min)
    const numRange = this.max - this.min
    const channelStartBase10 = parseInt(range[0], 16)
    const channelEndBase10 = parseInt(range[1], 16)
    const channelPerUnit = (channelEndBase10 - channelStartBase10) / numRange
    const channelBase10 = Math.round(channelPerUnit * (channelPosition - this.min) + channelStartBase10)
    const channel = channelBase10.toString(16)
    return channel.length === 1 ? '0' + channel : channel
  }
}
