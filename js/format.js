// Display helpers: quantity formatting, unit pluralization, HTML escaping.
// No DOM access and no state, so these are safe to call from anywhere.

(function (RB) {
  "use strict";

  var FRACTIONS = {"0.25":"1/4","0.5":"1/2","0.75":"3/4","0.33":"1/3","0.67":"2/3","0.13":"1/8"};

  // Units are stored singular in the data. Only these take an s above 1;
  // tbsp / tsp / oz and friends are already invariant.
  var PLURAL_UNITS = {cup:"cups", scoop:"scoops", clove:"cloves", head:"heads", slice:"slices"};

  // Renders a scaled amount as a cooking-friendly string: 2.5 -> "2 1/2".
  // Falls back to decimals when no fraction is close enough.
  function fmtQty(n) {
    if (n === 0) return "0";
    var whole = Math.floor(n);
    var frac = Math.round((n - whole) * 100) / 100;
    var best = null, bestDiff = 999;
    Object.keys(FRACTIONS).forEach(function (k) {
      var diff = Math.abs(parseFloat(k) - frac);
      if (diff < bestDiff) { bestDiff = diff; best = k; }
    });
    if (bestDiff < 0.06) {
      var fs = FRACTIONS[best];
      return whole > 0 ? (whole + " " + fs) : fs;
    }
    if (n >= 10) return Math.round(n).toString();
    // Two decimals below 1 so tiny amounts do not collapse to "0".
    if (n < 1) return parseFloat(n.toFixed(2)).toString();
    return parseFloat(n.toFixed(1)).toString();
  }

  function fmtUnit(unit, n) {
    if (!unit) return "";
    return (n > 1 && PLURAL_UNITS[unit]) ? PLURAL_UNITS[unit] : unit;
  }

  // Every value interpolated into generated HTML goes through this, except
  // recipe steps, which intentionally carry inline <strong> markup.
  function esc(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  RB.format = { fmtQty: fmtQty, fmtUnit: fmtUnit, esc: esc };
})(window.RecipeBook = window.RecipeBook || {});
