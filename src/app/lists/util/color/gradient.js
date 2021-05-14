export var ColorGradient = (function () {

  function ColorGradient(colorStart, colorEnd, min, max) {
    this.setDomain(min || 0, max || 100);
    if(colorStart && colorStart){
      this.setGradient(colorStart, colorEnd);
    }
  }

  ColorGradient.prototype.setDomain = function (min, max) {
    if (min >= max) {
      throw new RangeError('Invalid color gradient domain (' + min + ', ' + max + ')');
    }

    this.min = min;
    this.max = max;
  };

  ColorGradient.prototype.setGradient = function (colorStart, colorEnd) {
    this.colorStart = this.getHexColor(colorStart);
    this.colorEnd = this.getHexColor(colorEnd);
  };

  ColorGradient.prototype.getColor = function (number) {
    return '#'
      + this.calcHex(number, this.colorStart.substring(0,2), this.colorEnd.substring(0,2))
      + this.calcHex(number, this.colorStart.substring(2,4), this.colorEnd.substring(2,4))
      + this.calcHex(number, this.colorStart.substring(4,6), this.colorEnd.substring(4,6));
  };

  ColorGradient.prototype.getHexColor = function (color) {
    if (!this.isHexColor(color)) {
      throw new Error(color + ' is not a valid colour.');
    }

    return color.substring(color.length - 6, color.length);
  };

  ColorGradient.prototype.isHexColor = function (color) {
    return /^#?[0-9a-fA-F]{6}$/i.test(color);
  };

  ColorGradient.prototype.calcHex = function (number, channelStartBase16, channelEndBase16) {
    if (number < this.min) {
      number = this.min;
    }
    if (number > this.max) {
      number = this.max;
    }

    var numRange = this.max - this.min;
    var channelStartBase10 = parseInt(channelStartBase16, 16);
    var channelEndBase10 = parseInt(channelEndBase16, 16);
    var channelPerUnit = (channelEndBase10 - channelStartBase10)/numRange;
    var channelBase10 = Math.round(channelPerUnit * (number - this.min) + channelStartBase10);
    var channel = channelBase10.toString(16);
    return channel.length === 1 ? '0' + channel : channel;
  };

    return ColorGradient;
}());
