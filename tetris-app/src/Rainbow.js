class _Rainbow {
  // lifted recklessly from https://github.com/mpaulweeks/gravity
  applyGradient(gradient, step){
    const gradientDelta = 8;
    const defaults = {
      numSlices: 1,
      sliceDifference: 0,
      phaseDelta: 2,
      colorFreq: 0.2,
      colorRange: 127,
      colorFloor: 128,
    }

    function byte2Hex(n){
      n = Math.min(n, 255);
      n = Math.max(n, 0);
      var nybHexString = "0123456789ABCDEF";
      return String(nybHexString.substr((n >> 4) & 0x0F,1)) + nybHexString.substr(n & 0x0F,1);
    }
    function RGB2Color(r,g,b){
      return '#' + byte2Hex(r) + byte2Hex(g) + byte2Hex(b);
    }
    function getColor(step, settings){
      var red = (Math.sin((settings.colorFreq * step) + (0 * settings.phaseDelta)) * settings.colorRange) + settings.colorFloor;
      var grn = (Math.sin((settings.colorFreq * step) + (1 * settings.phaseDelta)) * settings.colorRange) + settings.colorFloor;
      var blu = (Math.sin((settings.colorFreq * step) + (2 * settings.phaseDelta)) * settings.colorRange) + settings.colorFloor;
      return RGB2Color(red,grn,blu);
    }
    function getGradientColors(settings){
      // const stepFreq = 5;
      // var step = Math.floor(counter / stepFreq) + (settings.sliceDifference * settings.sliceIndex);
      return [
        getColor(step, settings),
        getColor(step + gradientDelta, settings),
      ];
    }
    const gc = getGradientColors(defaults);
    gradient.addColorStop(0,gc[0]);
    gradient.addColorStop(1,gc[1]);
  }
}

const Rainbow = new _Rainbow();

export default Rainbow;
