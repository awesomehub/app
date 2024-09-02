export declare class ColorScale {
  /**
     * Constructor.
     *
     * @param colors
     * @param min
     * @param max
     */
  constructor(colors?: string[], min?: number, max?: number);

  /**
     * Sets the scale domain.
     *
     * @param min
     * @param max
     */
  setDomain(min: number, max: number);

  /**
     * Sets scale colors.
     *
     * @param colors
     */
  setColors(colors: string[]);

  /**
     * Gets a color hex by number.
     *
     * @param number
     * @return string
     */
  getColor(number: number);
}
