/**
 * Created by DELL on 2017/12/5.
 */
(function (d) {
    d.MtaH5 = d.MtaH5 || {};
    MtaH5.hack = function () {
        var d = document.getElementsByName("MTAH5"), g = {
            conf: {
                autoReport: 1,
                senseHash: 1,
                senseQuery: 0,
                userReport: 0
            }, user: {user_id: ""}
        };
        if (0 == d.length)for (var r = document.getElementsByTagName("script"), p = 0; p < r.length; p++)if ("undefined" !== typeof r[p].attributes.name && "MTAH5" == r[p].attributes.name.nodeValue) {
            d = [];
            d.push(r[p]);
            break
        }
        0 < d.length && function () {
            "undefined" !== typeof d[0].attributes.sid && (g.conf.sid = d[0].attributes.sid.nodeValue);
            "undefined" !== typeof d[0].attributes.cid && (g.conf.cid = d[0].attributes.cid.nodeValue);
            "object" === typeof _mtac && function () {
                for (var d in _mtac)if ("ignoreParams" == d) {
                    if ("string" == typeof _mtac[d] && /\w(,?)\w+/.test(_mtac[d])) {
                        var p = _mtac[d].split(",");
                        _mtac.hasOwnProperty(d) && (g.conf[d] = p)
                    }
                } else _mtac.hasOwnProperty(d) && (g.conf[d] = _mtac[d])
            }();
            "object" === typeof _user && function () {
                for (var d in _user)g.user.hasOwnProperty(d) && (g.user[d] = _user[d])
            }()
        }();
        g.conf.user = g.user;
        return g
    }
})(this);
(function (d, t) {
    function g(a) {
        a = window.localStorage ? localStorage.getItem(a) || sessionStorage.getItem(a) : (a = document.cookie.match(new RegExp("(?:^|;\\s)" + a + "=(.*?)(?:;\\s|$)"))) ? a[1] : "";
        return a
    }

    function r(a, b, c) {
        if (window.localStorage)try {
            c ? localStorage.setItem(a, b) : sessionStorage.setItem(a, b)
        } catch (A) {
        } else {
            var d = window.location.host, h = {
                "com.cn": 1,
                "js.cn": 1,
                "net.cn": 1,
                "gov.cn": 1,
                "com.hk": 1,
                "co.nz": 1
            }, f = d.split(".");
            2 < f.length && (d = (h[f.slice(-2).join(".")] ? f.slice(-3) : f.slice(-2)).join("."));
            document.cookie = a + "=" + b + ";path=/;domain=" + d + (c ? ";expires=" + c : "")
        }
    }

    function p(a) {
        var b = {};
        if (void 0 === a) {
            var c = window.location;
            a = c.host;
            var e = c.pathname;
            var h = c.search.substr(1);
            c = c.hash
        } else c = a.match(/\w+:\/\/((?:[\w-]+\.)+\w+)(?:\:\d+)?(\/[^\?\\\"\'\|\:<>]*)?(?:\?([^\'\"\\<>#]*))?(?:#(\w+))?/i) || [], a = c[1], e = c[2], h = c[3], c = c[4];
        void 0 !== c && (c = c.replace(/\"|\'|\<|\>/ig, "M"));
        h && function () {
            for (var a = h.split("&"), c = 0, d = a.length; c < d; c++)if (-1 != a[c].indexOf("=")) {
                var e = a[c].indexOf("="), k = a[c].slice(0, e);
                e = a[c].slice(e + 1);
                b[k] = e
            }
        }();
        h = function () {
            if ("undefined" === typeof h)return h;
            for (var a = h.split("&"), c = [], b = 0, e = a.length; b < e; b++)if (-1 != a[b].indexOf("=")) {
                var k = a[b].indexOf("="), n = a[b].slice(0, k);
                k = a[b].slice(k + 1);
                d.ignoreParams && -1 != d.ignoreParams.indexOf(n) || c.push(n + "=" + k)
            }
            return c.join("&")
        }();
        return {host: a, path: e, search: h, hash: c, param: b}
    }

    function x(a) {
        if (-1 !== ["11101110100011101110001001001", "11101110011110010000011000111", "11101110011011010001100011111"].indexOf(parseInt(d.sid).toString(2))) {
            a = a || "";
            for (var b = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], c = 10; 1 < c; c--) {
                var e = Math.floor(10 * Math.random()), h = b[e];
                b[e] = b[c - 1];
                b[c - 1] = h
            }
            for (c = e = 0; 5 > c; c++)e = 10 * e + b[c];
            a += e + "" + +new Date
        } else a = (a || "") + Math.round(2147483647 * (Math.random() || .5)) * +new Date % 1E10;
        return a
    }

    function u() {
        var a = p(), b = {
            dm: a.host,
            pvi: "",
            si: "",
            url: a.path,
            arg: encodeURIComponent(a.search || "").substr(0, 512),
            ty: 0
        };
        b.pvi = function () {
            if (d.userReport) {
                var a = g("pgv_uid");
                a && a == d.user.user_id || (b.ty = 1, r("pgv_uid", d.user.user_id, "Sun, 18 Jan 2038 00:00:00 GMT;"));
                a = d.user.user_id
            } else a =
                g("pgv_pvi"), a || (b.ty = 1, a = x(), r("pgv_pvi", a, "Sun, 18 Jan 2038 00:00:00 GMT;"));
            return a
        }();
        b.si = function () {
            var a = g("pgv_si");
            a || (a = x("s"), r("pgv_si", a));
            return a
        }();
        b.url = function () {
            var b = a.path;
            d.senseQuery && (b += a.search ? "?" + encodeURIComponent(a.search || "").substr(0, 512) : "");
            d.senseHash && (b += a.hash ? encodeURIComponent(a.hash) : "");
            return b
        }();
        return b
    }

    function w() {
        var a = p(document.referrer), b = p();
        return {
            rdm: a.host,
            rurl: a.path,
            rarg: encodeURIComponent(a.search || "").substr(0, 512),
            adt: b.param.ADTAG || b.param.adtag ||
            b.param.CKTAG || b.param.cktag || b.param.PTAG || b.param.ptag
        }
    }

    function v() {
        try {
            var a = navigator, b = screen || {width: "", height: "", colorDepth: ""};
            var c = {
                scr: b.width + "x" + b.height,
                scl: b.colorDepth + "-bit",
                lg: (a.language || a.userLanguage).toLowerCase(),
                tz: (new Date).getTimezoneOffset() / 60
            }
        } catch (e) {
            return {}
        }
        return c
    }

    function y(a) {
        a = a || {};
        for (var b in a)a.hasOwnProperty(b) && (d[b] = a[b]);
        if (d.sid)if (!d.userReport || d.user.user_id && Number.isInteger(d.user.user_id)) {
            a = [];
            for (var c = 0, e = [u(), w(), {r2: d.sid}, v(), {random: +new Date}], h = e.length; c < h; c++)for (b in e[c])e[c].hasOwnProperty(b) && a.push(b + "=" + ("undefined" == typeof e[c][b] ? "" : e[c][b]));
            var f = function (a) {
                a = Ta.src = ("https:" == document.location.protocol ? "https://pingtas.qq.com/webview" : "http://pingtcss.qq.com") + "/pingd?" + a.join("&");
                var b = new Image;
                Ta[d.sid] = b;
                b.onload = b.onerror = b.onabort = function () {
                    b = b.onload = b.onerror = b.onabort = null;
                    Ta[d.sid] = !0
                };
                b.src = a
            };
            f(a);
            d.performanceMonitor && (b = function () {
                if (window.performance) {
                    var a = window.performance.timing;
                    var b = {
                        value: a.domainLookupEnd -
                        a.domainLookupStart
                    }, c = {value: a.connectEnd - a.connectStart}, e = {value: a.responseStart - (a.requestStart || a.responseStart + 1)}, n = a.responseEnd - a.responseStart;
                    a.domContentLoadedEventStart ? 0 > n && (n = 0) : n = -1;
                    a = {
                        domainLookupTime: b,
                        connectTime: c,
                        requestTime: e,
                        resourcesLoadedTime: {value: n},
                        domParsingTime: {value: a.domContentLoadedEventStart ? a.domInteractive - a.domLoading : -1},
                        domContentLoadedTime: {value: a.domContentLoadedEventStart ? a.domContentLoadedEventStart - a.fetchStart : -1}
                    }
                } else a = "";
                b = [];
                c = [];
                e = 0;
                n = [u(), {r2: d.cid}, v(), {random: +new Date}];
                for (var h = n.length; e < h; e++)for (var q in n[e])n[e].hasOwnProperty(q) && c.push(q + "=" + ("undefined" == typeof n[e][q] ? "" : n[e][q]));
                for (q in a)a.hasOwnProperty(q) && ("domContentLoadedTime" == q ? c.push("r3=" + a[q].value) : b.push(a[q].value));
                c.push("ext=pfm=" + b.join("_"));
                f(c)
            }, "undefined" !== typeof window.performance && "undefined" !== typeof window.performance.timing && 0 != window.performance.timing.loadEventEnd ? b() : window.attachEvent ? window.attachEvent("onload", b) : window.addEventListener && window.addEventListener("load",
                b, !1))
        } else console.log("MTA H5\u5206\u6790\u9519\u8bef\u63d0\u793a\uff1a\u60a8\u9009\u62e9\u4e86\u7528\u6237\u7edf\u8ba1uv\uff0c\u8bf7\u8bbe\u7f6e\u4e1a\u52a1\u7684user_id\uff0c\u9700\u4e3aint\u7c7b\u578b"); else console.log("MTA H5\u5206\u6790\u9519\u8bef\u63d0\u793a\uff1a\u60a8\u6ca1\u6709\u8bbe\u7f6esid")
    }

    t.MtaH5 = t.MtaH5 || {};
    t.Ta = t.Ta || {};
    MtaH5.pgv = y;
    Ta.clickStat = MtaH5.clickStat = function (a, b) {
        var c = MtaH5.hack ? MtaH5.hack() : "", e = {};
        c.conf && function () {
            var a = c.conf, b;
            for (b in a)a.hasOwnProperty(b) &&
            (e[b] = a[b])
        }();
        if (e.cid) {
            var h = [], f = u(), g = {r2: d.sid};
            f.dm = "taclick";
            f.url = a;
            g.r2 = e.cid;
            g.r5 = function (a) {
                a = "undefined" === typeof a ? {} : a;
                var b = [], c;
                for (c in a)a.hasOwnProperty(c) && b.push(c + "=" + a[c]);
                return b.join(";")
            }(b);
            var m = 0;
            f = [f, w(), g, v(), {random: +new Date}];
            for (g = f.length; m < g; m++)for (var l in f[m])f[m].hasOwnProperty(l) && h.push(l + "=" + ("undefined" == typeof f[m][l] ? "" : f[m][l]));
            h = MtaH5.src = ("https:" == document.location.protocol ? "https://pingtas.qq.com/webview" : "http://pingtcss.qq.com") + "/pingd?" +
                h.join("&");
            var k = new Image;
            MtaH5["click_" + e.sid] = k;
            k.onload = k.onerror = k.onabort = function () {
                k = k.onload = k.onerror = k.onabort = null;
                MtaH5[e.sid] = !0
            };
            k.src = h
        } else console.log("MTA H5\u5206\u6790\u9519\u8bef\u63d0\u793a\uff1a\u60a8\u6ca1\u6709\u8bbe\u7f6ecid,\u8bf7\u5230\u7ba1\u7406\u53f0\u5f00\u901a\u81ea\u5b9a\u4e49\u4e8b\u4ef6\u5e76\u66f4\u65b0\u7edf\u8ba1\u4ee3\u7801")
    };
    Ta.clickShare = MtaH5.clickShare = function (a) {
        var b = MtaH5.hack ? MtaH5.hack() : "", c = {}, e = p();
        e = e.param.CKTAG || e.param.ckatg;
        var h = "undefined" === typeof e ? [] : e.split(".");
        b.conf && function () {
            var a = b.conf, d;
            for (d in a)a.hasOwnProperty(d) && (c[d] = a[d])
        }();
        if (c.cid) {
            e = [];
            var f = u(), g = {r2: d.sid};
            f.dm = "taclick_share";
            f.url = "mtah5-share-" + a;
            g.r2 = c.cid;
            g.r5 = function (a, b) {
                var c = [];
                2 === a.length && a[0] == b && c.push(a[0] + "=" + a[1]);
                return c.join(";")
            }(h, "mtah5_share");
            a = 0;
            f = [f, w(), g, v(), {random: +new Date}];
            for (g = f.length; a < g; a++)for (var m in f[a])f[a].hasOwnProperty(m) && e.push(m + "=" + ("undefined" == typeof f[a][m] ? "" : f[a][m]));
            m = MtaH5.src = ("https:" == document.location.protocol ?
                    "https://pingtas.qq.com/webview" : "http://pingtcss.qq.com") + "/pingd?" + e.join("&");
            var l = new Image;
            MtaH5["click_" + c.sid] = l;
            l.onload = l.onerror = l.onabort = function () {
                l = l.onload = l.onerror = l.onabort = null;
                MtaH5[c.sid] = !0
            };
            l.src = m
        }
    };
    var z = MtaH5.hack ? MtaH5.hack() : {};
    z.conf && function () {
        var a = z.conf, b;
        for (b in a)a.hasOwnProperty(b) && (d[b] = a[b])
    }();
    d.autoReport && y()
})({}, this);