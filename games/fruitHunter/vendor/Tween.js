// tween.js - http://github.com/sole/tween.js
"use strict";
var TWEEN =
  TWEEN ||
  (function () {
    var a = [];
    return {
      REVISION: "10",
      getAll: function () {
        return a;
      },
      removeAll: function () {
        a = [];
      },
      add: function (c) {
        a.push(c);
      },
      remove: function (c) {
        c = a.indexOf(c);
        -1 !== c && a.splice(c, 1);
      },
      update: function (c) {
        if (0 === a.length) return !1;
        for (
          var b = 0,
            d = a.length,
            c =
              void 0 !== c
                ? c
                : void 0 !== window.performance &&
                  void 0 !== window.performance.now
                ? window.performance.now()
                : Date.now();
          b < d;

        )
          a[b].update(c) ? b++ : (a.splice(b, 1), d--);
        return !0;
      },
    };
  })();
TWEEN.Tween = function (a) {
  var c = {},
    b = {},
    d = {},
    e = 1e3,
    g = 0,
    i = 0,
    k = null,
    u = TWEEN.Easing.Linear.None,
    v = TWEEN.Interpolation.Linear,
    p = [],
    q = null,
    r = !1,
    s = null,
    t = null,
    j;
  for (j in a) c[j] = parseFloat(a[j], 10);
  this.to = function (a, c) {
    void 0 !== c && (e = c);
    b = a;
    return this;
  };
  this.start = function (e) {
    TWEEN.add(this);
    r = !1;
    k =
      void 0 !== e
        ? e
        : void 0 !== window.performance && void 0 !== window.performance.now
        ? window.performance.now()
        : Date.now();
    k += i;
    for (var f in b) {
      if (b[f] instanceof Array) {
        if (0 === b[f].length) continue;
        b[f] = [a[f]].concat(b[f]);
      }
      c[f] = a[f];
      !1 === c[f] instanceof Array && (c[f] *= 1);
      d[f] = c[f] || 0;
    }
    return this;
  };
  this.stop = function () {
    TWEEN.remove(this);
    return this;
  };
  this.delay = function (a) {
    i = a;
    return this;
  };
  this.repeat = function (a) {
    g = a;
    return this;
  };
  this.easing = function (a) {
    u = a;
    return this;
  };
  this.interpolation = function (a) {
    v = a;
    return this;
  };
  this.chain = function () {
    p = arguments;
    return this;
  };
  this.onStart = function (a) {
    q = a;
    return this;
  };
  this.onUpdate = function (a) {
    s = a;
    return this;
  };
  this.onComplete = function (a) {
    t = a;
    return this;
  };
  this.update = function (n) {
    if (n < k) return !0;
    !1 === r && (null !== q && q.call(a), (r = !0));
    var f = (n - k) / e,
      f = 1 < f ? 1 : f,
      m = u(f),
      h;
    for (h in b) {
      var j = c[h] || 0,
        l = b[h];
      l instanceof Array
        ? (a[h] = v(l, m))
        : ("string" === typeof l && (l = j + parseFloat(l, 10)),
          (a[h] = j + (l - j) * m));
    }
    null !== s && s.call(a, m);
    if (1 == f)
      if (0 < g) {
        isFinite(g) && g--;
        for (h in d)
          "string" === typeof b[h] && (d[h] += parseFloat(b[h], 10)),
            (c[h] = d[h]);
        k = n + i;
      } else {
        null !== t && t.call(a);
        f = 0;
        for (m = p.length; f < m; f++) p[f].start(n);
        return !1;
      }
    return !0;
  };
};
TWEEN.Easing = {
  Linear: {
    None: function (a) {
      return a;
    },
  },
  Quadratic: {
    In: function (a) {
      return a * a;
    },
    Out: function (a) {
      return a * (2 - a);
    },
    InOut: function (a) {
      return 1 > (a *= 2) ? 0.5 * a * a : -0.5 * (--a * (a - 2) - 1);
    },
  },
  Cubic: {
    In: function (a) {
      return a * a * a;
    },
    Out: function (a) {
      return --a * a * a + 1;
    },
    InOut: function (a) {
      return 1 > (a *= 2) ? 0.5 * a * a * a : 0.5 * ((a -= 2) * a * a + 2);
    },
  },
  Quartic: {
    In: function (a) {
      return a * a * a * a;
    },
    Out: function (a) {
      return 1 - --a * a * a * a;
    },
    InOut: function (a) {
      return 1 > (a *= 2)
        ? 0.5 * a * a * a * a
        : -0.5 * ((a -= 2) * a * a * a - 2);
    },
  },
  Quintic: {
    In: function (a) {
      return a * a * a * a * a;
    },
    Out: function (a) {
      return --a * a * a * a * a + 1;
    },
    InOut: function (a) {
      return 1 > (a *= 2)
        ? 0.5 * a * a * a * a * a
        : 0.5 * ((a -= 2) * a * a * a * a + 2);
    },
  },
  Sinusoidal: {
    In: function (a) {
      return 1 - Math.cos((a * Math.PI) / 2);
    },
    Out: function (a) {
      return Math.sin((a * Math.PI) / 2);
    },
    InOut: function (a) {
      return 0.5 * (1 - Math.cos(Math.PI * a));
    },
  },
  Exponential: {
    In: function (a) {
      return 0 === a ? 0 : Math.pow(1024, a - 1);
    },
    Out: function (a) {
      return 1 === a ? 1 : 1 - Math.pow(2, -10 * a);
    },
    InOut: function (a) {
      return 0 === a
        ? 0
        : 1 === a
        ? 1
        : 1 > (a *= 2)
        ? 0.5 * Math.pow(1024, a - 1)
        : 0.5 * (-Math.pow(2, -10 * (a - 1)) + 2);
    },
  },
  Circular: {
    In: function (a) {
      return 1 - Math.sqrt(1 - a * a);
    },
    Out: function (a) {
      return Math.sqrt(1 - --a * a);
    },
    InOut: function (a) {
      return 1 > (a *= 2)
        ? -0.5 * (Math.sqrt(1 - a * a) - 1)
        : 0.5 * (Math.sqrt(1 - (a -= 2) * a) + 1);
    },
  },
  Elastic: {
    In: function (a) {
      var c,
        b = 0.1;
      if (0 === a) return 0;
      if (1 === a) return 1;
      !b || 1 > b
        ? ((b = 1), (c = 0.1))
        : (c = (0.4 * Math.asin(1 / b)) / (2 * Math.PI));
      return -(
        b *
        Math.pow(2, 10 * (a -= 1)) *
        Math.sin(((a - c) * 2 * Math.PI) / 0.4)
      );
    },
    Out: function (a) {
      var c,
        b = 0.1;
      if (0 === a) return 0;
      if (1 === a) return 1;
      !b || 1 > b
        ? ((b = 1), (c = 0.1))
        : (c = (0.4 * Math.asin(1 / b)) / (2 * Math.PI));
      return (
        b * Math.pow(2, -10 * a) * Math.sin(((a - c) * 2 * Math.PI) / 0.4) + 1
      );
    },
    InOut: function (a) {
      var c,
        b = 0.1;
      if (0 === a) return 0;
      if (1 === a) return 1;
      !b || 1 > b
        ? ((b = 1), (c = 0.1))
        : (c = (0.4 * Math.asin(1 / b)) / (2 * Math.PI));
      return 1 > (a *= 2)
        ? -0.5 *
            b *
            Math.pow(2, 10 * (a -= 1)) *
            Math.sin(((a - c) * 2 * Math.PI) / 0.4)
        : 0.5 *
            b *
            Math.pow(2, -10 * (a -= 1)) *
            Math.sin(((a - c) * 2 * Math.PI) / 0.4) +
            1;
    },
  },
  Back: {
    In: function (a) {
      return a * a * (2.70158 * a - 1.70158);
    },
    Out: function (a) {
      return --a * a * (2.70158 * a + 1.70158) + 1;
    },
    InOut: function (a) {
      return 1 > (a *= 2)
        ? 0.5 * a * a * (3.5949095 * a - 2.5949095)
        : 0.5 * ((a -= 2) * a * (3.5949095 * a + 2.5949095) + 2);
    },
  },
  Bounce: {
    In: function (a) {
      return 1 - TWEEN.Easing.Bounce.Out(1 - a);
    },
    Out: function (a) {
      return a < 1 / 2.75
        ? 7.5625 * a * a
        : a < 2 / 2.75
        ? 7.5625 * (a -= 1.5 / 2.75) * a + 0.75
        : a < 2.5 / 2.75
        ? 7.5625 * (a -= 2.25 / 2.75) * a + 0.9375
        : 7.5625 * (a -= 2.625 / 2.75) * a + 0.984375;
    },
    InOut: function (a) {
      return 0.5 > a
        ? 0.5 * TWEEN.Easing.Bounce.In(2 * a)
        : 0.5 * TWEEN.Easing.Bounce.Out(2 * a - 1) + 0.5;
    },
  },
};
TWEEN.Interpolation = {
  Linear: function (a, c) {
    var b = a.length - 1,
      d = b * c,
      e = Math.floor(d),
      g = TWEEN.Interpolation.Utils.Linear;
    return 0 > c
      ? g(a[0], a[1], d)
      : 1 < c
      ? g(a[b], a[b - 1], b - d)
      : g(a[e], a[e + 1 > b ? b : e + 1], d - e);
  },
  Bezier: function (a, c) {
    var b = 0,
      d = a.length - 1,
      e = Math.pow,
      g = TWEEN.Interpolation.Utils.Bernstein,
      i;
    for (i = 0; i <= d; i++) b += e(1 - c, d - i) * e(c, i) * a[i] * g(d, i);
    return b;
  },
  CatmullRom: function (a, c) {
    var b = a.length - 1,
      d = b * c,
      e = Math.floor(d),
      g = TWEEN.Interpolation.Utils.CatmullRom;
    return a[0] === a[b]
      ? (0 > c && (e = Math.floor((d = b * (1 + c)))),
        g(a[(e - 1 + b) % b], a[e], a[(e + 1) % b], a[(e + 2) % b], d - e))
      : 0 > c
      ? a[0] - (g(a[0], a[0], a[1], a[1], -d) - a[0])
      : 1 < c
      ? a[b] - (g(a[b], a[b], a[b - 1], a[b - 1], d - b) - a[b])
      : g(
          a[e ? e - 1 : 0],
          a[e],
          a[b < e + 1 ? b : e + 1],
          a[b < e + 2 ? b : e + 2],
          d - e
        );
  },
  Utils: {
    Linear: function (a, c, b) {
      return (c - a) * b + a;
    },
    Bernstein: function (a, c) {
      var b = TWEEN.Interpolation.Utils.Factorial;
      return b(a) / b(c) / b(a - c);
    },
    Factorial: (function () {
      var a = [1];
      return function (c) {
        var b = 1,
          d;
        if (a[c]) return a[c];
        for (d = c; 1 < d; d--) b *= d;
        return (a[c] = b);
      };
    })(),
    CatmullRom: function (a, c, b, d, e) {
      var a = 0.5 * (b - a),
        d = 0.5 * (d - c),
        g = e * e;
      return (
        (2 * c - 2 * b + a + d) * e * g +
        (-3 * c + 3 * b - 2 * a - d) * g +
        a * e +
        c
      );
    },
  },
};
