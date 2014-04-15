/* skelJS v0.4.8 | (c) n33 | skeljs.org | MIT licensed */
var skel = function () {
    var a = {
        config: {
            prefix: null,
            preloadStyleSheets: !1,
            pollOnce: !1,
            resetCSS: !1,
            normalizeCSS: !1,
            boxModel: null,
            useOrientation: !1,
            useRTL: !1,
            pollOnLock: !1,
            usePerpetualLock: !0,
            useDomainLock: !0,
            containers: 960,
            grid: {
                collapse: !1,
                gutters: 40
            },
            breakpoints: {
                all: {
                    range: "*",
                    hasStyleSheet: !1
                }
            },
            events: {}
        },
        isConfigured: !1,
        isInit: !1,
        lockState: null,
        stateId: "",
        me: null,
        breakpoints: [],
        breakpointList: [],
        events: [],
        plugins: {},
        cache: {
            elements: {},
            states: {}
        },
        locations: {
            html: null,
            head: null,
            body: null
        },
        vars: {},
        lsc: "_skel_lock",
        sd: " ",
        css: {
            r: "html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,embed,figure,figcaption,footer,header,hgroup,menu,nav,output,ruby,section,summary,time,mark,audio,video{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}body{line-height:1}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote:before,blockquote:after,q:before,q:after{content:'';content:none}table{border-collapse:collapse;border-spacing:0}body{-webkit-text-size-adjust:none}",
            n: 'article,aside,details,figcaption,figure,footer,header,hgroup,main,nav,section,summary{display:block}audio,canvas,video{display:inline-block}audio:not([controls]){display:none;height:0}[hidden]{display:none}html{background:#fff;color:#000;font-family:sans-serif;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}body{margin:0}a:focus{outline:thin dotted}a:active,a:hover{outline:0}h1{font-size:2em;margin:.67em 0}abbr[title]{border-bottom:1px dotted}b,strong{font-weight:bold}dfn{font-style:italic}hr{-moz-box-sizing:content-box;box-sizing:content-box;height:0}mark{background:#ff0;color:#000}code,kbd,pre,samp{font-family:monospace,serif;font-size:1em}pre{white-space:pre-wrap}q{quotes:"\u0081C" "\u0081D" "\u00818" "\u00819"}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sup{top:-0.5em}sub{bottom:-0.25em}img{border:0}svg:not(:root){overflow:hidden}figure{margin:0}fieldset{border:1px solid #c0c0c0;margin:0 2px;padding:.35em .625em .75em}legend{border:0;padding:0}button,input,select,textarea{font-family:inherit;font-size:100%;margin:0}button,input{line-height:normal}button,select{text-transform:none}button,html input[type="button"],input[type="reset"],input[type="submit"]{-webkit-appearance:button;cursor:pointer}button[disabled],html input[disabled]{cursor:default}input[type="checkbox"],input[type="radio"]{box-sizing:border-box;padding:0}input[type="search"]{-webkit-appearance:textfield;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;box-sizing:content-box}input[type="search"]::-webkit-search-cancel-button,input[type="search"]::-webkit-search-decoration{-webkit-appearance:none}button::-moz-focus-inner,input::-moz-focus-inner{border:0;padding:0}textarea{overflow:auto;vertical-align:top}table{border-collapse:collapse;border-spacing:0}'
        },
        presets: {
            "default": {},
            standard: {
                breakpoints: {
                    mobile: {
                        range: "-480",
                        lockViewport: !0,
                        containers: "fluid",
                        grid: {
                            collapse: 1,
                            gutters: 10
                        }
                    },
                    desktop: {
                        range: "481-",
                        containers: 1200
                    },
                    "1000px": {
                        range: "481-1200",
                        containers: 960
                    }
                }
            }
        },
        defaults: {
            breakpoint: {
                test: null,
                config: null,
                elements: null
            },
            config_breakpoint: {
                range: "",
                containers: 960,
                lockViewport: !1,
                viewportWidth: !1,
                hasStyleSheet: !0,
                grid: {}
            }
        },
        DOMReady: null,
        getElementsByClassName: null,
        indexOf: null,
        iterate: null,
        extend: function (b, d) {
            a.iterate(d, function (c) {
                "object" ==
                    typeof d[c] ? ("object" != typeof b[c] && (b[c] = {}), a.extend(b[c], d[c])) : b[c] = d[c]
            })
        },
        parseMeasurement: function (a) {
            var d;
            "string" !== typeof a ? a = [a, "px"] : "fluid" == a ? a = [100, "%"] : (d = a.match(/([0-9\.]+)([^\s]*)/), a = 3 > d.length || !d[2] ? [parseFloat(a), "px"] : [parseFloat(d[1]), d[2]]);
            return a
        },
        getDevicePixelRatio: function () {
            var b = navigator.userAgent;
            if ("ios" == a.vars.deviceType || "mac" == a.vars.deviceType || "windows" == a.vars.deviceType || "android" == a.vars.deviceType && b.match(/Safari\/([0-9]+)/) && 537 <= parseInt(RegExp.$1)) return 1;
            if (void 0 !== window.devicePixelRatio && !b.match(/(Firefox; Mobile)/)) return window.devicePixelRatio;
            if (window.matchMedia) {
                if (window.matchMedia("(-webkit-min-device-pixel-ratio: 2),(min--moz-device-pixel-ratio: 2),(-o-min-device-pixel-ratio: 2/1),(min-resolution: 2dppx)").matches) return 2;
                if (window.matchMedia("(-webkit-min-device-pixel-ratio: 1.5),(min--moz-device-pixel-ratio: 1.5),(-o-min-device-pixel-ratio: 3/2),(min-resolution: 1.5dppx)").matches) return 1.5
            }
            return 1
        },
        getLevel: function (a) {
            return "boolean" ==
                typeof a ? a ? 1 : 0 : parseInt(a)
        },
        getViewportWidth: function () {
            var b, d, c;
            b = document.documentElement.clientWidth;
            d = void 0 !== window.orientation ? Math.abs(window.orientation) : !1;
            c = a.getDevicePixelRatio();
            screen.width < b && (b = screen.width);
            !1 !== d && (b = a.config.useOrientation ? 90 === d ? Math.max(screen.width, screen.height) : Math.min(screen.width, screen.height) : Math.min(screen.width, screen.height));
            return b / c
        },
        unlock: function () {
            a.lockState = null;
            document.cookie = a.lsc + "=;expires=Thu, 1 Jan 1970 12:00:00 UTC; path=" + (a.config.useDomainLock ?
                "/" : window.location.pathname);
            a.config.pollOnLock ? a.poll() : window.location.reload()
        },
        lock: function (b) {
            a.lockState = b;
            document.cookie = a.lsc + "=" + b + ";expires=" + (a.config.usePerpetualLock ? "Thu, 1 Jan 2077 12:00:00 UTC" : 0) + "; path=" + (a.config.useDomainLock ? "/" : window.location.pathname);
            a.config.pollOnLock ? a.poll() : window.location.reload()
        },
        getLock: function () {
            return a.lockState
        },
        isLocked: function () {
            return !!a.lockState
        },
        hasActive: function (b) {
            var d = !1;
            a.iterate(b, function (c) {
                d = d || a.isActive(b[c])
            });
            return d
        },
        isActive: function (b) {
            return -1 !== a.indexOf(a.stateId, a.sd + b)
        },
        wasActive: function (b) {
            return -1 !== a.indexOf(a.vars.lastStateId, a.sd + b)
        },
        canUse: function (b) {
            return a.breakpoints[b] && a.breakpoints[b].test(a.getViewportWidth())
        },
        unreverseRows: function () {
            var b = a.getElementsByClassName("row");
            a.iterate(b, function (a) {
                if ("length" !== a && (a = b[a], a._skel_isReversed)) {
                    var c = a.children,
                        e;
                    for (e = 1; e < c.length; e++) a.insertBefore(c[e], c[0]);
                    a._skel_isReversed = !1
                }
            })
        },
        reverseRows: function (b) {
            var d = a.getElementsByClassName("row");
            a.iterate(d, function (a) {
                if ("length" !== a && (a = d[a], !(a._skel_isReversed || 0 < b && a.className.match(/\bno-collapse-([0-9])\b/) && parseInt(RegExp.$1) >= b))) {
                    var e = a.children,
                        f;
                    for (f = 1; f < e.length; f++) a.insertBefore(e[f], e[0]);
                    a._skel_isReversed = !0
                }
            })
        },
        bind: function (b, d) {
            a.events[b] || (a.events[b] = []);
            a.events[b].push(d)
        },
        trigger: function (b) {
            a.events[b] && 0 != a.events[b].length && a.iterate(a.events[b], function (d) {
                a.events[b][d]()
            })
        },
        onStateChange: function (b) {
            a.bind("stateChange", b);
            a.isInit && b()
        },
        registerLocation: function (b,
            d) {
            d._skel_attach = "head" == b ? function (b) {
                this === a.me.parentNode ? this.insertBefore(b, a.me) : this.appendChild(b)
            } : function (a) {
                this.appendChild(a)
            };
            a.locations[b] = d
        },
        cacheElement: function (b, d, c, e) {
            return a.cache.elements[b] = {
                id: b,
                object: d,
                location: c,
                priority: e
            }
        },
        cacheBreakpointElement: function (b, d, c, e, f) {
            var g = a.getCachedElement(d);
            g || (g = a.cacheElement(d, c, e, f));
            a.breakpoints[b] && a.breakpoints[b].elements.push(g);
            return g
        },
        getCachedElement: function (b) {
            return a.cache.elements[b] ? a.cache.elements[b] : null
        },
        detachAllElements: function () {
            var b;
            a.iterate(a.cache.elements, function (d) {
                b = a.cache.elements[d].object;
                if (b.parentNode && (!b.parentNode || b.parentNode.tagName) && (b.parentNode.removeChild(b), a.cache.elements[d].onDetach)) a.cache.elements[d].onDetach()
            })
        },
        attachElements: function (b) {
            var d = [],
                c = [],
                e;
            a.iterate(b, function (a) {
                d[b[a].priority] || (d[b[a].priority] = []);
                d[b[a].priority].push(b[a])
            });
            a.iterate(d, function (b) {
                0 != d[b].length && a.iterate(d[b], function (g) {
                    if (e = a.locations[d[b][g].location]) {
                        if (e._skel_attach(d[b][g].object),
                            d[b][g].onAttach) d[b][g].onAttach()
                    } else c.push(d[b][g])
                })
            });
            0 < c.length && a.DOMReady(function () {
                a.iterate(c, function (b) {
                    if (e = a.locations[c[b].location])
                        if (e._skel_attach(c[b].object), c[b].onAttach) c[b].onAttach()
                })
            })
        },
        poll: function () {
            var b, d = "";
            b = a.lockState ? a.lockState : a.getViewportWidth();
            a.vars.viewportWidth = b;
            a.vars.devicePixelRatio = a.getDevicePixelRatio();
            a.iterate(a.breakpoints, function (c) {
                a.breakpoints[c].test(b) && (d += a.sd + c)
            });
            "" === d && (d = a.sd);
            d !== a.stateId && (a.locations.html.className = a.locations.html.className.replace(a.stateId,
                ""), a.changeState(d), a.locations.html.className += a.stateId)
        },
        updateState: function () {
            var b, d = [],
                c = a.stateId.substring(1).split(a.sd);
            a.iterate(c, function (e) {
                b = a.breakpoints[c[e]];
                0 != b.elements.length && a.iterate(b.elements, function (c) {
                    a.cache.states[a.stateId].elements.push(b.elements[c]);
                    d.push(b.elements[c])
                })
            });
            0 < d.length && a.attachElements(d)
        },
        changeState: function (b) {
            var d, c, e, f, g, h, k;
            a.vars.lastStateId = a.stateId;
            a.stateId = b;
            if (a.cache.states[a.stateId]) c = a.cache.states[a.stateId];
            else {
                a.cache.states[a.stateId] = {
                    config: {},
                    elements: [],
                    values: {}
                };
                c = a.cache.states[a.stateId];
                d = a.stateId === a.sd ? [] : a.stateId.substring(1).split(a.sd);
                a.extend(c.config, a.defaults.config_breakpoint);
                a.iterate(d, function (b) {
                    a.extend(c.config, a.breakpoints[d[b]].config)
                });
                a.config.boxModel && (g = "iBM", (f = a.getCachedElement(g)) || (f = a.cacheElement(g, a.newInline("*,*:before,*:after{-moz-@;-webkit-@;-o-@;-ms-@;@}".replace(/@/g, "box-sizing:" + a.config.boxModel + "-box")), "head", 3)), c.elements.push(f));
                a.config.resetCSS ? (g = "iR", (f = a.getCachedElement(g)) ||
                    (f = a.cacheElement(g, a.newInline(a.css.r), "head", 2)), c.elements.push(f)) : a.config.normalizeCSS && (g = "iN", (f = a.getCachedElement(g)) || (f = a.cacheElement(g, a.newInline(a.css.n), "head", 2)), c.elements.push(f));

                a.config.prefix && (g = "ssB", (f = a.getCachedElement(g)) || (f = a.cacheElement(g, a.newStyleSheet(a.config.prefix + ".css"), "head", 4)), c.elements.push(f));

                c.config.lockViewport ? (g = "mVL" + a.stateId, (f = a.getCachedElement(g)) || (f = a.cacheElement(g, a.newMeta("viewport", "width=" + (c.config.viewportWidth ? c.config.viewportWidth :
                    "device-width") + ",initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"), "head", 1)), c.elements.push(f)) : c.config.viewportWidth && (g = "mV" + a.stateId, (f = a.getCachedElement(g)) || (f = a.cacheElement(g, a.newMeta("viewport", "width=" + c.config.viewportWidth), "head", 1)), c.elements.push(f));
                10 <= a.vars.IEVersion && (g = "mVIE" + a.stateId, (f = a.getCachedElement(g)) || (f = a.cacheElement(g, a.newInline("@-ms-viewport{width: device-width}"), "head", 2)), c.elements.push(f));
                e = a.parseMeasurement(c.config.containers);
                b = e[0];
                e = e[1];
                c.values.containers = b + e;
                g = "iC" + b + e;
                if (!(f = a.getCachedElement(g))) {
                    var l;
                    l = b + e;
                    f = a.cacheElement(g, a.newInline("body{min-width:" + l + "}.container{margin-left:auto;margin-right:auto;width:" + l + "}.container.small{width:" + (0.75 * b + e) + "}.container.big{width:100%;max-width:" + (1.25 * b + e) + ";min-width:" + l + "}"), "head", 3)
                }
                c.elements.push(f);
                g = "iG";
                (f = a.getCachedElement(g)) || (f = a.cacheElement(g, a.newInline(".\\31 2u{width:100%}.\\31 1u{width:91.6666666667%}.\\31 0u{width:83.3333333333%}.\\39 u{width:75%}.\\38 u{width:66.6666666667%}.\\37 u{width:58.3333333333%}.\\36 u{width:50%}.\\35 u{width:41.6666666667%}.\\34 u{width:33.3333333333%}.\\33 u{width:25%}.\\32 u{width:16.6666666667%}.\\31 u{width:8.3333333333%}.\\-11u{margin-left:91.6666666667%}.\\-10u{margin-left:83.3333333333%}.\\-9u{margin-left:75%}.\\-8u{margin-left:66.6666666667%}.\\-7u{margin-left:58.3333333333%}.\\-6u{margin-left:50%}.\\-5u{margin-left:41.6666666667%}.\\-4u{margin-left:33.3333333333%}.\\-3u{margin-left:25%}.\\-2u{margin-left:16.6666666667%}.\\-1u{margin-left:8.3333333333%}"),
                    "head", 3));
                c.elements.push(f);
                g = "iGR";
                (f = a.getCachedElement(g)) || (f = a.cacheElement(g, a.newInline(".row>*{float:left;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;-o-box-sizing:border-box;-ms-box-sizing:border-box;box-sizing:border-box}.row:after{content:'';display:block;clear:both;height:0}.row:first-child>*{padding-top:0!important}"), "head", 3));
                c.elements.push(f);
                g = "iGG" + c.config.grid.gutters;
                if (!(f = a.getCachedElement(g))) {
                    var m, n, p;
                    e = a.parseMeasurement(c.config.grid.gutters);
                    b = e[0];
                    m =
                        e[1];
                    e = b + m;
                    l = b / 2 + m;
                    n = b / 4 + m;
                    p = 1.5 * b + m;
                    b = 2 * b + m;
                    f = a.cacheElement("iGG" + c.config.grid.gutters, a.newInline(".row.flush{margin-left:0}.row.flush>*{padding:0!important}.row>*{padding-left:" + e + "}.row+.row>*{padding:" + e + " 0 0 " + e + "}.row{margin-left:-" + e + "}.row.half>*{padding-left:" + l + "}.row+.row.half>*{padding:" + l + " 0 0 " + l + "}.row.half{margin-left:-" + l + "}.row.quarter>*{padding-left:" + n + "}.row+.row.quarter>*{padding:" + n + " 0 0 " + n + "}.row.quarter{margin-left:-" + n + "}.row.oneandhalf>*{padding-left:" + p + "}.row+.row.oneandhalf>*{padding:" +
                        p + " 0 0 " + p + "}.row.oneandhalf{margin-left:-" + p + "}.row.double>*{padding-left:" + b + "}.row+.row.double>*{padding:" + b + " 0 0 " + b + "}.row.double{margin-left:-" + b + "}"), "head", 3)
                }
                c.elements.push(f);
                if (c.config.grid.collapse) {
                    b = a.getLevel(c.config.grid.collapse);
                    g = "iGC" + b;
                    if (!(f = a.getCachedElement(g))) {
                        h = ":not(.no-collapse)";
                        switch (b) {
                            case 4:
                                break;
                            case 3:
                                h += ":not(.no-collapse-3)";
                                break;
                            case 2:
                                h += ":not(.no-collapse-2):not(.no-collapse-3)";
                                break;
                            default:
                                h += ":not(.no-collapse-1):not(.no-collapse-2):not(.no-collapse-3)"
                        }
                        e =
                            a.parseMeasurement(c.config.grid.gutters);
                        k = e[0] / 2 + e[1];
                        f = a.cacheElement(g, a.newInline(".row" + h + "{margin-left:0}.row" + h + ">*{float:none!important;width:100%!important;margin-left:0!important}.row:not(.flush)" + h + ">*{padding:" + k + " 0 " + k + " 0!important;}.container{max-width:none!important;min-width:0!important;width:" + c.values.containers + "!important}"), "head", 3)
                    }
                    c.elements.push(f)
                }
                g = "iCd" + a.stateId;
                (f = a.getCachedElement(g)) || (h = [], k = [], a.iterate(a.breakpoints, function (b) {
                    -1 !== a.indexOf(d, b) ? h.push(".not-" +
                        b) : k.push(".only-" + b)
                }), b = (0 < h.length ? h.join(",") + "{display:none!important}" : "") + (0 < k.length ? k.join(",") + "{display:none!important}" : ""), f = a.cacheElement(g, a.newInline(b.replace(/\.([0-9])/, ".\\3$1 ")), "head", 3), c.elements.push(f));
                a.iterate(d, function (b) {
                    a.breakpoints[d[b]].config.hasStyleSheet && a.config.prefix && (g = "ss" + d[b], (f = a.getCachedElement(g)) || (f = a.cacheElement(g, a.newStyleSheet(a.config.prefix + "-" + d[b] + ".css"), "head", 5)), c.elements.push(f));
                    0 < a.breakpoints[d[b]].elements.length && a.iterate(a.breakpoints[d[b]].elements,
                        function (e) {
                            c.elements.push(a.breakpoints[d[b]].elements[e])
                        })
                })
            }
            a.detachAllElements();
            a.attachElements(c.elements);
            a.DOMReady(function () {
                var b, d = a.getLevel(c.config.grid.collapse);
                a.config.useRTL && (a.unreverseRows(), 0 < d && a.reverseRows(d));
                (b = a.getElementsByClassName("skel-cell-important")) && 0 < b.length && a.iterate(b, function (a) {
                    if ("length" !== a) {
                        a = b[a];
                        var c = a.parentNode;
                        c && (c = c.className.match(/no-collapse-([0-9])/) ? parseInt(RegExp.$1) : c.className.match(/no-collapse/) ? 100 : 0, c < d ? a.hasOwnProperty("_skel_cell_important_placeholder") && !1 !== a._skel_cell_important_placeholder || (c = document.createElement("div"), c.innerHTML = "", c.style.display = "none", a.parentNode.insertBefore(c, a.nextSibling), a.parentNode.insertBefore(a, a.parentNode.firstChild), a._skel_cell_important_placeholder = c) : (a.hasOwnProperty("_skel_cell_important_placeholder") || (a._skel_cell_important_placeholder = !1), c = a._skel_cell_important_placeholder, !1 !== c && (a.parentNode.insertBefore(a, c), a.parentNode.removeChild(c), a._skel_cell_important_placeholder = !1)))
                    }
                })
            });
            a.vars.state =
                a.cache.states[a.stateId];
            a.vars.stateId = a.stateId;
            a.trigger("stateChange")
        },
        newMeta: function (a, d) {
            var c = document.createElement("meta");
            c.name = a;
            c.content = d;
            return c
        },
        newStyleSheet: function (a) {
            var d = document.createElement("link");
            d.rel = "stylesheet";
            d.type = "text/css";
            d.href = a;
            return d
        },
        newInline: function (b) {
            var d;
            8 >= a.vars.IEVersion ? (d = document.createElement("span"), d.innerHTML = '&nbsp;<style type="text/css">' + b + "</style>") : (d = document.createElement("style"), d.type = "text/css", d.innerHTML = b);
            return d
        },
        newDiv: function (a) {
            var d = document.createElement("div");
            d.innerHTML = a;
            return d
        },
        registerPlugin: function (b, d) {
            a.plugins[b] = d;
            d._ = this;
            a.isConfigured && (a.initPluginConfig(b, a.plugins[b]), d.init())
        },
        initPluginConfig: function (b, d) {
            var c;
            c = "_skel_" + b + "_config";
            window[c] ? c = window[c] : (c = document.getElementsByTagName("script"), (c = c[c.length - 1].innerHTML.replace(/^\s+|\s+$/g, "")) && (c = eval("(" + c + ")")));
            "object" == typeof c && (c.preset && d.presets[c.preset] && a.extend(d.config, d.presets[c.preset]), a.extend(d.config,
                c))
        },
        initConfig: function () {
            function b(b, c) {
                var d;
                "string" != typeof c && (d = function (a) {
                    return !1
                });
                "*" == c ? d = function (a) {
                    return !0
                } : "-" == c.charAt(0) ? (f[b] = parseInt(c.substring(1)), d = function (a) {
                    return a <= f[b]
                }) : "-" == c.charAt(c.length - 1) ? (f[b] = parseInt(c.substring(0, c.length - 1)), d = function (a) {
                    return a >= f[b]
                }) : -1 != a.indexOf(c, "-") ? (c = c.split("-"), f[b] = [parseInt(c[0]), parseInt(c[1])], d = function (a) {
                    return a >= f[b][0] && a <= f[b][1]
                }) : (f[b] = parseInt(c), d = function (a) {
                    return a == f[b]
                });
                return d
            }
            var d, c, e, f = [],
                g = [];
            window._skel_config ? e = window._skel_config : (e = a.me.innerHTML.replace(/^\s+|\s+$/g, "")) && (e = eval("(" + e + ")"));
            "object" == typeof e && (e.preset && a.presets[e.preset] ? (a.config.breakpoints = {}, a.extend(a.config, a.presets[e.preset])) : e.breakpoints && (a.config.breakpoints = {}), a.extend(a.config, e));
            a.extend(a.defaults.config_breakpoint.grid, a.config.grid);
            a.defaults.config_breakpoint.containers = a.config.containers;
            a.iterate(a.config.breakpoints, function (e) {
                "object" != typeof a.config.breakpoints[e] && (a.config.breakpoints[e] = {
                    range: a.config.breakpoints[e]
                });
                d = {};
                a.extend(d, a.defaults.config_breakpoint);
                a.extend(d, a.config.breakpoints[e]);
                a.config.breakpoints[e] = d;
                c = {};
                a.extend(c, a.defaults.breakpoint);
                c.config = a.config.breakpoints[e];
                c.test = b(e, c.config.range);
                c.elements = [];
                a.breakpoints[e] = c;
                a.config.preloadStyleSheets && c.config.hasStyleSheet && g.push(a.config.prefix + "-" + e + ".css");
                a.breakpointList.push(e)
            });
            a.iterate(a.config.events, function (b) {
                a.bind(b, a.config.events[b])
            });
            0 < g.length && "file:" != window.location.protocol &&
                a.DOMReady(function () {
                    document.getElementsByTagName("head");
                    var b = new XMLHttpRequest;
                    a.iterate(g, function (a) {
                        b.open("GET", g[a], !1);
                        b.send("")
                    })
                })
        },
        initEvents: function () {
            a.config.pollOnce || (window.onresize = function () {
                a.poll()
            }, a.config.useOrientation && (window.onorientationchange = function () {
                a.poll()
            }))
        },
        initUtilityMethods: function () {
            document.addEventListener ? ! function (b, d) {
                a.DOMReady = d()
            }("domready", function () {
                var a = [],
                    d, c = document,
                    e = /^loaded|^c/.test(c.readyState);
                return c.addEventListener("DOMContentLoaded",
                    d = function () {
                        c.removeEventListener("DOMContentLoaded", d);
                        var f = void 0;
                        for (e = 1; f = a.shift() ;) f()
                    }),
                function (c) {
                    e ? c() : a.push(c)
                }
            }) : ! function (b, d) {
                a.DOMReady = d()
            }("domready", function (a) {
                function d(a) {
                    for (k = 1; a = c.shift() ;) a()
                }
                var c = [],
                    e, f = document,
                    g = f.documentElement,
                    h = g.doScroll,
                    k = (h ? /^loaded|^c/ : /^loaded|c/).test(f.readyState);
                return f.addEventListener && f.addEventListener("DOMContentLoaded", e = function () {
                    f.removeEventListener("DOMContentLoaded", e, !1);
                    d()
                }, !1), h && f.attachEvent("onreadystatechange", e = function () {
                    /^c/.test(f.readyState) &&
                        (f.detachEvent("onreadystatechange", e), d())
                }), a = h ? function (d) {
                    self != top ? k ? d() : c.push(d) : function () {
                        try {
                            g.doScroll("left")
                        } catch (c) {
                            return setTimeout(function () {
                                a(d)
                            }, 50)
                        }
                        d()
                    }()
                } : function (a) {
                    k ? a() : c.push(a)
                }
            });
            a.getElementsByClassName = document.getElementsByClassName ? function (a) {
                return document.getElementsByClassName(a)
            } : function (a) {
                var d = document;
                return d.querySelectorAll ? d.querySelectorAll(("." + a.replace(" ", " .")).replace(/\.([0-9])/, ".\\3$1 ")) : []
            };
            a.indexOf = Array.prototype.indexOf ? function (a, d) {
                return a.indexOf(d)
            } :
                function (a, d) {
                    if ("string" == typeof a) return a.indexOf(d);
                    var c;
                    c = d ? d : 0;
                    var e;
                    if (!this) throw new TypeError;
                    e = this.length;
                    if (0 === e || c >= e) return -1;
                    for (0 > c && (c = e - Math.abs(c)) ; c < e; c++)
                        if (this[c] === a) return c;
                    return -1
                };
            a.iterate = Object.keys ? function (a, d) {
                if (!a) return [];
                var c, e = Object.keys(a);
                for (c = 0; e[c]; c++) d(e[c])
            } : function (a, d) {
                if (!a) return [];
                for (var c in a) Object.prototype.hasOwnProperty.call(a, c) && d(c)
            }
        },
        initAPI: function () {
            var b, d, c = navigator.userAgent;
            a.vars.IEVersion = c.match(/MSIE ([0-9]+)\./) ? RegExp.$1 :
                99;
            a.vars.deviceType = "other";
            d = {
                ios: "(iPad|iPhone|iPod)",
                android: "Android",
                mac: "Macintosh",
                wp: "Windows Phone",
                windows: "Windows NT"
            };
            a.iterate(d, function (b) {
                c.match(RegExp(d[b], "g")) && (a.vars.deviceType = b)
            });
            switch (a.vars.deviceType) {
                case "ios":
                    c.match(/([0-9_]+) like Mac OS X/);
                    b = parseFloat(RegExp.$1.replace("_", ".").replace("_", ""));
                    break;
                case "android":
                    c.match(/Android ([0-9\.]+)/);
                    b = parseFloat(RegExp.$1);
                    break;
                case "mac":
                    c.match(/Mac OS X ([0-9_]+)/);
                    b = parseFloat(RegExp.$1.replace("_", ".").replace("_",
                        ""));
                    break;
                case "wp":
                    c.match(/IEMobile\/([0-9\.]+)/);
                    b = parseFloat(RegExp.$1);
                    break;
                case "windows":
                    c.match(/Windows NT ([0-9\.]+)/);
                    b = parseFloat(RegExp.$1);
                    break;
                default:
                    b = 99
            }
            a.vars.deviceVersion = b;
            a.vars.isTouch = "wp" == a.vars.deviceType ? 0 < navigator.msMaxTouchPoints : !!("ontouchstart" in window);
            b = document.cookie.split(";");
            a.iterate(b, function (c) {
                c = b[c].split("=");
                c[0].replace(/^\s+|\s+$/g, "") == a.lsc && (a.lockState = c[1])
            })
        },
        init: function (b, d) {
            a.initUtilityMethods();
            a.initAPI();
            b && (window._skel_config =
                b);
            d && a.iterate(d, function (a) {
                window["_skel_" + a + "_config"] = d[a]
            });
            a.initConfig();
            a.registerLocation("html", document.getElementsByTagName("html")[0]);
            a.registerLocation("head", document.getElementsByTagName("head")[0]);
            a.DOMReady(function () {
                a.registerLocation("body", document.getElementsByTagName("body")[0])
            });
            a.initEvents();
            a.poll();
            a.iterate(a.plugins, function (b) {
                a.initPluginConfig(b, a.plugins[b]);
                a.plugins[b].init()
            });
            a.isInit = !0
        },
        preInit: function () {
            var b = document.getElementsByTagName("script");
            a.me =
                b[b.length - 1];
            if (window._skel_config) a.isConfigured = !0;
            else if (s = document.getElementsByTagName("script"), s = s[s.length - 1].innerHTML.replace(/^\s+|\s+$/g, "")) a.isConfigured = !0;
            a.isConfigured && a.init()
        }
    };
    a.preInit();
    return a
}();