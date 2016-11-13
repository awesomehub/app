import { ColorGradient } from './gradient';

export var ColorScale = (function () {

  function ColorScale(colors, min, max) {
    this.min = min || 0;
    this.max = max || 100;
    this.colors = [];
    this.gradients = [];
    if(colors){
      this.setColors(colors);
    }
  }

  ColorScale.prototype.setDomain = function (min, max) {
    if (min >= max) {
      throw new RangeError('Invalid color scale domain (' + min + ', ' + max + ')');
    }

    this.min = min;
    this.max = max;
    this.updateGradients();
  };

  ColorScale.prototype.setColors = function (colors) {
    if (colors.length < 2) {
      throw new Error('Rainbow must have two or more colours.');
    }

    this.colors = colors;
    this.updateGradients();
  };

  ColorScale.prototype.updateGradients = function () {
    var increment = (this.max - this.min)/(this.colors.length - 1);
    this.gradients = [ new ColorGradient(
      this.colors[0],
      this.colors[1],
      this.min,
      this.min + increment
    ) ];
    for (var i = 1; i < this.colors.length - 1; i++) {
      this.gradients[i] = new ColorGradient(
        this.colors[i],
        this.colors[i + 1],
        this.min + increment * i,
        this.min + increment * (i + 1)
      );
    }
  };

  ColorScale.prototype.getColor = function (number) {
    if (isNaN(number)) {
      throw new TypeError('Invalid number provided ('+ number +')');
    }

    if (this.gradients.length === 1) {
      return this.gradients[0].getColor(number);
    }

    var segment = (this.max - this.min)/(this.gradients.length);
    var index = Math.min(Math.floor((Math.max(number, this.min) - this.min)/segment), this.gradients.length - 1);
    return this.gradients[index].getColor(number);
  };

  return ColorScale;
}());
