var window = {
    "navigator": {
        "appName": "Netscape"
    },
    "crypto": {
        "getRandomValues": getRandomValues
    }
}
var navigator = window["navigator"]

function randoms(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function getRandomValues(buf) {
    var min = 0,
        max = 255;
    if (buf.length > 65536) {
        var e = new Error();
        e.code = 22;
        e.message = 'Failed to execute \'getRandomValues\' : The ' + 'ArrayBufferView\'s byte length (' + buf.length + ') exceeds the ' + 'number of bytes of entropy available via this API (65536).';
        e.name = 'QuotaExceededError';
        throw e;
    }
    if (buf instanceof Uint16Array) {
        max = 65535;
    } else if (buf instanceof Uint32Array) {
        max = 4294967295;
    }
    for (var element in buf) {
        buf[element] = randoms(min, max);
    }
    return buf;
}


function get_passtime(track) {
    var passtime = 0;
    for (i = 0; i < track.length; i++) {
        passtime += track[i][2]
    }
    return passtime
}

function get_userresponse(setLeft, captcha_width) {
    var e = 340
    var i = .8876 * e / captcha_width
    return setLeft / i
}

function get_setLeft(track) {
    var setLeft = 0;
    for (i = 1; i < track.length; i++) {
        setLeft += track[i][0]
    }
    return setLeft
}

function get_w(track, captcha_width, lot_number) {
    var d = function () {
        var u,
            p,
            s,
            g,
            e = {},
            t = /[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;

        function n(e) {
          return e < 10 ? "0" + e : e;
        }

        function a() {
          return this["valueOf"]();
        }

        function l(e) {
          return t["lastIndex"] = 0, t["test"](e) ? "\"" + e["replace"](t, function (e) {
            var t = s[e];
            return "string" == typeof t ? t : "\\u" + ("0000" + e["charCodeAt"](0)["toString"](16))["slice"](-4);
          }) + "\"" : "\"" + e + "\"";
        }

        return "function" != typeof Date["prototype"]["toJSON"] && (Date["prototype"]["toJSON"] = function () {
          return isFinite(this["valueOf"]()) ? this["getUTCFullYear"]() + "-" + n(this["getUTCMonth"]() + 1) + "-" + n(this["getUTCDate"]()) + "T" + n(this["getUTCHours"]()) + ":" + n(this["getUTCMinutes"]()) + ":" + n(this["getUTCSeconds"]()) + "Z" : null;
        }, Boolean["prototype"]["toJSON"] = a, Number["prototype"]["toJSON"] = a, String["prototype"]["toJSON"] = a), s = {
          "\b": "\\b",
          "\t": "\\t",
          "\n": "\\n",
          "\f": "\\f",
          "\r": "\\r",
          "\"": "\\\"",
          "\\": "\\\\"
        }, e["stringify"] = function (e, t, s) {
          var n;
          if (p = u = "", "number" == typeof s) for (n = 0; n < s; n += 1) p += " ";else "string" == typeof s && (p = s);
          if ((g = t) && "function" != typeof t && ("object" != typeof t || "number" != typeof t["length"])) throw new Error("JSON.stringify");
          return function c(e, t) {
            var s,
                n,
                a,
                o,
                r,
                i = u,
                _ = t[e];

            switch (_ && "object" == typeof _ && "function" == typeof _["toJSON"] && (_ = _["toJSON"](e)), "function" == typeof g && (_ = g["call"](t, e, _)), typeof _) {
              case "string":
                return l(_);

              case "number":
                return isFinite(_) ? String(_) : "null";

              case "boolean":
              case "null":
                return String(_);

              case "object":
                if (!_) return "null";

                if (u += p, r = [], "[object Array]" === Object["prototype"]["toString"]["apply"](_)) {
                  for (o = _["length"], s = 0; s < o; s += 1) r[s] = c(s, _) || "null";

                  return a = 0 === r["length"] ? "[]" : u ? "[\n" + u + r["join"](",\n" + u) + "\n" + i + "]" : "[" + r["join"](",") + "]", u = i, a;
                }

                if (g && "object" == typeof g) for (o = g["length"], s = 0; s < o; s += 1) "string" == typeof g[s] && (a = c(n = g[s], _)) && r["push"](l(n) + (u ? ": " : ":") + a);else for (n in _) Object["prototype"]["hasOwnProperty"]["call"](_, n) && (a = c(n, _)) && r["push"](l(n) + (u ? ": " : ":") + a);
                return a = 0 === r["length"] ? "{}" : u ? "{\n" + u + r["join"](",\n" + u) + "\n" + i + "}" : "{" + r["join"](",") + "}", u = i, a;
            }
          }("", {
            "": e
          });
        }, e;
      }();
    d["default"] = d;

    function get_h(e, t) {
        //var _ = function () {
            // 内容需要自己抠出来
        //}();
        var _ = function () {
        function s() {
          this["i"] = 0, this["j"] = 0, this["S"] = [];
        }

        s["prototype"]["init"] = function E(e) {
          var t, s, n;

          for (t = 0; t < 256; ++t) this["S"][t] = t;

          for (t = s = 0; t < 256; ++t) s = s + this["S"][t] + e[t % e["length"]] & 255, n = this["S"][t], this["S"][t] = this["S"][s], this["S"][s] = n;

          this["i"] = 0, this["j"] = 0;
        }, s["prototype"]["next"] = function A() {
          var e;
          return this["i"] = this["i"] + 1 & 255, this["j"] = this["j"] + this["S"][this["i"]] & 255, e = this["S"][this["i"]], this["S"][this["i"]] = this["S"][this["j"]], this["S"][this["j"]] = e, this["S"][e + this["S"][this["i"]] & 255];
        };
        var n,
            a,
            o,
            t,
            r = 256;

        if (null == a) {
          var i;

          if (a = [], o = 0, window["crypto"] && window["crypto"]["getRandomValues"]) {
            var _ = new Uint32Array(256);

            for (window["crypto"]["getRandomValues"](_), i = 0; i < _["length"]; ++i) a[o++] = 255 & _[i];
          }

          var c = 0,
              u = function u(t) {
            if (256 <= (c = c || 0) || r <= o) window["removeEventListener"] ? (c = 0, window["removeEventListener"]("mousemove", u, !1)) : window["detachEvent"] && (c = 0, window["detachEvent"]("onmousemove", u));else try {
              var s = t["x"] + t["y"];
              a[o++] = 255 & s, c += 1;
            } catch (e) {}
          };

          window["addEventListener"] ? window["addEventListener"]("mousemove", u, !1) : window["attachEvent"] && window["attachEvent"]("onmousemove", u);
        }

        function p() {
          if (null == n) {
            n = function t() {
              return new s();
            }();

            while (o < r) {
              var e = Math["floor"](65536 * Math["random"]());
              a[o++] = 255 & e;
            }

            for (n["init"](a), o = 0; o < a["length"]; ++o) a[o] = 0;

            o = 0;
          }

          return n["next"]();
        }

        function g() {}

        g["prototype"]["nextBytes"] = function z(e) {
          var t;

          for (t = 0; t < e["length"]; ++t) e[t] = p();
        };

        function v(e, t, s) {
          null != e && ("number" == typeof e ? this["fromNumber"](e, t, s) : null == t && "string" != typeof e ? this["fromString"](e, 256) : this["fromString"](e, t));
        }

        function w() {
          return new v(null);
        }

        t = "Microsoft Internet Explorer" == navigator["appName"] ? (v["prototype"]["am"] = function T(e, t, s, n, a, o) {
          var r = 32767 & t,
              i = t >> 15;

          while (0 <= --o) {
            var _ = 32767 & this[e],
                c = this[e++] >> 15,
                u = i * _ + c * r;

            a = ((_ = r * _ + ((32767 & u) << 15) + s[n] + (1073741823 & a)) >>> 30) + (u >>> 15) + i * c + (a >>> 30), s[n++] = 1073741823 & _;
          }

          return a;
        }, 30) : "Netscape" != navigator["appName"] ? (v["prototype"]["am"] = function B(e, t, s, n, a, o) {
          while (0 <= --o) {
            var r = t * this[e++] + s[n] + a;
            a = Math["floor"](r / 67108864), s[n++] = 67108863 & r;
          }

          return a;
        }, 26) : (v["prototype"]["am"] = function D(e, t, s, n, a, o) {
          var r = 16383 & t,
              i = t >> 14;

          while (0 <= --o) {
            var _ = 16383 & this[e],
                c = this[e++] >> 14,
                u = i * _ + c * r;

            a = ((_ = r * _ + ((16383 & u) << 14) + s[n] + a) >> 28) + (u >> 14) + i * c, s[n++] = 268435455 & _;
          }

          return a;
        }, 28), v["prototype"]["DB"] = t, v["prototype"]["DM"] = (1 << t) - 1, v["prototype"]["DV"] = 1 << t;
        v["prototype"]["FV"] = Math["pow"](2, 52), v["prototype"]["F1"] = 52 - t, v["prototype"]["F2"] = 2 * t - 52;
        var l,
            d,
            h = "0123456789abcdefghijklmnopqrstuvwxyz",
            f = [];

        for (l = "0"["charCodeAt"](0), d = 0; d <= 9; ++d) f[l++] = d;

        for (l = "a"["charCodeAt"](0), d = 10; d < 36; ++d) f[l++] = d;

        for (l = "A"["charCodeAt"](0), d = 10; d < 36; ++d) f[l++] = d;

        function m(e) {
          return h["charAt"](e);
        }

        function b(e) {
          var t = w();
          return t["fromInt"](e), t;
        }

        function x(e) {
          var t,
              s = 1;
          return 0 != (t = e >>> 16) && (e = t, s += 16), 0 != (t = e >> 8) && (e = t, s += 8), 0 != (t = e >> 4) && (e = t, s += 4), 0 != (t = e >> 2) && (e = t, s += 2), 0 != (t = e >> 1) && (e = t, s += 1), s;
        }

        function y(e) {
          this["m"] = e;
        }

        function k(e) {
          this["m"] = e, this["mp"] = e["invDigit"](), this["mpl"] = 32767 & this["mp"], this["mph"] = this["mp"] >> 15, this["um"] = (1 << e["DB"] - 15) - 1, this["mt2"] = 2 * e["t"];
        }

        function C() {
          this["n"] = null, this["e"] = 0, this["d"] = null, this["p"] = null, this["q"] = null, this["dmp1"] = null, this["dmq1"] = null, this["coeff"] = null;
          this["setPublic"]("00C1E3934D1614465B33053E7F48EE4EC87B14B95EF88947713D25EECBFF7E74C7977D02DC1D9451F79DD5D1C10C29ACB6A9B4D6FB7D0A0279B6719E1772565F09AF627715919221AEF91899CAE08C0D686D748B20A3603BE2318CA6BC2B59706592A9219D0BF05C9F65023A21D2330807252AE0066D59CEEFA5F2748EA80BAB81", "10001");
        }

        return y["prototype"]["convert"] = function S(e) {
          return e["s"] < 0 || 0 <= e["compareTo"](this["m"]) ? e["mod"](this["m"]) : e;
        }, y["prototype"]["revert"] = function M(e) {
          return e;
        }, y["prototype"]["reduce"] = function R(e) {
          e["divRemTo"](this["m"], null, e);
        }, y["prototype"]["mulTo"] = function F(e, t, s) {
          e["multiplyTo"](t, s), this["reduce"](s);
        }, y["prototype"]["sqrTo"] = function O(e, t) {
          e["squareTo"](t), this["reduce"](t);
        }, k["prototype"]["convert"] = function j(e) {
          var t = w();
          return e["abs"]()["dlShiftTo"](this["m"]["t"], t), t["divRemTo"](this["m"], null, t), e["s"] < 0 && 0 < t["compareTo"](v["ZERO"]) && this["m"]["subTo"](t, t), t;
        }, k["prototype"]["revert"] = function P(e) {
          var t = w();
          return e["copyTo"](t), this["reduce"](t), t;
        }, k["prototype"]["reduce"] = function I(e) {
          while (e["t"] <= this["mt2"]) e[e["t"]++] = 0;

          for (var t = 0; t < this["m"]["t"]; ++t) {
            var s = 32767 & e[t],
                n = s * this["mpl"] + ((s * this["mph"] + (e[t] >> 15) * this["mpl"] & this["um"]) << 15) & e["DM"];
            e[s = t + this["m"]["t"]] += this["m"]["am"](0, n, e, t, 0, this["m"]["t"]);

            while (e[s] >= e["DV"]) e[s] -= e["DV"], e[++s]++;
          }

          e["clamp"](), e["drShiftTo"](this["m"]["t"], e), 0 <= e["compareTo"](this["m"]) && e["subTo"](this["m"], e);
        }, k["prototype"]["mulTo"] = function N(e, t, s) {
          e["multiplyTo"](t, s), this["reduce"](s);
        }, k["prototype"]["sqrTo"] = function q(e, t) {
          e["squareTo"](t), this["reduce"](t);
        }, v["prototype"]["copyTo"] = function L(e) {
          for (var t = this["t"] - 1; 0 <= t; --t) e[t] = this[t];

          e["t"] = this["t"], e["s"] = this["s"];
        }, v["prototype"]["fromInt"] = function H(e) {
          this["t"] = 1, this["s"] = e < 0 ? -1 : 0, 0 < e ? this[0] = e : e < -1 ? this[0] = e + this["DV"] : this["t"] = 0;
        }, v["prototype"]["fromString"] = function $(e, t) {
          var s;
          if (16 == t) s = 4;else if (8 == t) s = 3;else if (256 == t) s = 8;else if (2 == t) s = 1;else if (32 == t) s = 5;else {
            if (4 != t) return void this["fromRadix"](e, t);
            s = 2;
          }
          this["t"] = 0, this["s"] = 0;
          var n,
              a,
              o = e["length"],
              r = !1,
              i = 0;

          while (0 <= --o) {
            var _ = 8 == s ? 255 & e[o] : (n = o, null == (a = f[e["charCodeAt"](n)]) ? -1 : a);

            _ < 0 ? "-" == e["charAt"](o) && (r = !0) : (r = !1, 0 == i ? this[this["t"]++] = _ : i + s > this["DB"] ? (this[this["t"] - 1] |= (_ & (1 << this["DB"] - i) - 1) << i, this[this["t"]++] = _ >> this["DB"] - i) : this[this["t"] - 1] |= _ << i, (i += s) >= this["DB"] && (i -= this["DB"]));
          }

          8 == s && 0 != (128 & e[0]) && (this["s"] = -1, 0 < i && (this[this["t"] - 1] |= (1 << this["DB"] - i) - 1 << i)), this["clamp"](), r && v["ZERO"]["subTo"](this, this);
        }, v["prototype"]["clamp"] = function X() {
          var e = this["s"] & this["DM"];

          while (0 < this["t"] && this[this["t"] - 1] == e) --this["t"];
        }, v["prototype"]["dlShiftTo"] = function U(e, t) {
          var s;

          for (s = this["t"] - 1; 0 <= s; --s) t[s + e] = this[s];

          for (s = e - 1; 0 <= s; --s) t[s] = 0;

          t["t"] = this["t"] + e, t["s"] = this["s"];
        }, v["prototype"]["drShiftTo"] = function V(e, t) {
          for (var s = e; s < this["t"]; ++s) t[s - e] = this[s];

          t["t"] = Math["max"](this["t"] - e, 0), t["s"] = this["s"];
        }, v["prototype"]["lShiftTo"] = function W(e, t) {
          var s,
              n = e % this["DB"],
              a = this["DB"] - n,
              o = (1 << a) - 1,
              r = Math["floor"](e / this["DB"]),
              i = this["s"] << n & this["DM"];

          for (s = this["t"] - 1; 0 <= s; --s) t[s + r + 1] = this[s] >> a | i, i = (this[s] & o) << n;

          for (s = r - 1; 0 <= s; --s) t[s] = 0;

          t[r] = i, t["t"] = this["t"] + r + 1, t["s"] = this["s"], t["clamp"]();
        }, v["prototype"]["rShiftTo"] = function G(e, t) {
          t["s"] = this["s"];
          var s = Math["floor"](e / this["DB"]);
          if (s >= this["t"]) t["t"] = 0;else {
            var n = e % this["DB"],
                a = this["DB"] - n,
                o = (1 << n) - 1;
            t[0] = this[s] >> n;

            for (var r = s + 1; r < this["t"]; ++r) t[r - s - 1] |= (this[r] & o) << a, t[r - s] = this[r] >> n;

            0 < n && (t[this["t"] - s - 1] |= (this["s"] & o) << a), t["t"] = this["t"] - s, t["clamp"]();
          }
        }, v["prototype"]["subTo"] = function Y(e, t) {
          var s = 0,
              n = 0,
              a = Math["min"](e["t"], this["t"]);

          while (s < a) n += this[s] - e[s], t[s++] = n & this["DM"], n >>= this["DB"];

          if (e["t"] < this["t"]) {
            n -= e["s"];

            while (s < this["t"]) n += this[s], t[s++] = n & this["DM"], n >>= this["DB"];

            n += this["s"];
          } else {
            n += this["s"];

            while (s < e["t"]) n -= e[s], t[s++] = n & this["DM"], n >>= this["DB"];

            n -= e["s"];
          }

          t["s"] = n < 0 ? -1 : 0, n < -1 ? t[s++] = this["DV"] + n : 0 < n && (t[s++] = n), t["t"] = s, t["clamp"]();
        }, v["prototype"]["multiplyTo"] = function Z(e, t) {
          var s = this["abs"](),
              n = e["abs"](),
              a = s["t"];
          t["t"] = a + n["t"];

          while (0 <= --a) t[a] = 0;

          for (a = 0; a < n["t"]; ++a) t[a + s["t"]] = s["am"](0, n[a], t, a, 0, s["t"]);

          t["s"] = 0, t["clamp"](), this["s"] != e["s"] && v["ZERO"]["subTo"](t, t);
        }, v["prototype"]["squareTo"] = function Q(e) {
          var t = this["abs"](),
              s = e["t"] = 2 * t["t"];

          while (0 <= --s) e[s] = 0;

          for (s = 0; s < t["t"] - 1; ++s) {
            var n = t["am"](s, t[s], e, 2 * s, 0, 1);
            (e[s + t["t"]] += t["am"](s + 1, 2 * t[s], e, 2 * s + 1, n, t["t"] - s - 1)) >= t["DV"] && (e[s + t["t"]] -= t["DV"], e[s + t["t"] + 1] = 1);
          }

          0 < e["t"] && (e[e["t"] - 1] += t["am"](s, t[s], e, 2 * s, 0, 1)), e["s"] = 0, e["clamp"]();
        }, v["prototype"]["divRemTo"] = function J(e, t, s) {
          var n = e["abs"]();

          if (!(n["t"] <= 0)) {
            var a = this["abs"]();
            if (a["t"] < n["t"]) return null != t && t["fromInt"](0), void (null != s && this["copyTo"](s));
            null == s && (s = w());

            var o = w(),
                r = this["s"],
                i = e["s"],
                _ = this["DB"] - x(n[n["t"] - 1]);

            0 < _ ? (n["lShiftTo"](_, o), a["lShiftTo"](_, s)) : (n["copyTo"](o), a["copyTo"](s));
            var c = o["t"],
                u = o[c - 1];

            if (0 != u) {
              var p = u * (1 << this["F1"]) + (1 < c ? o[c - 2] >> this["F2"] : 0),
                  g = this["FV"] / p,
                  l = (1 << this["F1"]) / p,
                  d = 1 << this["F2"],
                  h = s["t"],
                  f = h - c,
                  m = null == t ? w() : t;
              o["dlShiftTo"](f, m), 0 <= s["compareTo"](m) && (s[s["t"]++] = 1, s["subTo"](m, s)), v["ONE"]["dlShiftTo"](c, m), m["subTo"](o, o);

              while (o["t"] < c) o[o["t"]++] = 0;

              while (0 <= --f) {
                var b = s[--h] == u ? this["DM"] : Math["floor"](s[h] * g + (s[h - 1] + d) * l);

                if ((s[h] += o["am"](0, b, s, f, 0, c)) < b) {
                  o["dlShiftTo"](f, m), s["subTo"](m, s);

                  while (s[h] < --b) s["subTo"](m, s);
                }
              }

              null != t && (s["drShiftTo"](c, t), r != i && v["ZERO"]["subTo"](t, t)), s["t"] = c, s["clamp"](), 0 < _ && s["rShiftTo"](_, s), r < 0 && v["ZERO"]["subTo"](s, s);
            }
          }
        }, v["prototype"]["invDigit"] = function K() {
          if (this["t"] < 1) return 0;
          var e = this[0];
          if (0 == (1 & e)) return 0;
          var t = 3 & e;
          return 0 < (t = (t = (t = (t = t * (2 - (15 & e) * t) & 15) * (2 - (255 & e) * t) & 255) * (2 - ((65535 & e) * t & 65535)) & 65535) * (2 - e * t % this["DV"]) % this["DV"]) ? this["DV"] - t : -t;
        }, v["prototype"]["isEven"] = function ee() {
          return 0 == (0 < this["t"] ? 1 & this[0] : this["s"]);
        }, v["prototype"]["exp"] = function te(e, t) {
          if (4294967295 < e || e < 1) return v["ONE"];
          var s = w(),
              n = w(),
              a = t["convert"](this),
              o = x(e) - 1;
          a["copyTo"](s);

          while (0 <= --o) if (t["sqrTo"](s, n), 0 < (e & 1 << o)) t["mulTo"](n, a, s);else {
            var r = s;
            s = n, n = r;
          }

          return t["revert"](s);
        }, v["prototype"]["toString"] = function se(e) {
          if (this["s"] < 0) return "-" + this["negate"]()["toString"](e);
          var t;
          if (16 == e) t = 4;else if (8 == e) t = 3;else if (2 == e) t = 1;else if (32 == e) t = 5;else {
            if (4 != e) return this["toRadix"](e);
            t = 2;
          }
          var s,
              n = (1 << t) - 1,
              a = !1,
              o = "",
              r = this["t"],
              i = this["DB"] - r * this["DB"] % t;

          if (0 < r--) {
            i < this["DB"] && 0 < (s = this[r] >> i) && (a = !0, o = m(s));

            while (0 <= r) i < t ? (s = (this[r] & (1 << i) - 1) << t - i, s |= this[--r] >> (i += this["DB"] - t)) : (s = this[r] >> (i -= t) & n, i <= 0 && (i += this["DB"], --r)), 0 < s && (a = !0), a && (o += m(s));
          }

          return a ? o : "0";
        }, v["prototype"]["negate"] = function ne() {
          var e = w();
          return v["ZERO"]["subTo"](this, e), e;
        }, v["prototype"]["abs"] = function ae() {
          return this["s"] < 0 ? this["negate"]() : this;
        }, v["prototype"]["compareTo"] = function oe(e) {
          var t = this["s"] - e["s"];
          if (0 != t) return t;
          var s = this["t"];
          if (0 != (t = s - e["t"])) return this["s"] < 0 ? -t : t;

          while (0 <= --s) if (0 != (t = this[s] - e[s])) return t;

          return 0;
        }, v["prototype"]["bitLength"] = function re() {
          return this["t"] <= 0 ? 0 : this["DB"] * (this["t"] - 1) + x(this[this["t"] - 1] ^ this["s"] & this["DM"]);
        }, v["prototype"]["mod"] = function ie(e) {
          var t = w();
          return this["abs"]()["divRemTo"](e, null, t), this["s"] < 0 && 0 < t["compareTo"](v["ZERO"]) && e["subTo"](t, t), t;
        }, v["prototype"]["modPowInt"] = function $_CEW(e, t) {
          var s;
          return s = e < 256 || t["isEven"]() ? new y(t) : new k(t), this["exp"](e, s);
        }, v["ZERO"] = b(0), v["ONE"] = b(1), C["prototype"]["doPublic"] = function ce(e) {
          return e["modPowInt"](this["e"], this["n"]);
        }, C["prototype"]["setPublic"] = function ue(e, t) {
          null != e && null != t && 0 < e["length"] && 0 < t["length"] ? (this["n"] = function s(e, t) {
            return new v(e, t);
          }(e, 16), this["e"] = parseInt(t, 16)) : console && console["error"] && console["error"]("Invalid RSA public key");
        }, C["prototype"]["encrypt"] = function pe(e) {
          var t = function i(e, t) {
            if (t < e["length"] + 11) return console && console["error"] && console["error"]("Message too long for RSA"), null;
            var s = [],
                n = e["length"] - 1;

            while (0 <= n && 0 < t) {
              var a = e["charCodeAt"](n--);
              a < 128 ? s[--t] = a : 127 < a && a < 2048 ? (s[--t] = 63 & a | 128, s[--t] = a >> 6 | 192) : (s[--t] = 63 & a | 128, s[--t] = a >> 6 & 63 | 128, s[--t] = a >> 12 | 224);
            }

            s[--t] = 0;
            var o = new g(),
                r = [];

            while (2 < t) {
              r[0] = 0;

              while (0 == r[0]) o["nextBytes"](r);

              s[--t] = r[0];
            }

            return s[--t] = 2, s[--t] = 0, new v(s);
          }(e, this["n"]["bitLength"]() + 7 >> 3);

          if (null == t) return null;
          var s = this["doPublic"](t);
          if (null == s) return null;
          var n = s["toString"](16);
          return 0 == (1 & n["length"]) ? n : "0" + n;
        }, C;
      }();
        _["default"] = _;

        var guid = function () {
            function e() {
                return (65536 * (1 + Math["random"]()) | 0)["toString"](16)["substring"](1);
            }

            return function () {
                return e() + e() + e() + e();
            }
                ;
        }();

        //var i = function () {
            // 内容需要自己抠出来
        //}();
        var i = function () {
        var e,
            s = Object["create"] || function () {
          function s() {}

          return function (e) {
            var t;
            return s["prototype"] = e, t = new s(), s["prototype"] = null, t;
          };
        }(),
            t = {},
            n = t["lib"] = {},
            a = n["Base"] = {
          "extend": function (e) {
            var t = s(this);
            return e && t["mixIn"](e), t["hasOwnProperty"]("init") && this["init"] !== t["init"] || (t["init"] = function () {
              t["$super"]["init"]["apply"](this, arguments);
            }), (t["init"]["prototype"] = t)["$super"] = this, t;
          },
          "create": function () {
            var e = this["extend"]();
            return e["init"]["apply"](e, arguments), e;
          },
          "init": function () {},
          "mixIn": function (e) {
            for (var t in e) e["hasOwnProperty"](t) && (this[t] = e[t]);

            e["hasOwnProperty"]("toString") && (this["toString"] = e["toString"]);
          }
        },
            u = n["WordArray"] = a["extend"]({
          "init": function (e, t) {
            e = this["words"] = e || [], t != undefined ? this["sigBytes"] = t : this["sigBytes"] = 4 * e["length"];
          },
          "concat": function (e) {
            var t = this["words"],
                s = e["words"],
                n = this["sigBytes"],
                a = e["sigBytes"];
            if (this["clamp"](), n % 4) for (var o = 0; o < a; o++) {
              var r = s[o >>> 2] >>> 24 - o % 4 * 8 & 255;
              t[n + o >>> 2] |= r << 24 - (n + o) % 4 * 8;
            } else for (o = 0; o < a; o += 4) t[n + o >>> 2] = s[o >>> 2];
            return this["sigBytes"] += a, this;
          },
          "clamp": function () {
            var e = this["words"],
                t = this["sigBytes"];
            e[t >>> 2] &= 4294967295 << 32 - t % 4 * 8, e["length"] = Math["ceil"](t / 4);
          }
        }),
            o = t["enc"] = {},
            p = o["Latin1"] = {
          "parse": function (e) {
            for (var t = e["length"], s = [], n = 0; n < t; n++) s[n >>> 2] |= (255 & e["charCodeAt"](n)) << 24 - n % 4 * 8;

            return new u["init"](s, t);
          }
        },
            r = o["Utf8"] = {
          "parse": function (e) {
            return p["parse"](unescape(encodeURIComponent(e)));
          }
        },
            i = n["BufferedBlockAlgorithm"] = a["extend"]({
          "reset": function () {
            this["$_JAr"] = new u["init"](), this["$_BCFd"] = 0;
          },
          "$_BCGa": function (e) {
            "string" == typeof e && (e = r["parse"](e)), this["$_JAr"]["concat"](e), this["$_BCFd"] += e["sigBytes"];
          },
          "$_BCHV": function (e) {
            var t = this["$_JAr"],
                s = t["words"],
                n = t["sigBytes"],
                a = this["blockSize"],
                o = n / (4 * a),
                r = (o = e ? Math["ceil"](o) : Math["max"]((0 | o) - this["$_BCIO"], 0)) * a,
                i = Math["min"](4 * r, n);

            if (r) {
              for (var _ = 0; _ < r; _ += a) this["$_BCJO"](s, _);

              var c = s["splice"](0, r);
              t["sigBytes"] -= i;
            }

            return new u["init"](c, i);
          },
          "$_BCIO": 0
        }),
            _ = t["algo"] = {},
            c = n["Cipher"] = i["extend"]({
          "cfg": a["extend"](),
          "createEncryptor": function (e, t) {
            return this["create"](this["$_BDAS"], e, t);
          },
          "init": function (e, t, s) {
            this["cfg"] = this["cfg"]["extend"](s), this["$_BDBd"] = e, this["$_BDCs"] = t, this["reset"]();
          },
          "reset": function () {
            i["reset"]["call"](this), this["$_BDDg"]();
          },
          "process": function (e) {
            return this["$_BCGa"](e), this["$_BCHV"]();
          },
          "finalize": function (e) {
            return e && this["$_BCGa"](e), this["$_BDEO"]();
          },
          "keySize": 4,
          "ivSize": 4,
          "$_BDAS": 1,
          "$_BDFj": 2,
          "$_BDGs": function (c) {
            return {
              "encrypt": function (e, t, s) {
                t = p["parse"](t), s && s["iv"] || ((s = s || {})["iv"] = p["parse"]("0000000000000000"));

                for (var n = b["encrypt"](c, e, t, s), a = n["ciphertext"]["words"], o = n["ciphertext"]["sigBytes"], r = [], i = 0; i < o; i++) {
                  var _ = a[i >>> 2] >>> 24 - i % 4 * 8 & 255;

                  r["push"](_);
                }

                return r;
              }
            };
          }
        }),
            g = t["mode"] = {},
            l = n["BlockCipherMode"] = a["extend"]({
          "createEncryptor": function (e, t) {
            return this["Encryptor"]["create"](e, t);
          },
          "init": function (e, t) {
            this["$_BDHv"] = e, this["$_BDIy"] = t;
          }
        }),
            d = g["CBC"] = ((e = l["extend"]())["Encryptor"] = e["extend"]({
          "processBlock": function (e, t) {
            var s = this["$_BDHv"],
                n = s["blockSize"];
            (function r(e, t, s) {
              var n = this["$_BDIy"];

              if (n) {
                var a = n;
                this["$_BDIy"] = undefined;
              } else var a = this["$_BDJH"];

              for (var o = 0; o < s; o++) e[t + o] ^= a[o];
            })["call"](this, e, t, n), s["encryptBlock"](e, t), this["$_BDJH"] = e["slice"](t, t + n);
          }
        }), e),
            h = (t["pad"] = {})["Pkcs7"] = {
          "pad": function (e, t) {
            for (var s = 4 * t, n = s - e["sigBytes"] % s, a = n << 24 | n << 16 | n << 8 | n, o = [], r = 0; r < n; r += 4) o["push"](a);

            var i = u["create"](o, n);
            e["concat"](i);
          }
        },
            f = n["BlockCipher"] = c["extend"]({
          "cfg": c["cfg"]["extend"]({
            "mode": d,
            "padding": h
          }),
          "reset": function () {
            c["reset"]["call"](this);
            var e = this["cfg"],
                t = e["iv"],
                s = e["mode"];
            if (this["$_BDBd"] == this["$_BDAS"]) var n = s["createEncryptor"];
            this["$_BEAZ"] && this["$_BEAZ"]["$_BEB_"] == n ? this["$_BEAZ"]["init"](this, t && t["words"]) : (this["$_BEAZ"] = n["call"](s, this, t && t["words"]), this["$_BEAZ"]["$_BEB_"] = n);
          },
          "$_BCJO": function (e, t) {
            this["$_BEAZ"]["processBlock"](e, t);
          },
          "$_BDEO": function () {
            var e = this["cfg"]["padding"];

            if (this["$_BDBd"] == this["$_BDAS"]) {
              e["pad"](this["$_JAr"], this["blockSize"]);
              var t = this["$_BCHV"](!0);
            }

            return t;
          },
          "blockSize": 4
        }),
            m = n["CipherParams"] = a["extend"]({
          "init": function (e) {
            this["mixIn"](e);
          }
        }),
            b = n["SerializableCipher"] = a["extend"]({
          "cfg": a["extend"](),
          "encrypt": function (e, t, s, n) {
            n = this["cfg"]["extend"](n);
            var a = e["createEncryptor"](s, n),
                o = a["finalize"](t),
                r = a["cfg"];
            return m["create"]({
              "ciphertext": o,
              "key": s,
              "iv": r["iv"],
              "algorithm": e,
              "mode": r["mode"],
              "padding": r["padding"],
              "blockSize": e["blockSize"],
              "formatter": n["format"]
            });
          }
        }),
            v = [],
            w = [],
            x = [],
            y = [],
            k = [],
            C = [],
            E = [],
            A = [],
            z = [],
            T = [];

        !function () {
          for (var e = [], t = 0; t < 256; t++) e[t] = t < 128 ? t << 1 : t << 1 ^ 283;

          var s = 0,
              n = 0;

          for (t = 0; t < 256; t++) {
            var a = n ^ n << 1 ^ n << 2 ^ n << 3 ^ n << 4;
            a = a >>> 8 ^ 255 & a ^ 99, v[s] = a;

            var o = e[w[a] = s],
                r = e[o],
                i = e[r],
                _ = 257 * e[a] ^ 16843008 * a;

            x[s] = _ << 24 | _ >>> 8, y[s] = _ << 16 | _ >>> 16, k[s] = _ << 8 | _ >>> 24, C[s] = _;
            _ = 16843009 * i ^ 65537 * r ^ 257 * o ^ 16843008 * s;
            E[a] = _ << 24 | _ >>> 8, A[a] = _ << 16 | _ >>> 16, z[a] = _ << 8 | _ >>> 24, T[a] = _, s ? (s = o ^ e[e[e[i ^ o]]], n ^= e[e[n]]) : s = n = 1;
          }
        }();
        var B = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54],
            D = _["AES"] = f["extend"]({
          "$_BDDg": function () {
            if (!this["$_BECV"] || this["$_BEDc"] !== this["$_BDCs"]) {
              for (var e = this["$_BEDc"] = this["$_BDCs"], t = e["words"], s = e["sigBytes"] / 4, n = 4 * (1 + (this["$_BECV"] = 6 + s)), a = this["$_BEEZ"] = [], o = 0; o < n; o++) if (o < s) a[o] = t[o];else {
                var r = a[o - 1];
                o % s ? 6 < s && o % s == 4 && (r = v[r >>> 24] << 24 | v[r >>> 16 & 255] << 16 | v[r >>> 8 & 255] << 8 | v[255 & r]) : (r = v[(r = r << 8 | r >>> 24) >>> 24] << 24 | v[r >>> 16 & 255] << 16 | v[r >>> 8 & 255] << 8 | v[255 & r], r ^= B[o / s | 0] << 24), a[o] = a[o - s] ^ r;
              }

              for (var i = this["$_BEFH"] = [], _ = 0; _ < n; _++) {
                o = n - _;
                if (_ % 4) r = a[o];else r = a[o - 4];
                i[_] = _ < 4 || o <= 4 ? r : E[v[r >>> 24]] ^ A[v[r >>> 16 & 255]] ^ z[v[r >>> 8 & 255]] ^ T[v[255 & r]];
              }
            }
          },
          "encryptBlock": function (e, t) {
            this["$_BEGu"](e, t, this["$_BEEZ"], x, y, k, C, v);
          },
          "$_BEGu": function (e, t, s, n, a, o, r, i) {
            for (var _ = this["$_BECV"], c = e[t] ^ s[0], u = e[t + 1] ^ s[1], p = e[t + 2] ^ s[2], g = e[t + 3] ^ s[3], l = 4, d = 1; d < _; d++) {
              var h = n[c >>> 24] ^ a[u >>> 16 & 255] ^ o[p >>> 8 & 255] ^ r[255 & g] ^ s[l++],
                  f = n[u >>> 24] ^ a[p >>> 16 & 255] ^ o[g >>> 8 & 255] ^ r[255 & c] ^ s[l++],
                  m = n[p >>> 24] ^ a[g >>> 16 & 255] ^ o[c >>> 8 & 255] ^ r[255 & u] ^ s[l++],
                  b = n[g >>> 24] ^ a[c >>> 16 & 255] ^ o[u >>> 8 & 255] ^ r[255 & p] ^ s[l++];
              c = h, u = f, p = m, g = b;
            }

            h = (i[c >>> 24] << 24 | i[u >>> 16 & 255] << 16 | i[p >>> 8 & 255] << 8 | i[255 & g]) ^ s[l++], f = (i[u >>> 24] << 24 | i[p >>> 16 & 255] << 16 | i[g >>> 8 & 255] << 8 | i[255 & c]) ^ s[l++], m = (i[p >>> 24] << 24 | i[g >>> 16 & 255] << 16 | i[c >>> 8 & 255] << 8 | i[255 & u]) ^ s[l++], b = (i[g >>> 24] << 24 | i[c >>> 16 & 255] << 16 | i[u >>> 8 & 255] << 8 | i[255 & p]) ^ s[l++];
            e[t] = h, e[t + 1] = f, e[t + 2] = m, e[t + 3] = b;
          },
          "keySize": 8
        });
        return t["AES"] = f["$_BDGs"](D), t["AES"];
      }();
        i["default"] = i;

        function arrayToHex(e) {
            for (var t = [], s = 0, a = 0; a < 2 * e["length"]; a += 2)
                t[a >>> 3] |= parseInt(e[s], 10) << 24 - a % 8 * 4,
                    s++;

            for (var o = [], n = 0; n < e["length"]; n++) {
                var r = t[n >>> 2] >>> 24 - n % 4 * 8 & 255;
                o["push"]((r >>> 4)["toString"](16)),
                    o["push"]((15 & r)["toString"](16));
            }

            return o["join"]("");
        }

        var a = guid(),
            o = new _["default"]()["encrypt"](a);


        var n = i["default"]["encrypt"](e, a);
        return arrayToHex(n) + o;
    }

    var passtime = get_passtime(track),
        setLeft = get_setLeft(track),
        userresponse = get_userresponse(setLeft, captcha_width);
    var e = {
        "setLeft": setLeft,
        "track": track,
        "passtime": passtime,
        "userresponse": userresponse,
        "device_id": "A59C",
        "lot_number": lot_number,
        "geetest": "captcha",
        "lang": "zh",
        "ep": "123",
        "nz8c": "255401529",
        "em": {
            "ph": 0,
            "cp": 0,
            "ek": "11",
            "wd": 1,
            "nt": 0,
            "si": 0,
            "sc": 0
        }
    }
    return get_h(d["default"]["stringify"](e))
}


console.log('====================== 测试区 ======================')

var track = [[47, 17, 0],],
    captcha_width = 300,
    lot_number = "13e35cf1c2834cb9afd01b89006c8f41";
var w = get_w(track, captcha_width, lot_number)
console.log(w)




