let led = require("RGBLed").connect(
  [LED1, LED2, LED3],
  true,
  "#00ff3e"
);
led.strobe(500);

setWatch(
  function() {
    let hsl = getRandomColor();
    let hex = hslToHex(hsl[0], hsl[1], hsl[2]);
    led.strobe(0);
    led.setColor(hex);
    console.log(hex);
  },
  BTN,
  { edge: "falling", debounce: 50, repeat: true }
);

function getRandomColor() {
  let rand = function(min, max) {
    return min + Math.random() * (max - min);
  };
  let h = rand(1, 360);
  let s = rand(0, 100);
  let l = rand(0, 100);
  return [h, s, l];
}

function hslToHex(h, s, l) {
  h /= 360;
  s /= 100;
  l /= 100;
  let r, g, b;
  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  const toHex = x => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

save();
