export declare class ColorGradient {
  /**
     * Constructor.
     *
     * @param colorStart
     * @param colorEnd
     * @param min
     * @param max
     */
  constructor(colorStart?: string, colorEnd?: string, min?: number, max?: number);

  /**
     * Sets gradient colors.
     *
     * @param colorStart
     * @param colorEnd
     */
  setGradient(colorStart: string, colorEnd: string);

  /**
     * Sets the gradient domain.
     *
     * @param min
     * @param max
     */
  setDomain(min: number, max: number);

  /**
     * Gets a color hex by number.
     *
     * @param number
     * @return string
     */
  getColor(number: number);
}
