define("examples/index", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function run() {
        var l = window.location;
        var path = "" + l.origin + l.pathname + "?run=examples/";
        var labs = "    \n  index\n  ags-viewer\n  ags-viewer&services=//maps.springfieldmo.gov/arcgis/rest/services&serviceType=MapServer&serviceName=Maps/Zoning&layers=6&center=-93.28,37.23\n  ags-viewer&services=//sampleserver3.arcgisonline.com/ArcGIS/rest/services&serviceName=SanFrancisco/311Incidents&layers=0&center=-122.49,37.738\n  ags-viewer&services=//sampleserver3.arcgisonline.com/ArcGIS/rest/services&serviceName=Fire/Sheep&layers=0,1,2&center=-117.9,34.35\n  ags-viewer&services=//sampleserver3.arcgisonline.com/ArcGIS/rest/services&serviceName=HomelandSecurity/operations&layers=0,1,2&center=-117.2,32.7\n  ags-viewer&services=//sampleserver3.arcgisonline.com/ArcGIS/rest/services&serviceName=Hydrography/Watershed173811&layers=0,1&center=-96.53,38.37\n  ags-viewer&services=//sampleserver3.arcgisonline.com/ArcGIS/rest/services&serviceName=Petroleum/KSFields&layers=0&center=-98.93,38.55\n\n  ags-viewer&services=//usgvl-shotgun02:6080/arcgis/rest/services&serviceName=Annotations/H840_ANNOTATIONS5&layers=3&center=-115.3,36.1&where=H8REGION=%27GREEN%27\n  ags-viewer&services=//usgvl-shotgun02:6080/arcgis/rest/services&serviceName=Annotations/H840_ANNOTATIONS5&layers=3&center=-115.3,36.1&where=H8REGION%20IN(%27RED%27,%27GREEN%27)\n\n  style-viewer\n\n    style-viewer&geom=point&style=icon/png\n    style-viewer&geom=point&style=icon/png,text/text\n    style-viewer&geom=point&style=%5B%7B\"image\":%7B\"imgSize\":%5B45,45%5D,\"rotation\":0,\"stroke\":%7B\"color\":\"rgba(255,25,0,0.8)\",\"width\":3%7D,\"path\":\"M23%202%20L23%2023%20L43%2016.5%20L23%2023%20L35%2040%20L23%2023%20L11%2040%20L23%2023%20L3%2017%20L23%2023%20L23%202%20Z\"%7D%7D%5D\n\n    style-viewer&geom=point&style=%5B%7B\"circle\":%7B\"fill\":%7B\"gradient\":%7B\"type\":\"linear(32,32,96,96)\",\"stops\":\"rgba(0,255,0,0.1)%200%25;rgba(0,255,0,0.8)%20100%25\"%7D%7D,\"opacity\":1,\"stroke\":%7B\"color\":\"rgba(0,255,0,1)\",\"width\":1%7D,\"radius\":64%7D%7D,%7B\"image\":%7B\"anchor\":%5B16,48%5D,\"size\":%5B32,48%5D,\"anchorXUnits\":\"pixels\",\"anchorYUnits\":\"pixels\",\"src\":\"http://openlayers.org/en/v3.20.1/examples/data/icon.png\"%7D%7D,%7B\"text\":%7B\"fill\":%7B\"color\":\"rgba(75,92,85,0.85)\"%7D,\"stroke\":%7B\"color\":\"rgba(255,255,255,1)\",\"width\":5%7D,\"offset-x\":0,\"offset-y\":16,\"text\":\"fantasy%20light\",\"font\":\"18px%20serif\"%7D%7D%5D    \n\n    style-viewer&geom=point&style=%5B%7B\"image\":%7B\"imgSize\":%5B13,21%5D,\"fill\":%7B\"color\":\"rgba(0,0,0,0.5)\"%7D,\"path\":\"M6.3,0C6.3,0,0,0.1,0,7.5c0,3.8,6.3,12.6,6.3,12.6s6.3-8.8,6.3-12.7C12.6,0.1,6.3,0,6.3,0z%20M6.3,8.8%20c-1.4,0-2.5-1.1-2.5-2.5c0-1.4,1.1-2.5,2.5-2.5c1.4,0,2.5,1.1,2.5,2.5C8.8,7.7,7.7,8.8,6.3,8.8z\"%7D%7D%5D\n\n    style-viewer&geom=point&style=%5B%7B\"image\":%7B\"imgSize\":%5B15,15%5D,\"anchor\":%5B0,0.5%5D,\"fill\":%7B\"color\":\"rgba(255,0,0,0.1)\"%7D,\"stroke\":%7B\"color\":\"rgba(255,0,0,1)\",\"width\":0.1%7D,\"scale\":8,\"rotation\":0.7,\"img\":\"lock\"%7D%7D,%7B\"image\":%7B\"imgSize\":%5B15,15%5D,\"anchor\":%5B100,0.5%5D,\"anchorXUnits\":\"pixels\",\"fill\":%7B\"color\":\"rgba(0,255,0,0.4)\"%7D,\"stroke\":%7B\"color\":\"rgba(255,0,0,1)\",\"width\":0.1%7D,\"scale\":1.5,\"rotation\":0.7,\"img\":\"lock\"%7D%7D,%7B\"image\":%7B\"imgSize\":%5B15,15%5D,\"anchor\":%5B-10,0%5D,\"anchorXUnits\":\"pixels\",\"anchorOrigin\":\"top-right\",\"fill\":%7B\"color\":\"rgba(230,230,80,1)\"%7D,\"stroke\":%7B\"color\":\"rgba(0,0,0,1)\",\"width\":0.5%7D,\"scale\":2,\"rotation\":0.8,\"img\":\"lock\"%7D%7D%5D\n\n\n    style-viewer&geom=multipoint&style=icon/png\n\n    style-viewer&geom=polyline&style=stroke/dot\n\n    style-viewer&geom=polygon&style=fill/diagonal\n    style-viewer&geom=polygon&style=fill/horizontal,fill/vertical,stroke/dashdotdot\n    style-viewer&geom=polygon&style=stroke/solid,text/text\n    style-viewer&geom=polygon-with-holes&style=fill/cross,stroke/solid\n\n    style-viewer&geom=multipolygon&style=stroke/solid,fill/horizontal,text/text\n\n    style-viewer&geom=point&style=%5B%7B%22image%22:%7B%22imgSize%22:%5B15,15%5D,%22fill%22:%7B%22color%22:%22rgba(250,250,250,1)%22%7D,%22stroke%22:%7B%22color%22:%22rgba(0,0,0,1)%22,%22width%22:1%7D,%22path%22:%22M15,6.8182L15,8.5l-6.5-1l-0.3182,4.7727L11,14v1l-3.5-0.6818L4,15v-1l2.8182-1.7273L6.5,7.5L0,8.5V6.8182L6.5,4.5v-3c0,0,0-1.5,1-1.5s1,1.5,1,1.5v2.8182L15,6.8182z%22%7D%7D%5D\n    ";
        var styles = document.createElement("style");
        document.head.appendChild(styles);
        styles.innerText += "\n    #map {\n        display: none;\n    }\n    .test {\n        margin: 20px;\n    }\n    ";
        var labDiv = document.createElement("div");
        document.body.appendChild(labDiv);
        labDiv.innerHTML = labs
            .split(/ /)
            .map(function (v) { return v.trim(); })
            .filter(function (v) { return !!v; })
            .map(function (lab) { return "<div class='test'><a href='" + path + lab + "'>" + lab + "</a></div>"; })
            .join("\n");
    }
    exports.run = run;
    ;
});
define("node_modules/ol3-fun/ol3-fun/snapshot", ["require", "exports", "openlayers"], function (require, exports, ol) {
    "use strict";
    function getStyle(feature) {
        var style = feature.getStyle();
        if (!style) {
            var styleFn = feature.getStyleFunction();
            if (styleFn) {
                style = styleFn(0);
            }
        }
        if (!style) {
            style = new ol.style.Style({
                text: new ol.style.Text({
                    text: "?"
                })
            });
        }
        if (!Array.isArray(style))
            style = [style];
        return style;
    }
    var Snapshot = (function () {
        function Snapshot() {
        }
        Snapshot.render = function (canvas, feature) {
            feature = feature.clone();
            var geom = feature.getGeometry();
            var extent = geom.getExtent();
            var isPoint = extent[0] === extent[2];
            var _a = ol.extent.getCenter(extent), dx = _a[0], dy = _a[1];
            var scale = isPoint ? 1 : Math.min(canvas.width / ol.extent.getWidth(extent), canvas.height / ol.extent.getHeight(extent));
            geom.translate(-dx, -dy);
            geom.scale(scale, -scale);
            geom.translate(canvas.width / 2, canvas.height / 2);
            var vtx = ol.render.toContext(canvas.getContext("2d"));
            var styles = getStyle(feature);
            if (!Array.isArray(styles))
                styles = [styles];
            styles.forEach(function (style) { return vtx.drawFeature(feature, style); });
        };
        Snapshot.snapshot = function (feature) {
            var canvas = document.createElement("canvas");
            var geom = feature.getGeometry();
            this.render(canvas, feature);
            return canvas.toDataURL();
        };
        return Snapshot;
    }());
    return Snapshot;
});
define("node_modules/ol3-fun/ol3-fun/common", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function uuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    exports.uuid = uuid;
    function asArray(list) {
        var result = new Array(list.length);
        for (var i = 0; i < list.length; i++) {
            result[i] = list[i];
        }
        return result;
    }
    exports.asArray = asArray;
    function toggle(e, className, force) {
        var exists = e.classList.contains(className);
        if (exists && force !== true) {
            e.classList.remove(className);
            return false;
        }
        ;
        if (!exists && force !== false) {
            e.classList.add(className);
            return true;
        }
        return exists;
    }
    exports.toggle = toggle;
    function parse(v, type) {
        if (typeof type === "string")
            return v;
        if (typeof type === "number")
            return parseFloat(v);
        if (typeof type === "boolean")
            return (v === "1" || v === "true");
        if (Array.isArray(type)) {
            return (v.split(",").map(function (v) { return parse(v, type[0]); }));
        }
        throw "unknown type: " + type;
    }
    exports.parse = parse;
    function getQueryParameters(options, url) {
        if (url === void 0) { url = window.location.href; }
        var opts = options;
        Object.keys(opts).forEach(function (k) {
            doif(getParameterByName(k, url), function (v) {
                var value = parse(v, opts[k]);
                if (value !== undefined)
                    opts[k] = value;
            });
        });
    }
    exports.getQueryParameters = getQueryParameters;
    function getParameterByName(name, url) {
        if (url === void 0) { url = window.location.href; }
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);
        if (!results)
            return null;
        if (!results[2])
            return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
    exports.getParameterByName = getParameterByName;
    function doif(v, cb) {
        if (v !== undefined && v !== null)
            cb(v);
    }
    exports.doif = doif;
    function mixin(a, b) {
        Object.keys(b).forEach(function (k) { return a[k] = b[k]; });
        return a;
    }
    exports.mixin = mixin;
    function defaults(a) {
        var b = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            b[_i - 1] = arguments[_i];
        }
        b.forEach(function (b) {
            Object.keys(b).filter(function (k) { return a[k] === undefined; }).forEach(function (k) { return a[k] = b[k]; });
        });
        return a;
    }
    exports.defaults = defaults;
    function cssin(name, css) {
        var id = "style-" + name;
        var styleTag = document.getElementById(id);
        if (!styleTag) {
            styleTag = document.createElement("style");
            styleTag.id = id;
            styleTag.type = "text/css";
            document.head.appendChild(styleTag);
            styleTag.appendChild(document.createTextNode(css));
        }
        var dataset = styleTag.dataset;
        dataset["count"] = parseInt(dataset["count"] || "0") + 1 + "";
        return function () {
            dataset["count"] = parseInt(dataset["count"] || "0") - 1 + "";
            if (dataset["count"] === "0") {
                styleTag.remove();
            }
        };
    }
    exports.cssin = cssin;
    function debounce(func, wait, immediate) {
        var _this = this;
        if (wait === void 0) { wait = 50; }
        if (immediate === void 0) { immediate = false; }
        var timeout;
        return (function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var later = function () {
                timeout = null;
                if (!immediate)
                    func.apply(_this, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = window.setTimeout(later, wait);
            if (callNow)
                func.call(_this, args);
        });
    }
    exports.debounce = debounce;
    function html(html) {
        var a = document.createElement("div");
        a.innerHTML = html;
        return (a.firstElementChild || a.firstChild);
    }
    exports.html = html;
    function pair(a1, a2) {
        var result = new Array(a1.length * a2.length);
        var i = 0;
        a1.forEach(function (v1) { return a2.forEach(function (v2) { return result[i++] = [v1, v2]; }); });
        return result;
    }
    exports.pair = pair;
    function range(n) {
        var result = new Array(n);
        for (var i = 0; i < n; i++)
            result[i] = i;
        return result;
    }
    exports.range = range;
    function shuffle(array) {
        var currentIndex = array.length;
        var temporaryValue;
        var randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }
    exports.shuffle = shuffle;
});
define("node_modules/ol3-fun/ol3-fun/navigation", ["require", "exports", "openlayers", "node_modules/ol3-fun/ol3-fun/common"], function (require, exports, ol, common_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function zoomToFeature(map, feature, options) {
        options = common_1.defaults(options || {}, {
            duration: 1000,
            padding: 256,
            minResolution: 2 * map.getView().getMinResolution()
        });
        var view = map.getView();
        var currentExtent = view.calculateExtent(map.getSize());
        var targetExtent = feature.getGeometry().getExtent();
        var doit = function (duration) {
            view.fit(targetExtent, {
                size: map.getSize(),
                padding: [options.padding, options.padding, options.padding, options.padding],
                minResolution: options.minResolution,
                duration: duration
            });
        };
        if (ol.extent.containsExtent(currentExtent, targetExtent)) {
            doit(options.duration);
        }
        else if (ol.extent.containsExtent(currentExtent, targetExtent)) {
            doit(options.duration);
        }
        else {
            var fullExtent = ol.extent.createEmpty();
            ol.extent.extend(fullExtent, currentExtent);
            ol.extent.extend(fullExtent, targetExtent);
            var dscale = ol.extent.getWidth(fullExtent) / ol.extent.getWidth(currentExtent);
            var duration = 0.5 * options.duration;
            view.fit(fullExtent, {
                size: map.getSize(),
                padding: [options.padding, options.padding, options.padding, options.padding],
                minResolution: options.minResolution,
                duration: duration
            });
            setTimeout(function () { return doit(0.5 * options.duration); }, duration);
        }
    }
    exports.zoomToFeature = zoomToFeature;
});
define("node_modules/ol3-fun/ol3-fun/parse-dms", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function decDegFromMatch(m) {
        var signIndex = {
            "-": -1,
            "N": 1,
            "S": -1,
            "E": 1,
            "W": -1
        };
        var latLonIndex = {
            "-": "",
            "N": "lat",
            "S": "lat",
            "E": "lon",
            "W": "lon"
        };
        var degrees, minutes, seconds, sign, latLon;
        sign = signIndex[m[2]] || signIndex[m[1]] || signIndex[m[6]] || 1;
        degrees = Number(m[3]);
        minutes = m[4] ? Number(m[4]) : 0;
        seconds = m[5] ? Number(m[5]) : 0;
        latLon = latLonIndex[m[1]] || latLonIndex[m[6]];
        if (!inRange(degrees, 0, 180))
            throw 'Degrees out of range';
        if (!inRange(minutes, 0, 60))
            throw 'Minutes out of range';
        if (!inRange(seconds, 0, 60))
            throw 'Seconds out of range';
        return {
            decDeg: sign * (degrees + minutes / 60 + seconds / 3600),
            latLon: latLon
        };
    }
    function inRange(value, a, b) {
        return value >= a && value <= b;
    }
    function parse(dmsString) {
        var _a;
        dmsString = dmsString.trim();
        var dmsRe = /([NSEW])?(-)?(\d+(?:\.\d+)?)[°º:d\s]?\s?(?:(\d+(?:\.\d+)?)['’‘′:]\s?(?:(\d{1,2}(?:\.\d+)?)(?:"|″|’’|'')?)?)?\s?([NSEW])?/i;
        var dmsString2;
        var m1 = dmsString.match(dmsRe);
        if (!m1)
            throw 'Could not parse string';
        if (m1[1]) {
            m1[6] = undefined;
            dmsString2 = dmsString.substr(m1[0].length - 1).trim();
        }
        else {
            dmsString2 = dmsString.substr(m1[0].length).trim();
        }
        var decDeg1 = decDegFromMatch(m1);
        var m2 = dmsString2.match(dmsRe);
        var decDeg2 = m2 && decDegFromMatch(m2);
        if (typeof decDeg1.latLon === 'undefined') {
            if (!isNaN(decDeg1.decDeg) && decDeg2 && isNaN(decDeg2.decDeg)) {
                return decDeg1.decDeg;
            }
            else if (!isNaN(decDeg1.decDeg) && decDeg2 && !isNaN(decDeg2.decDeg)) {
                decDeg1.latLon = 'lat';
                decDeg2.latLon = 'lon';
            }
            else {
                throw 'Could not parse string';
            }
        }
        if (typeof decDeg2.latLon === 'undefined') {
            decDeg2.latLon = decDeg1.latLon === 'lat' ? 'lon' : 'lat';
        }
        return _a = {},
            _a[decDeg1.latLon] = decDeg1.decDeg,
            _a[decDeg2.latLon] = decDeg2.decDeg,
            _a;
    }
    exports.parse = parse;
});
define("node_modules/ol3-fun/index", ["require", "exports", "node_modules/ol3-fun/ol3-fun/common", "node_modules/ol3-fun/ol3-fun/navigation", "node_modules/ol3-fun/ol3-fun/parse-dms"], function (require, exports, common, navigation, dms) {
    "use strict";
    var index = common.defaults(common, {
        dms: dms,
        navigation: navigation
    });
    return index;
});
define("ol3-symbolizer/common/assign", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function assign(obj, prop, value) {
        if (value === null)
            return;
        if (value === undefined)
            return;
        if (typeof value === "object") {
            if (Object.keys(value).length === 0)
                return;
        }
        if (prop === "image") {
            if (value.hasOwnProperty("radius")) {
                prop = "circle";
            }
            if (value.hasOwnProperty("points")) {
                var points = value["points"];
                if (points < Infinity) {
                    prop = "star";
                }
            }
        }
        obj[prop] = value;
    }
    exports.assign = assign;
});
define("ol3-symbolizer/common/mixin", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function mixin(a, b) {
        Object.keys(b).forEach(function (k) { return a[k] = b[k]; });
        return a;
    }
    exports.mixin = mixin;
});
define("ol3-symbolizer/common/doif", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function doif(v, cb) {
        if (v !== undefined && v !== null)
            cb(v);
    }
    exports.doif = doif;
});
define("ol3-symbolizer/format/plugins/as-cross", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Shapeshifter = (function () {
        function Shapeshifter() {
        }
        Shapeshifter.is = function (style) {
            if (!style)
                return false;
            if (!!style.cross)
                return true;
            if (!style.star)
                return false;
            if (!style.star.radius)
                return false;
            if (4 !== style.star.points)
                return false;
            if (0 != style.star.radius2)
                return false;
            if (0 != style.star.angle)
                return false;
            return true;
        };
        Shapeshifter.as = function (style) {
            var star = style.star;
            if (!star)
                throw "star expected";
            var result = {
                cross: {
                    size: star.radius * 2,
                    opacity: star.opacity,
                    rotateWithView: star.rotateWithView,
                    rotation: star.rotation,
                    scale: star.scale,
                    snapToPixel: star.snapToPixel,
                    stroke: star.stroke,
                }
            };
            return result;
        };
        Shapeshifter.inverse = function (style) {
            var cross = style.cross;
            if (!cross)
                return style;
            return {
                star: {
                    radius: cross.size / 2,
                    radius2: 0,
                    points: 4,
                    angle: 0,
                    opacity: cross.opacity,
                    rotateWithView: cross.rotateWithView,
                    rotation: cross.rotation,
                    scale: cross.scale,
                    snapToPixel: cross.snapToPixel,
                    stroke: cross.stroke,
                }
            };
        };
        return Shapeshifter;
    }());
    exports.Shapeshifter = Shapeshifter;
});
define("ol3-symbolizer/format/plugins/as-square", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Shapeshifter = (function () {
        function Shapeshifter() {
        }
        Shapeshifter.is = function (style) {
            if (!style)
                return false;
            if (!!style.square)
                return true;
            if (!style.star)
                return false;
            if (!style.star.radius)
                return false;
            if (4 !== style.star.points)
                return false;
            if (undefined !== style.star.radius2)
                return false;
            if (0.7853981633974483 != style.star.angle)
                return false;
            return true;
        };
        Shapeshifter.as = function (style) {
            var star = style.star;
            if (!star)
                throw "star expected";
            var result = {
                square: {
                    size: star.radius * 2,
                    fill: star.fill,
                    opacity: star.opacity,
                    rotateWithView: star.rotateWithView,
                    rotation: star.rotation,
                    scale: star.scale,
                    snapToPixel: star.snapToPixel,
                    stroke: star.stroke,
                }
            };
            return result;
        };
        Shapeshifter.inverse = function (style) {
            var square = style.square;
            if (!square)
                return style;
            return {
                star: {
                    radius: square.size / 2,
                    radius2: undefined,
                    points: 4,
                    angle: 0.7853981633974483,
                    fill: square.fill,
                    opacity: square.opacity,
                    rotateWithView: square.rotateWithView,
                    rotation: square.rotation,
                    scale: square.scale,
                    snapToPixel: square.snapToPixel,
                    stroke: square.stroke,
                }
            };
        };
        return Shapeshifter;
    }());
    exports.Shapeshifter = Shapeshifter;
});
define("ol3-symbolizer/format/plugins/as-diamond", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Shapeshifter = (function () {
        function Shapeshifter() {
        }
        Shapeshifter.is = function (style) {
            if (!style)
                return false;
            if (!!style.diamond)
                return true;
            if (!style.star)
                return false;
            if (!style.star.radius)
                return false;
            if (4 !== style.star.points)
                return false;
            if (undefined !== style.star.radius2)
                return false;
            if (0 != style.star.angle)
                return false;
            return true;
        };
        Shapeshifter.as = function (style) {
            var star = style.star;
            if (!star)
                throw "star expected";
            var result = {
                diamond: {
                    size: style.star.radius * 2,
                    fill: star.fill,
                    opacity: star.opacity,
                    rotateWithView: star.rotateWithView,
                    rotation: star.rotation,
                    scale: star.scale,
                    snapToPixel: star.snapToPixel,
                    stroke: star.stroke,
                }
            };
            return result;
        };
        Shapeshifter.inverse = function (style) {
            var diamond = style.diamond;
            if (!diamond)
                return style;
            return {
                star: {
                    radius: diamond.size / 2,
                    radius2: undefined,
                    points: 4,
                    angle: 0,
                    fill: diamond.fill,
                    opacity: diamond.opacity,
                    rotateWithView: diamond.rotateWithView,
                    rotation: diamond.rotation,
                    scale: diamond.scale,
                    snapToPixel: diamond.snapToPixel,
                    stroke: diamond.stroke,
                }
            };
        };
        return Shapeshifter;
    }());
    exports.Shapeshifter = Shapeshifter;
});
define("ol3-symbolizer/format/plugins/as-triangle", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Shapeshifter = (function () {
        function Shapeshifter() {
        }
        Shapeshifter.is = function (style) {
            if (!style)
                return false;
            if (!!style.triangle)
                return true;
            if (!style.star)
                return false;
            if (!style.star.radius)
                return false;
            if (3 !== style.star.points)
                return false;
            if (undefined != style.star.radius2)
                return false;
            if (0 != style.star.angle)
                return false;
            return true;
        };
        Shapeshifter.as = function (style) {
            var star = style.star;
            if (!star)
                throw "star expected";
            var result = {
                triangle: {
                    size: star.radius * 2,
                    fill: star.fill,
                    opacity: star.opacity,
                    rotateWithView: star.rotateWithView,
                    rotation: star.rotation,
                    scale: star.scale,
                    snapToPixel: star.snapToPixel,
                    stroke: star.stroke,
                }
            };
            return result;
        };
        Shapeshifter.inverse = function (style) {
            var triangle = style.triangle;
            if (!triangle)
                return style;
            return {
                star: {
                    radius: triangle.size / 2,
                    radius2: undefined,
                    points: 3,
                    angle: 0,
                    fill: triangle.fill,
                    opacity: triangle.opacity,
                    rotateWithView: triangle.rotateWithView,
                    rotation: triangle.rotation,
                    scale: triangle.scale,
                    snapToPixel: triangle.snapToPixel,
                    stroke: triangle.stroke,
                }
            };
        };
        return Shapeshifter;
    }());
    exports.Shapeshifter = Shapeshifter;
});
define("ol3-symbolizer/format/plugins/as-x", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Shapeshifter = (function () {
        function Shapeshifter() {
        }
        Shapeshifter.is = function (style) {
            if (!style)
                return false;
            if (!!style.x)
                return true;
            if (!style.star)
                return false;
            if (!style.star.radius)
                return false;
            if (4 !== style.star.points)
                return false;
            if (0 != style.star.radius2)
                return false;
            if (0.7853981633974483 != style.star.angle)
                return false;
            return true;
        };
        Shapeshifter.as = function (style) {
            var star = style.star;
            if (!star)
                throw "star expected";
            var result = {
                x: {
                    size: star.radius * 2,
                    opacity: star.opacity,
                    rotateWithView: star.rotateWithView,
                    rotation: star.rotation,
                    scale: star.scale,
                    snapToPixel: star.snapToPixel,
                    stroke: star.stroke,
                }
            };
            return result;
        };
        Shapeshifter.inverse = function (style) {
            var x = style.x;
            if (!x)
                return style;
            return {
                star: {
                    radius: x.size / 2,
                    radius2: 0,
                    points: 4,
                    angle: 0.7853981633974483,
                    opacity: x.opacity,
                    rotateWithView: x.rotateWithView,
                    rotation: x.rotation,
                    scale: x.scale,
                    snapToPixel: x.snapToPixel,
                    stroke: x.stroke,
                }
            };
        };
        return Shapeshifter;
    }());
    exports.Shapeshifter = Shapeshifter;
});
define("ol3-symbolizer/format/ol3-symbolizer", ["require", "exports", "openlayers", "ol3-symbolizer/common/assign", "ol3-symbolizer/common/mixin", "ol3-symbolizer/common/doif", "ol3-symbolizer/format/plugins/as-cross", "ol3-symbolizer/format/plugins/as-square", "ol3-symbolizer/format/plugins/as-diamond", "ol3-symbolizer/format/plugins/as-triangle", "ol3-symbolizer/format/plugins/as-x"], function (require, exports, ol, assign_1, mixin_1, doif_1, as_cross_1, as_square_1, as_diamond_1, as_triangle_1, as_x_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var StyleConverter = (function () {
        function StyleConverter() {
            this.converters = [];
            this.converters.push(as_cross_1.Shapeshifter);
            this.converters.push(as_square_1.Shapeshifter);
            this.converters.push(as_diamond_1.Shapeshifter);
            this.converters.push(as_triangle_1.Shapeshifter);
            this.converters.push(as_x_1.Shapeshifter);
        }
        StyleConverter.prototype.fromJson = function (json) {
            this.converters.some(function (c) { return c.is(json) && c.inverse && !!(json = c.inverse(json)); });
            return this.deserializeStyle(json);
        };
        StyleConverter.prototype.toJson = function (style) {
            var result = this.serializeStyle(style);
            this.converters.some(function (c) { return c.is(result) && c.as && !!(result = c.as(result)); });
            return result;
        };
        StyleConverter.prototype.getGeometry = function (feature) {
            var geom = feature.getGeometry();
            if (geom instanceof ol.geom.Polygon) {
                geom = geom.getInteriorPoint();
            }
            return geom;
        };
        StyleConverter.prototype.serializeStyle = function (style) {
            var s = {};
            if (!style)
                return null;
            if (typeof style === "string")
                throw style;
            if (typeof style === "number")
                throw style;
            if (style.getColor)
                mixin_1.mixin(s, this.serializeColor(style.getColor()));
            if (style.getImage)
                assign_1.assign(s, "image", this.serializeImage(style.getImage()));
            if (style.getFill)
                assign_1.assign(s, "fill", this.serializeFill(style.getFill()));
            if (style.getOpacity)
                assign_1.assign(s, "opacity", style.getOpacity());
            if (style.getStroke)
                assign_1.assign(s, "stroke", this.serializeStroke(style.getStroke()));
            if (style.getText)
                assign_1.assign(s, "text", this.serializeText(style.getText()));
            if (style.getWidth)
                assign_1.assign(s, "width", style.getWidth());
            if (style.getOffsetX)
                assign_1.assign(s, "offset-x", style.getOffsetX());
            if (style.getOffsetY)
                assign_1.assign(s, "offset-y", style.getOffsetY());
            if (style.getWidth)
                assign_1.assign(s, "width", style.getWidth());
            if (style.getFont)
                assign_1.assign(s, "font", style.getFont());
            if (style.getRadius)
                assign_1.assign(s, "radius", style.getRadius());
            if (style.getRadius2)
                assign_1.assign(s, "radius2", style.getRadius2());
            if (style.getPoints)
                assign_1.assign(s, "points", style.getPoints());
            if (style.getAngle)
                assign_1.assign(s, "angle", style.getAngle());
            if (style.getRotation)
                assign_1.assign(s, "rotation", style.getRotation());
            if (style.getOrigin)
                assign_1.assign(s, "origin", style.getOrigin());
            if (style.getScale)
                assign_1.assign(s, "scale", style.getScale());
            if (style.getSize)
                assign_1.assign(s, "size", style.getSize());
            if (style.getAnchor) {
                assign_1.assign(s, "anchor", style.getAnchor());
                "anchorXUnits,anchorYUnits,anchorOrigin".split(",").forEach(function (k) {
                    assign_1.assign(s, k, style[k + "_"]);
                });
            }
            if (style.path) {
                if (style.path)
                    assign_1.assign(s, "path", style.path);
                if (style.getImageSize)
                    assign_1.assign(s, "imgSize", style.getImageSize());
                if (style.stroke)
                    assign_1.assign(s, "stroke", style.stroke);
                if (style.fill)
                    assign_1.assign(s, "fill", style.fill);
                if (style.scale)
                    assign_1.assign(s, "scale", style.scale);
                if (style.imgSize)
                    assign_1.assign(s, "imgSize", style.imgSize);
            }
            if (style.getSrc)
                assign_1.assign(s, "src", style.getSrc());
            return s;
        };
        StyleConverter.prototype.serializeImage = function (style) {
            if (typeof style === "string")
                throw style;
            if (typeof style === "number")
                throw style;
            return this.serializeStyle(style);
        };
        StyleConverter.prototype.serializeStroke = function (style) {
            if (typeof style === "string")
                throw style;
            if (typeof style === "number")
                throw style;
            return this.serializeStyle(style);
        };
        StyleConverter.prototype.serializeText = function (style) {
            return style;
        };
        StyleConverter.prototype.serializeColor = function (color) {
            if (color instanceof Array) {
                return {
                    color: ol.color.asString(color)
                };
            }
            else if (color instanceof CanvasGradient) {
                return {
                    gradient: color
                };
            }
            else if (color instanceof CanvasPattern) {
                return {
                    pattern: color
                };
            }
            else if (typeof color === "string") {
                return {
                    color: color
                };
            }
            throw "unknown color type";
        };
        StyleConverter.prototype.serializeFill = function (fill) {
            return this.serializeStyle(fill);
        };
        StyleConverter.prototype.deserializeStyle = function (json) {
            var _this = this;
            var image;
            var text;
            var fill;
            var stroke;
            if (json.circle)
                image = this.deserializeCircle(json.circle);
            else if (json.star)
                image = this.deserializeStar(json.star);
            else if (json.icon)
                image = this.deserializeIcon(json.icon);
            else if (json.svg)
                image = this.deserializeSvg(json.svg);
            else if (json.image && (json.image.img || json.image.path))
                image = this.deserializeSvg(json.image);
            else if (json.image && json.image.src)
                image = this.deserializeIcon(json.image);
            else if (json.image)
                throw "unknown image type";
            if (json.text)
                text = this.deserializeText(json.text);
            if (json.fill)
                fill = this.deserializeFill(json.fill);
            if (json.stroke)
                stroke = this.deserializeStroke(json.stroke);
            var s = new ol.style.Style({
                image: image,
                text: text,
                fill: fill,
                stroke: stroke
            });
            image && s.setGeometry(function (feature) { return _this.getGeometry(feature); });
            return s;
        };
        StyleConverter.prototype.deserializeText = function (json) {
            var _a;
            json.rotation = json.rotation || 0;
            json.scale = json.scale || 1;
            var _b = [json["offset-x"] || 0, json["offset-y"] || 0], x = _b[0], y = _b[1];
            {
                var p = new ol.geom.Point([x, y]);
                p.rotate(json.rotation, [0, 0]);
                p.scale(json.scale, json.scale);
                _a = p.getCoordinates(), x = _a[0], y = _a[1];
            }
            return new ol.style.Text({
                fill: json.fill && this.deserializeFill(json.fill),
                stroke: json.stroke && this.deserializeStroke(json.stroke),
                text: json.text,
                font: json.font,
                offsetX: x,
                offsetY: y,
                rotation: json.rotation,
                scale: json.scale
            });
        };
        StyleConverter.prototype.deserializeCircle = function (json) {
            var image = new ol.style.Circle({
                radius: json.radius,
                fill: json.fill && this.deserializeFill(json.fill),
                stroke: json.stroke && this.deserializeStroke(json.stroke)
            });
            image.setOpacity(json.opacity);
            return image;
        };
        StyleConverter.prototype.deserializeStar = function (json) {
            var image = new ol.style.RegularShape({
                radius: json.radius,
                radius2: json.radius2,
                points: json.points,
                angle: json.angle,
                fill: json.fill && this.deserializeFill(json.fill),
                stroke: json.stroke && this.deserializeStroke(json.stroke)
            });
            doif_1.doif(json.rotation, function (v) { return image.setRotation(v); });
            doif_1.doif(json.opacity, function (v) { return image.setOpacity(v); });
            return image;
        };
        StyleConverter.prototype.deserializeIcon = function (json) {
            if (!json.anchor) {
                json.anchor = [json["anchor-x"] || 0.5, json["anchor-y"] || 0.5];
            }
            var image = new ol.style.Icon({
                anchor: json.anchor || [0.5, 0.5],
                anchorOrigin: json.anchorOrigin || "top-left",
                anchorXUnits: json.anchorXUnits || "fraction",
                anchorYUnits: json.anchorYUnits || "fraction",
                img: undefined,
                imgSize: undefined,
                offset: json.offset,
                offsetOrigin: json.offsetOrigin,
                opacity: json.opacity,
                scale: json.scale,
                snapToPixel: json.snapToPixel,
                rotateWithView: json.rotateWithView,
                rotation: json.rotation,
                size: json.size,
                src: json.src,
                color: json.color
            });
            image.load();
            return image;
        };
        StyleConverter.prototype.deserializeSvg = function (json) {
            var _a;
            json.rotation = json.rotation || 0;
            json.scale = json.scale || 1;
            if (json.img) {
                var symbol = document.getElementById(json.img);
                if (!symbol) {
                    throw "unable to find svg element: " + json.img;
                }
                if (symbol) {
                    var path = (symbol.getElementsByTagName("path")[0]);
                    if (path) {
                        if (symbol.viewBox) {
                            if (!json.imgSize) {
                                json.imgSize = [symbol.viewBox.baseVal.width, symbol.viewBox.baseVal.height];
                            }
                        }
                        json.path = (json.path || "") + path.getAttribute('d');
                    }
                }
            }
            var canvas = document.createElement("canvas");
            if (json.path) {
                {
                    _a = json.imgSize.map(function (v) { return v * json.scale; }), canvas.width = _a[0], canvas.height = _a[1];
                    if (json.stroke && json.stroke.width) {
                        var dx = 2 * json.stroke.width * json.scale;
                        canvas.width += dx;
                        canvas.height += dx;
                    }
                }
                var ctx = canvas.getContext('2d');
                var path2d = new Path2D(json.path);
                ctx.translate(canvas.width / 2, canvas.height / 2);
                ctx.scale(json.scale, json.scale);
                ctx.translate(-json.imgSize[0] / 2, -json.imgSize[1] / 2);
                if (json.fill) {
                    ctx.fillStyle = json.fill.color;
                    ctx.fill(path2d);
                }
                if (json.stroke) {
                    ctx.strokeStyle = json.stroke.color;
                    ctx.lineWidth = json.stroke.width;
                    ctx.stroke(path2d);
                }
            }
            var icon = new ol.style.Icon({
                img: canvas,
                imgSize: [canvas.width, canvas.height],
                rotation: json.rotation,
                scale: 1,
                anchor: json.anchor || [canvas.width / 2, canvas.height],
                anchorOrigin: json.anchorOrigin,
                anchorXUnits: json.anchorXUnits || "pixels",
                anchorYUnits: json.anchorYUnits || "pixels",
                offset: json.offset,
                offsetOrigin: json.offsetOrigin,
                opacity: json.opacity,
                snapToPixel: json.snapToPixel,
                rotateWithView: json.rotateWithView,
                size: [canvas.width, canvas.height],
                src: undefined
            });
            return mixin_1.mixin(icon, {
                path: json.path,
                stroke: json.stroke,
                fill: json.fill,
                scale: json.scale,
                imgSize: json.imgSize
            });
        };
        StyleConverter.prototype.deserializeFill = function (json) {
            var fill = new ol.style.Fill({
                color: json && this.deserializeColor(json)
            });
            return fill;
        };
        StyleConverter.prototype.deserializeStroke = function (json) {
            var stroke = new ol.style.Stroke();
            doif_1.doif(json.color, function (v) { return stroke.setColor(v); });
            doif_1.doif(json.lineCap, function (v) { return stroke.setLineCap(v); });
            doif_1.doif(json.lineDash, function (v) { return stroke.setLineDash(v); });
            doif_1.doif(json.lineJoin, function (v) { return stroke.setLineJoin(v); });
            doif_1.doif(json.miterLimit, function (v) { return stroke.setMiterLimit(v); });
            doif_1.doif(json.width, function (v) { return stroke.setWidth(v); });
            return stroke;
        };
        StyleConverter.prototype.deserializeColor = function (fill) {
            var _a;
            if (fill.color) {
                return fill.color;
            }
            if (fill.gradient) {
                var type = fill.gradient.type;
                var gradient_1;
                if (0 === type.indexOf("linear(")) {
                    gradient_1 = this.deserializeLinearGradient(fill.gradient);
                }
                else if (0 === type.indexOf("radial(")) {
                    gradient_1 = this.deserializeRadialGradient(fill.gradient);
                }
                if (fill.gradient.stops) {
                    mixin_1.mixin(gradient_1, {
                        stops: fill.gradient.stops
                    });
                    var stops = fill.gradient.stops.split(";");
                    stops = stops.map(function (v) { return v.trim(); });
                    stops.forEach(function (colorstop) {
                        var stop = colorstop.match(/ \d+%/m)[0];
                        var color = colorstop.substr(0, colorstop.length - stop.length);
                        gradient_1.addColorStop(parseInt(stop) / 100, color);
                    });
                }
                return gradient_1;
            }
            if (fill.pattern) {
                var repitition = fill.pattern.repitition;
                var canvas = document.createElement('canvas');
                var spacing = canvas.width = canvas.height = fill.pattern.spacing | 6;
                var context_1 = canvas.getContext('2d');
                context_1.fillStyle = fill.pattern.color;
                switch (fill.pattern.orientation) {
                    case "horizontal":
                        for (var i = 0; i < spacing; i++) {
                            context_1.fillRect(i, 0, 1, 1);
                        }
                        break;
                    case "vertical":
                        for (var i = 0; i < spacing; i++) {
                            context_1.fillRect(0, i, 1, 1);
                        }
                        break;
                    case "cross":
                        for (var i = 0; i < spacing; i++) {
                            context_1.fillRect(i, 0, 1, 1);
                            context_1.fillRect(0, i, 1, 1);
                        }
                        break;
                    case "forward":
                        for (var i = 0; i < spacing; i++) {
                            context_1.fillRect(i, i, 1, 1);
                        }
                        break;
                    case "backward":
                        for (var i = 0; i < spacing; i++) {
                            context_1.fillRect(spacing - 1 - i, i, 1, 1);
                        }
                        break;
                    case "diagonal":
                        for (var i = 0; i < spacing; i++) {
                            context_1.fillRect(i, i, 1, 1);
                            context_1.fillRect(spacing - 1 - i, i, 1, 1);
                        }
                        break;
                }
                return mixin_1.mixin(context_1.createPattern(canvas, repitition), fill.pattern);
            }
            if (fill.image) {
                var canvas = document.createElement('canvas');
                var _b = (_a = fill.image.imgSize, canvas.width = _a[0], canvas.height = _a[1], _a), w_1 = _b[0], h_1 = _b[1];
                var context_2 = canvas.getContext('2d');
                var _c = [0, 0], dx = _c[0], dy = _c[1];
                var image_1 = document.createElement("img");
                image_1.src = fill.image.imageData;
                image_1.onload = function () { return context_2.drawImage(image_1, 0, 0, w_1, h_1); };
                return "rgba(255,255,255,0.1)";
            }
            throw "invalid color configuration";
        };
        StyleConverter.prototype.deserializeLinearGradient = function (json) {
            var rx = /\w+\((.*)\)/m;
            var _a = JSON.parse(json.type.replace(rx, "[$1]")), x0 = _a[0], y0 = _a[1], x1 = _a[2], y1 = _a[3];
            var canvas = document.createElement('canvas');
            canvas.width = Math.max(x0, x1);
            canvas.height = Math.max(y0, y1);
            var context = canvas.getContext('2d');
            var gradient = context.createLinearGradient(x0, y0, x1, y1);
            mixin_1.mixin(gradient, {
                type: "linear(" + [x0, y0, x1, y1].join(",") + ")"
            });
            return gradient;
        };
        StyleConverter.prototype.deserializeRadialGradient = function (json) {
            var rx = /radial\((.*)\)/m;
            var _a = JSON.parse(json.type.replace(rx, "[$1]")), x0 = _a[0], y0 = _a[1], r0 = _a[2], x1 = _a[3], y1 = _a[4], r1 = _a[5];
            var canvas = document.createElement('canvas');
            canvas.width = 2 * Math.max(x0, x1);
            canvas.height = 2 * Math.max(y0, y1);
            var context = canvas.getContext('2d');
            var gradient = context.createRadialGradient(x0, y0, r0, x1, y1, r1);
            mixin_1.mixin(gradient, {
                type: "radial(" + [x0, y0, r0, x1, y1, r1].join(",") + ")"
            });
            return gradient;
        };
        return StyleConverter;
    }());
    exports.StyleConverter = StyleConverter;
});
define("examples/styles/icon/png", ["require", "exports"], function (require, exports) {
    "use strict";
    return [
        {
            "circle": {
                "fill": {
                    "gradient": {
                        "type": "linear(32,32,96,96)",
                        "stops": "rgba(0,255,0,0.1) 0%;rgba(0,255,0,0.8) 100%"
                    }
                },
                "opacity": 1,
                "stroke": {
                    "color": "rgba(0,255,0,1)",
                    "width": 1
                },
                "radius": 64
            }
        },
        {
            "image": {
                "anchor": [16, 48],
                "imgSize": [32, 48],
                "anchorXUnits": "pixels",
                "anchorYUnits": "pixels",
                "src": "http://openlayers.org/en/v3.20.1/examples/data/icon.png"
            }
        }
    ];
});
define("examples/ags-style-converter", ["require", "exports", "openlayers", "jquery", "node_modules/ol3-fun/ol3-fun/snapshot", "node_modules/ol3-fun/index", "ol3-symbolizer/format/ol3-symbolizer", "examples/styles/icon/png"], function (require, exports, ol, $, Snapshot, index_1, ol3_symbolizer_1, pointStyle) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var html = "\n<div class='style-to-canvas'>\n    <h3>Renders a feature on a canvas</h3>\n    <div class=\"area\">\n        <label>256 x 256 Canvas</label>\n        <div id='canvas-collection'></div>\n    </div>\n    <div class=\"area\">\n        <label>AGS Json Symbol</label>\n        <textarea class='style'>\n        </textarea>\n        <button class=\"save\">Save</button>\n    </div>\n</div>\n";
    var css = "\n<style>\n    #map {\n        display: none;\n    }\n\n    .style-to-canvas {\n    }\n\n    .style-to-canvas .area label {\n        display: block;\n        vertical-align: top;\n    }\n\n    .style-to-canvas .area {\n        border: 1px solid black;\n        padding: 20px;\n        margin: 20px;\n    }\n\n    .style-to-canvas .area .style {\n        width: 100%;\n        height: 400px;\n    }\n\n    .style-to-canvas #canvas-collection canvas {\n        font-family: sans serif;\n        font-size: 20px;\n        border: 1px solid black;\n        padding: 20px;\n        margin: 20px;\n    }\n    \n</style>\n";
    var svg = "\n<div style='display:none'>\n<svg xmlns=\"http://www.w3.org/2000/svg\">\n<symbol viewBox=\"5 0 20 15\" id=\"lock\">\n    <title>lock</title>\n    <path d=\"M10.9,11.6c-0.3-0.6-0.3-2.3,0-2.8c0.4-0.6,3.4,1.4,3.4,1.4c0.9,0.4,0.9-6.1,0-5.7\n\tc0,0-3.1,2.1-3.4,1.4c-0.3-0.7-0.3-2.1,0-2.8C11.2,2.5,15,2.4,15,2.4C15,1.7,12.1,1,10.9,1S8.4,1.1,6.8,1.8C5.2,2.4,3.9,3.4,2.7,4.6\n\tS0,8.2,0,8.9s1.5,2.8,3.7,3.7s3.3,1.1,4.5,1.3c1.1,0.1,2.6,0,3.9-0.3c1-0.2,2.9-0.7,2.9-1.1C15,12.3,11.2,12.2,10.9,11.6z M4.5,9.3\n\tC3.7,9.3,3,8.6,3,7.8s0.7-1.5,1.5-1.5S6,7,6,7.8S5.3,9.3,4.5,9.3z\"\n    />\n</symbol>\n<symbol viewBox=\"0 0 37 37\" id=\"marker\">\n      <title>marker</title>\n      <path d=\"M19.75 2.75 L32.47792206135786 7.022077938642145 L36.75 19.75 L32.47792206135786 32.47792206135786 L19.75 36.75 L7.022077938642145 32.47792206135786 L2.75 19.750000000000004 L7.022077938642141 7.022077938642145 L19.749999999999996 2.75 Z\" /> </symbol>\n</svg>\n</div>\n";
    function loadStyle(name) {
        var d = $.Deferred();
        if ('[' === name[0]) {
            d.resolve(JSON.parse(name));
        }
        else {
            var mids = name.split(",").map(function (name) { return "../styles/" + name; });
            requirejs(mids, function () {
                var styles = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    styles[_i] = arguments[_i];
                }
                var style = [];
                styles.forEach(function (s) { return style = style.concat(s); });
                d.resolve(style);
            });
        }
        return d;
    }
    function loadGeom(name) {
        var mids = name.split(",").map(function (name) { return "../tests/geom/" + name; });
        var d = $.Deferred();
        requirejs(mids, function () {
            var geoms = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                geoms[_i] = arguments[_i];
            }
            d.resolve(geoms);
        });
        return d;
    }
    var styles = {
        point: pointStyle
    };
    var serializer = new ol3_symbolizer_1.StyleConverter();
    var Renderer = (function () {
        function Renderer(geom) {
            this.feature = new ol.Feature(geom);
            this.canvas = this.createCanvas();
        }
        Renderer.prototype.createCanvas = function (size) {
            if (size === void 0) { size = 256; }
            var canvas = document.createElement("canvas");
            canvas.width = canvas.height = size;
            return canvas;
        };
        Renderer.prototype.draw = function (styles) {
            var canvas = this.canvas;
            var feature = this.feature;
            var style = styles.map(function (style) { return serializer.fromJson(style); });
            feature.setStyle(style);
            canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
            Snapshot.render(canvas, feature);
        };
        return Renderer;
    }());
    function run() {
        $(html).appendTo("body");
        $(svg).appendTo("body");
        $(css).appendTo("head");
        $(".style").val(JSON.stringify({
            "type": "esriSFS",
            "style": "esriSFSForwardDiagonal",
            "color": [0, 255, 0, 255],
            "outline": {
                "type": "esriSLS",
                "style": "esriSLSSolid",
                "color": [0, 255, 0, 255],
                "width": 0.4
            }
        }, null, '\t'));
        var geom = index_1.getParameterByName("geom") || "polygon-with-holes";
        var style = index_1.getParameterByName("style");
        var save = function () {
            var style = JSON.stringify(JSON.parse($(".style").val() + ""));
            var loc = window.location;
            var url = "" + loc.origin + loc.pathname + "?run=ol3-symbolizer/labs/ags-style-converter&geom=" + geom + "&style=" + encodeURI(style);
            history.replaceState({}, "Changes", url);
            return url;
        };
        style && loadStyle(style).then(function (styles) {
            loadGeom(geom).then(function (geoms) {
                var style = JSON.stringify(styles, null, ' ');
                $(".style").val(style);
                var renderers = geoms.map(function (g) { return new Renderer(g); });
                renderers.forEach(function (r) { return $(r.canvas).appendTo("#canvas-collection"); });
                setInterval(function () {
                    try {
                        var style_1 = JSON.parse($(".style").val() + "");
                        renderers.forEach(function (r) { return r.draw(style_1); });
                        save();
                    }
                    catch (ex) {
                    }
                }, 2000);
            });
        });
    }
    exports.run = run;
});
define("ol3-symbolizer/common/ajax", ["require", "exports", "jquery"], function (require, exports, $) {
    "use strict";
    var Ajax = (function () {
        function Ajax(url) {
            this.url = url;
            this.options = {
                use_json: true,
                use_cors: true
            };
        }
        Ajax.prototype.jsonp = function (args, url) {
            if (url === void 0) { url = this.url; }
            var d = $.Deferred();
            args["callback"] = "define";
            var uri = url + "?" + Object.keys(args).map(function (k) { return k + "=" + args[k]; }).join('&');
            require([uri], function (data) { return d.resolve(data); });
            return d;
        };
        Ajax.prototype.ajax = function (method, args, url) {
            if (url === void 0) { url = this.url; }
            var isData = method === "POST" || method === "PUT";
            var isJson = this.options.use_json;
            var isCors = this.options.use_cors;
            var d = $.Deferred();
            var client = new XMLHttpRequest();
            if (isCors)
                client.withCredentials = true;
            var uri = url;
            var data = null;
            if (args) {
                if (isData) {
                    data = JSON.stringify(args);
                }
                else {
                    uri += '?';
                    var argcount = 0;
                    for (var key in args) {
                        if (args.hasOwnProperty(key)) {
                            if (argcount++) {
                                uri += '&';
                            }
                            uri += encodeURIComponent(key) + '=' + encodeURIComponent(args[key]);
                        }
                    }
                }
            }
            client.open(method, uri, true);
            if (isData && isJson)
                client.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            client.send(data);
            client.onload = function () {
                console.log("content-type", client.getResponseHeader("Content-Type"));
                if (client.status >= 200 && client.status < 300) {
                    isJson = isJson || 0 === client.getResponseHeader("Content-Type").indexOf("application/json");
                    d.resolve(isJson ? JSON.parse(client.response) : client.response);
                }
                else {
                    d.reject(client.statusText);
                }
            };
            client.onerror = function () { return d.reject(client.statusText); };
            return d;
        };
        Ajax.prototype.get = function (args) {
            return this.ajax('GET', args);
        };
        Ajax.prototype.post = function (args) {
            return this.ajax('POST', args);
        };
        Ajax.prototype.put = function (args) {
            return this.ajax('PUT', args);
        };
        Ajax.prototype.delete = function (args) {
            return this.ajax('DELETE', args);
        };
        return Ajax;
    }());
    return Ajax;
});
define("ol3-symbolizer/common/defaults", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function defaults(a) {
        var b = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            b[_i - 1] = arguments[_i];
        }
        b.filter(function (b) { return !!b; }).forEach(function (b) {
            Object.keys(b).filter(function (k) { return a[k] === undefined; }).forEach(function (k) { return a[k] = b[k]; });
        });
        return a;
    }
    exports.defaults = defaults;
});
define("ol3-symbolizer/ags/ags-catalog", ["require", "exports", "ol3-symbolizer/common/ajax", "ol3-symbolizer/common/defaults"], function (require, exports, Ajax, defaults_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Catalog = (function () {
        function Catalog(url) {
            this.ajax = new Ajax(url);
        }
        Catalog.prototype.about = function (data) {
            var req = defaults_1.defaults({
                f: "pjson"
            }, data);
            return this.ajax.jsonp(req);
        };
        Catalog.prototype.aboutFolder = function (folder) {
            var ajax = new Ajax(this.ajax.url + "/" + folder);
            var req = {
                f: "pjson"
            };
            return ajax.jsonp(req);
        };
        Catalog.prototype.aboutFeatureServer = function (name) {
            var ajax = new Ajax(this.ajax.url + "/" + name + "/FeatureServer");
            var req = {
                f: "pjson"
            };
            return defaults_1.defaults(ajax.jsonp(req), { url: ajax.url });
        };
        Catalog.prototype.aboutMapServer = function (name) {
            var ajax = new Ajax(this.ajax.url + "/" + name + "/MapServer");
            var req = {
                f: "pjson"
            };
            return defaults_1.defaults(ajax.jsonp(req), { url: ajax.url });
        };
        Catalog.prototype.aboutLayer = function (layer) {
            var ajax = new Ajax(this.ajax.url + "/" + layer);
            var req = {
                f: "pjson"
            };
            return ajax.jsonp(req);
        };
        return Catalog;
    }());
    exports.Catalog = Catalog;
});
define("ol3-symbolizer/format/ags-symbolizer", ["require", "exports", "ol3-symbolizer/format/ol3-symbolizer"], function (require, exports, Symbolizer) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var symbolizer = new Symbolizer.StyleConverter();
    var styleMap = {
        "esriSMSCircle": "circle",
        "esriSMSDiamond": "diamond",
        "esriSMSX": "x",
        "esriSMSCross": "cross",
        "esriSLSSolid": "solid",
        "esriSFSSolid": "solid",
        "esriSLSDot": "dot",
        "esriSLSDash": "dash",
        "esriSLSDashDot": "dashdot",
        "esriSLSDashDotDot": "dashdotdot",
        "esriSFSBackwardDiagonal": "backward-diagonal",
        "esriSFSForwardDiagonal": "forward-diagonal",
    };
    var typeMap = {
        "esriSMS": "sms",
        "esriSLS": "sls",
        "esriSFS": "sfs",
        "esriPMS": "pms",
        "esriPFS": "pfs",
        "esriTS": "txt",
    };
    function range(a, b) {
        var result = new Array(b - a + 1);
        while (a <= b)
            result.push(a++);
        return result;
    }
    function clone(o) {
        return JSON.parse(JSON.stringify(o));
    }
    var StyleConverter = (function () {
        function StyleConverter() {
        }
        StyleConverter.prototype.asWidth = function (v) {
            return v * 4 / 3;
        };
        StyleConverter.prototype.asColor = function (color) {
            if (color.length === 4)
                return "rgba(" + color[0] + "," + color[1] + "," + color[2] + "," + color[3] / 255 + ")";
            if (color.length === 3)
                return "rgb(" + color[0] + "," + color[1] + "," + color[2] + "})";
            return "#" + color.map(function (v) { return ("0" + v.toString(16)).substr(0, 2); }).join("");
        };
        StyleConverter.prototype.fromSFSSolid = function (symbol, style) {
            style.fill = {
                color: this.asColor(symbol.color)
            };
            this.fromSLS(symbol.outline, style);
        };
        StyleConverter.prototype.fromSFSForwardDiagonal = function (symbol, style) {
            style.fill = {
                pattern: {
                    color: this.asColor(symbol.color),
                    orientation: "forward",
                    spacing: 3,
                    repitition: "repeat",
                }
            };
            this.fromSLS(symbol.outline, style);
        };
        StyleConverter.prototype.fromSFSBackwardDiagonal = function (symbol, style) {
            style.fill = {
                pattern: {
                    color: this.asColor(symbol.color),
                    orientation: "backward",
                    spacing: 3,
                    repitition: "repeat",
                }
            };
            this.fromSLS(symbol.outline, style);
        };
        StyleConverter.prototype.fromSFS = function (symbol, style) {
            switch (symbol.style) {
                case "esriSFSSolid":
                    this.fromSFSSolid(symbol, style);
                    break;
                case "esriSFSForwardDiagonal":
                    this.fromSFSForwardDiagonal(symbol, style);
                    break;
                case "esriSFSBackwardDiagonal":
                    this.fromSFSBackwardDiagonal(symbol, style);
                    break;
                default:
                    throw "invalid-style: " + symbol.style;
            }
        };
        StyleConverter.prototype.fromSMSCircle = function (symbol, style) {
            style.circle = {
                opacity: 1,
                radius: this.asWidth(symbol.size / 2),
                stroke: {
                    color: this.asColor(symbol.outline.color),
                },
                snapToPixel: true
            };
            this.fromSFSSolid(symbol, style.circle);
            this.fromSLS(symbol.outline, style.circle);
        };
        StyleConverter.prototype.fromSMSCross = function (symbol, style) {
            style.star = {
                points: 4,
                angle: 0,
                radius: this.asWidth(symbol.size / Math.sqrt(2)),
                radius2: 0
            };
            this.fromSFSSolid(symbol, style.star);
            this.fromSLS(symbol.outline, style.star);
        };
        StyleConverter.prototype.fromSMSDiamond = function (symbol, style) {
            style.star = {
                points: 4,
                angle: 0,
                radius: this.asWidth(symbol.size / Math.sqrt(2)),
                radius2: this.asWidth(symbol.size / Math.sqrt(2))
            };
            this.fromSFSSolid(symbol, style.star);
            this.fromSLS(symbol.outline, style.star);
        };
        StyleConverter.prototype.fromSMSPath = function (symbol, style) {
            var size = 2 * this.asWidth(symbol.size);
            style.svg = {
                imgSize: [size, size],
                path: symbol.path,
                rotation: symbol.angle
            };
            this.fromSLSSolid(symbol, style.svg);
            this.fromSLS(symbol.outline, style.svg);
        };
        StyleConverter.prototype.fromSMSSquare = function (symbol, style) {
            style.star = {
                points: 4,
                angle: Math.PI / 4,
                radius: this.asWidth(symbol.size / Math.sqrt(2)),
                radius2: this.asWidth(symbol.size / Math.sqrt(2))
            };
            this.fromSFSSolid(symbol, style.star);
            this.fromSLS(symbol.outline, style.star);
        };
        StyleConverter.prototype.fromSMSX = function (symbol, style) {
            style.star = {
                points: 4,
                angle: Math.PI / 4,
                radius: this.asWidth(symbol.size / Math.sqrt(2)),
                radius2: 0
            };
            this.fromSFSSolid(symbol, style.star);
            this.fromSLS(symbol.outline, style.star);
        };
        StyleConverter.prototype.fromSMS = function (symbol, style) {
            switch (symbol.style) {
                case "esriSMSCircle":
                    this.fromSMSCircle(symbol, style);
                    break;
                case "esriSMSCross":
                    this.fromSMSCross(symbol, style);
                    break;
                case "esriSMSDiamond":
                    this.fromSMSDiamond(symbol, style);
                    break;
                case "esriSMSPath":
                    this.fromSMSPath(symbol, style);
                    break;
                case "esriSMSSquare":
                    this.fromSMSSquare(symbol, style);
                    break;
                case "esriSMSX":
                    this.fromSMSX(symbol, style);
                    break;
                default:
                    throw "invalid-style: " + symbol.style;
            }
        };
        StyleConverter.prototype.fromPMS = function (symbol, style) {
            style.image = {};
            style.image.src = symbol.url;
            if (symbol.imageData) {
                style.image.src = "data:image/png;base64," + symbol.imageData;
            }
            style.image["anchor-x"] = this.asWidth(symbol.xoffset);
            style.image["anchor-y"] = this.asWidth(symbol.yoffset);
            style.image.imgSize = [this.asWidth(symbol.width), this.asWidth(symbol.height)];
        };
        StyleConverter.prototype.fromSLSSolid = function (symbol, style) {
            style.stroke = {
                color: this.asColor(symbol.color),
                width: this.asWidth(symbol.width),
                lineDash: [],
                lineJoin: "",
                miterLimit: 4
            };
        };
        StyleConverter.prototype.fromSLS = function (symbol, style) {
            switch (symbol.style) {
                case "esriSLSSolid":
                    this.fromSLSSolid(symbol, style);
                    break;
                case "esriSLSDot":
                    this.fromSLSSolid(symbol, style);
                    break;
                case "esriSLSDash":
                    this.fromSLSSolid(symbol, style);
                    break;
                case "esriSLSDashDot":
                    this.fromSLSSolid(symbol, style);
                    break;
                case "esriSLSDashDotDot":
                    this.fromSLSSolid(symbol, style);
                    break;
                default:
                    this.fromSLSSolid(symbol, style);
                    console.warn("invalid-style: " + symbol.style);
                    break;
            }
        };
        StyleConverter.prototype.fromPFS = function (symbol, style) {
            style.fill = {
                image: {
                    src: symbol.url,
                    imageData: symbol.imageData && "data:image/png;base64," + symbol.imageData,
                    "anchor-x": this.asWidth(symbol.xoffset),
                    "anchor-y": this.asWidth(symbol.yoffset),
                    imgSize: [this.asWidth(symbol.width), this.asWidth(symbol.height)]
                }
            };
            this.fromSLS(symbol.outline, style);
        };
        StyleConverter.prototype.fromTS = function (symbol, style) {
            throw "not-implemented";
        };
        StyleConverter.prototype.fromJson = function (symbol) {
            var style = {};
            this.fromSymbol(symbol, style);
            return symbolizer.fromJson(style);
        };
        StyleConverter.prototype.fromSymbol = function (symbol, style) {
            switch (symbol.type) {
                case "esriSFS":
                    this.fromSFS(symbol, style);
                    break;
                case "esriSLS":
                    this.fromSLS(symbol, style);
                    break;
                case "esriPMS":
                    this.fromPMS(symbol, style);
                    break;
                case "esriPFS":
                    this.fromPFS(symbol, style);
                    break;
                case "esriSMS":
                    this.fromSMS(symbol, style);
                    break;
                case "esriTS":
                    this.fromTS(symbol, style);
                    break;
                default:
                    throw "invalid-symbol-type: " + symbol.type;
            }
        };
        StyleConverter.prototype.fromRenderer = function (renderer, args) {
            var _this = this;
            switch (renderer.type) {
                case "simple":
                    {
                        return this.fromJson(renderer.symbol);
                    }
                case "uniqueValue":
                    {
                        var styles_1 = {};
                        var defaultStyle_1 = (renderer.defaultSymbol) && this.fromJson(renderer.defaultSymbol);
                        if (renderer.uniqueValueInfos) {
                            renderer.uniqueValueInfos.forEach(function (info) {
                                styles_1[info.value] = _this.fromJson(info.symbol);
                            });
                        }
                        return function (feature) { return styles_1[feature.get(renderer.field1)] || defaultStyle_1; };
                    }
                case "classBreaks": {
                    var styles_2 = {};
                    var classBreakRenderer_1 = renderer;
                    if (classBreakRenderer_1.classBreakInfos) {
                        console.log("processing classBreakInfos");
                        if (classBreakRenderer_1.visualVariables) {
                            classBreakRenderer_1.visualVariables.forEach(function (vars) {
                                switch (vars.type) {
                                    case "sizeInfo": {
                                        var steps_1 = range(classBreakRenderer_1.authoringInfo.visualVariables[0].minSliderValue, classBreakRenderer_1.authoringInfo.visualVariables[0].maxSliderValue);
                                        var dx_1 = (vars.maxSize - vars.minSize) / steps_1.length;
                                        var dataValue_1 = (vars.maxDataValue - vars.minDataValue) / steps_1.length;
                                        classBreakRenderer_1.classBreakInfos.forEach(function (classBreakInfo) {
                                            var icons = steps_1.map(function (step) {
                                                var json = JSON.parse(JSON.stringify(classBreakInfo.symbol));
                                                json.size = vars.minSize + dx_1 * (dataValue_1 - vars.minDataValue);
                                                var style = _this.fromJson(json);
                                                styles_2[dataValue_1] = style;
                                            });
                                        });
                                        debugger;
                                        break;
                                    }
                                    default:
                                        debugger;
                                        break;
                                }
                            });
                        }
                    }
                    return function (feature) {
                        debugger;
                        var value = feature.get(renderer.field1);
                        for (var key in styles_2) {
                            return styles_2[key];
                        }
                    };
                }
                default:
                    {
                        debugger;
                        console.error("unsupported renderer type: ", renderer.type);
                        break;
                    }
            }
        };
        return StyleConverter;
    }());
    exports.StyleConverter = StyleConverter;
});
define("ol3-symbolizer/ags/ags-source", ["require", "exports", "jquery", "openlayers", "ol3-symbolizer/ags/ags-catalog", "ol3-symbolizer/format/ags-symbolizer", "node_modules/ol3-fun/index"], function (require, exports, $, ol, AgsCatalog, Symbolizer, index_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var esrijsonFormat = new ol.format.EsriJSON();
    function asParam(options) {
        return Object
            .keys(options)
            .map(function (k) { return k + "=" + options[k]; })
            .join("&");
    }
    ;
    var DEFAULT_OPTIONS = {
        tileSize: 512,
        where: "1=1",
    };
    var ArcGisVectorSourceFactory = (function () {
        function ArcGisVectorSourceFactory() {
        }
        ArcGisVectorSourceFactory.create = function (options) {
            var d = $.Deferred();
            options = index_2.defaults(options, DEFAULT_OPTIONS);
            var srs = options.map.getView()
                .getProjection()
                .getCode()
                .split(":")
                .pop();
            var all = options.layers.map(function (layerId) {
                var d = $.Deferred();
                var tileGrid = ol.tilegrid.createXYZ({
                    tileSize: options.tileSize
                });
                var strategy = ol.loadingstrategy.tile(tileGrid);
                var loader = function (extent, resolution, projection) {
                    var box = {
                        xmin: extent[0],
                        ymin: extent[1],
                        xmax: extent[2],
                        ymax: extent[3]
                    };
                    var params = {
                        f: "json",
                        returnGeometry: true,
                        spatialRel: "esriSpatialRelIntersects",
                        geometry: encodeURIComponent(JSON.stringify(box)),
                        geometryType: "esriGeometryEnvelope",
                        resultType: "tile",
                        where: encodeURIComponent(options.where),
                        inSR: srs,
                        outSR: srs,
                        outFields: "*",
                    };
                    var query = options.services + "/" + options.serviceName + "/" + options.serviceType + "/" + layerId + "/query?" + asParam(params);
                    $.ajax({
                        url: query,
                        dataType: 'jsonp',
                        success: function (response) {
                            if (response.error) {
                                console.warn(response.error.message + '\n' +
                                    response.error.details.join('\n'));
                            }
                            else {
                                var features = esrijsonFormat.readFeatures(response, {
                                    featureProjection: projection,
                                    dataProjection: projection
                                });
                                if (!options.uidFieldName && response.fields) {
                                    var oidField = response.fields.filter(function (f) { return f.type === "esriFieldTypeOID"; })[0];
                                    if (oidField) {
                                        options.uidFieldName = oidField.name;
                                    }
                                }
                                if (options.uidFieldName) {
                                    features = features.filter(function (f) { return !source.getFeatures().some(function (f) { return f.get(options.uidFieldName); }); });
                                }
                                if (features.length > 0) {
                                    source.addFeatures(features);
                                }
                            }
                        }
                    });
                };
                var source = new ol.source.Vector({
                    strategy: strategy,
                    loader: loader,
                    wrapX: false
                });
                var catalog = new AgsCatalog.Catalog(options.services + "/" + options.serviceName + "/" + options.serviceType);
                var converter = new Symbolizer.StyleConverter();
                catalog.aboutLayer(layerId).then(function (layerInfo) {
                    var layer = new ol.layer.Vector({
                        title: layerInfo.name,
                        source: source
                    });
                    var styleMap = converter.fromRenderer(layerInfo.drawingInfo.renderer, { url: "for icons?" });
                    layer.setStyle(function (feature, resolution) {
                        if (styleMap instanceof ol.style.Style) {
                            return styleMap;
                        }
                        else {
                            return styleMap(feature);
                        }
                    });
                    d.resolve(layer);
                });
                return d;
            });
            $.when.apply($, all).then(function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return d.resolve(args);
            });
            return d;
        };
        return ArcGisVectorSourceFactory;
    }());
    exports.ArcGisVectorSourceFactory = ArcGisVectorSourceFactory;
});
define("examples/ags-viewer", ["require", "exports", "openlayers", "node_modules/ol3-fun/index", "ol3-symbolizer/ags/ags-source"], function (require, exports, ol, index_3, ags_source_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function parse(v, type) {
        if (typeof type === "string")
            return v;
        if (typeof type === "number")
            return parseFloat(v);
        if (typeof type === "boolean")
            return (v === "1" || v === "true");
        if (Array.isArray(type)) {
            return (v.split(",").map(function (v) { return parse(v, type[0]); }));
        }
        throw "unknown type: " + type;
    }
    var html = "\n<div class='popup'>\n    <div class='popup-container'>\n    </div>\n</div>\n";
    var css = "\n<style name=\"popup\" type=\"text/css\">\n    html, body, .map {\n        width: 100%;\n        height: 100%;\n        padding: 0;\n        overflow: hidden;\n        margin: 0;    \n    }\n</style>\n";
    var css_popup = "\n.popup-container {\n    position: absolute;\n    top: 1em;\n    right: 0.5em;\n    width: 10em;\n    bottom: 1em;\n    z-index: 1;\n    pointer-events: none;\n}\n\n.ol-popup {\n    color: white;\n    background-color: rgba(77,77,77,0.7);\n    min-width: 200px;\n}\n\n.ol-popup:after {\n    border-top-color: rgba(77,77,77,0.7);\n}\n\n";
    var center = {
        fire: [-117.754430386, 34.2606862490001],
        wichita: [-97.4, 37.8],
        vegas: [-115.235, 36.173]
    };
    function run() {
        var target = document.getElementsByClassName("map")[0];
        target.appendChild(index_3.html(html));
        document.head.appendChild(index_3.html(css));
        var options = {
            srs: 'EPSG:4326',
            center: center.vegas,
            zoom: 10,
            services: "//sampleserver3.arcgisonline.com/ArcGIS/rest/services",
            serviceName: "SanFrancisco/311Incidents",
            serviceType: "FeatureServer",
            where: "1=1",
            filter: {},
            layers: [0]
        };
        {
            var opts_1 = options;
            Object.keys(opts_1).forEach(function (k) {
                index_3.doif(index_3.getParameterByName(k), function (v) {
                    var value = parse(v, opts_1[k]);
                    if (value !== undefined)
                        opts_1[k] = value;
                });
            });
        }
        var map = new ol.Map({
            target: "map",
            keyboardEventTarget: document,
            loadTilesWhileAnimating: true,
            loadTilesWhileInteracting: true,
            controls: ol.control.defaults({ attribution: false }),
            view: new ol.View({
                projection: options.srs,
                center: options.center,
                zoom: options.zoom
            }),
            layers: [
                new ol.layer.Tile({
                    title: "OSM",
                    type: 'base',
                    opacity: 0.8,
                    visible: true,
                    source: new ol.source.OSM()
                })
            ]
        });
        ags_source_1.ArcGisVectorSourceFactory.create({
            tileSize: 256,
            map: map,
            services: options.services,
            serviceName: options.serviceName,
            serviceType: options.serviceType,
            where: options.where,
            layers: options.layers.reverse()
        }).then(function (agsLayers) {
            agsLayers.forEach(function (agsLayer) { return map.addLayer(agsLayer); });
        });
        return map;
    }
    exports.run = run;
});
define("examples/styles/fill/gradient", ["require", "exports"], function (require, exports) {
    "use strict";
    return [
        {
            "fill": {
                "gradient": {
                    "type": "linear(200,0,201,0)",
                    "stops": "rgba(255,0,0,.1) 0%;rgba(255,0,0,0.8) 100%"
                }
            }
        },
        {
            "fill": {
                "gradient": {
                    "type": "linear(0,200,0,201)",
                    "stops": "rgba(0,255,0,0.1) 0%;rgba(0,255,0,0.8) 100%"
                }
            }
        }
    ];
});
define("examples/tests/geom/polygon-with-holes", ["require", "exports", "openlayers"], function (require, exports, ol) {
    "use strict";
    return new ol.geom.Polygon([
        [
            [-115.23607381724413, 36.18020468011697],
            [-115.23585925895877, 36.179702181216726],
            [-115.23575411703308, 36.17970096569444],
            [-115.2357555390405, 36.179660925345416],
            [-115.23498759816178, 36.17965671947266],
            [-115.23498227780165, 36.17965563145225],
            [-115.23497562817354, 36.17965345801133],
            [-115.23497429411718, 36.179653454129465],
            [-115.2349729648491, 36.179652368709114],
            [-115.23497164190998, 36.17965236485955],
            [-115.23497031260206, 36.17965128845199],
            [-115.23496366297462, 36.17964911501038],
            [-115.23495435806059, 36.17964152607966],
            [-115.23495037983507, 36.17963610674103],
            [-115.23494905056762, 36.17963502132042],
            [-115.23494905535622, 36.17963393978194],
            [-115.23494772608885, 36.17963285436133],
            [-115.23494773087741, 36.17963177282287],
            [-115.23494374153573, 36.17962635345167],
            [-115.23494242663457, 36.17962202341565],
            [-115.23494244274961, 36.179613362030594],
            [-115.23494115849935, 36.17958955512785],
            [-115.23494259074424, 36.179539762821165],
            [-115.23495080755244, 36.17943153234975],
            [-115.23498190979615, 36.179198854743774],
            [-115.23498597483993, 36.179162057736576],
            [-115.23498741333559, 36.17911335600928],
            [-115.23498760303814, 36.1790202799572],
            [-115.23498894037036, 36.17901703017802],
            [-115.23499294903999, 36.17901054351405],
            [-115.23500627711793, 36.179000821282315],
            [-115.23501027775183, 36.17899866080441],
            [-115.23501827423149, 36.1789954213867],
            [-115.23502227007734, 36.178994342446956],
            [-115.23503690505271, 36.178993267421134],
            [-115.23613088558278, 36.17900978428773],
            [-115.23641035743786, 36.17901554257806],
            [-115.23642233215821, 36.17901772235737],
            [-115.23642366143577, 36.17901880776175],
            [-115.2364249954815, 36.17901881162746],
            [-115.23643430369208, 36.17902314678388],
            [-115.23644359756013, 36.1790307355685],
            [-115.23644493318729, 36.17903290254361],
            [-115.23644625134835, 36.179033987915574],
            [-115.23644891148601, 36.179038321833545],
            [-115.23644890671817, 36.179039403372215],
            [-115.23645023599641, 36.179040488776366],
            [-115.23645287229544, 36.179050230387844],
            [-115.23644236273168, 36.179626054530914],
            [-115.23668058083813, 36.17963175574282],
            [-115.2366834748921, 36.179522437195914],
            [-115.23661559800996, 36.17952127625068],
            [-115.23661568079545, 36.17948230455008],
            [-115.23656510706341, 36.179480085095875],
            [-115.23656514052031, 36.179464925432384],
            [-115.23654650808301, 36.17946490751295],
            [-115.2365540175394, 36.17905252428298],
            [-115.23655670160856, 36.17904386161155],
            [-115.23656071015083, 36.179037374894435],
            [-115.23656470915981, 36.17903305125468],
            [-115.23657136994915, 36.17902764475913],
            [-115.2365767093539, 36.179024406553935],
            [-115.2365846946555, 36.17902116699908],
            [-115.23659535439921, 36.17901901674222],
            [-115.23713833886198, 36.1790294298395],
            [-115.23715563711139, 36.17902945282161],
            [-115.23716229150622, 36.17903054460291],
            [-115.23716894114325, 36.17903271792267],
            [-115.23717558602276, 36.179035972780895],
            [-115.23718622040953, 36.17904463792368],
            [-115.23719019876008, 36.179050057189215],
            [-115.23719285418174, 36.179055472629685],
            [-115.23719416919774, 36.179059802642044],
            [-115.23719116643991, 36.17922432514126],
            [-115.23719241007713, 36.179267626889896],
            [-115.23721203241809, 36.179434332838255],
            [-115.23721989085172, 36.17949279544402],
            [-115.23722777151995, 36.17954367823275],
            [-115.23722497973465, 36.179609698939885],
            [-115.23722409330264, 36.180036161511154],
            [-115.23722639987513, 36.180209351752936],
            [-115.23722102868629, 36.18022991275794],
            [-115.23721300999347, 36.18024830300364],
            [-115.2372009938535, 36.18026560013875],
            [-115.23718632380785, 36.18027965395507],
            [-115.23717165215595, 36.180291544660236],
            [-115.23715700433107, 36.180298018657865],
            [-115.23713968041169, 36.18030882013731],
            [-115.23710901412761, 36.18033259770809],
            [-115.23709567812136, 36.180346655371196],
            [-115.23708635703858, 36.18034772799106],
            [-115.23707305914606, 36.18034554445107],
            [-115.23705842558819, 36.180341193941615],
            [-115.23702517527396, 36.18032816419867],
            [-115.23699059405523, 36.18031946581843],
            [-115.23695998492562, 36.180315096116985],
            [-115.23687881268215, 36.18030849810276],
            [-115.23662063061164, 36.18030168495093],
            [-115.23638240890344, 36.18029382050014],
            [-115.23637957338431, 36.18037715490031],
            [-115.23691856336063, 36.180392974213746],
            [-115.23696247517685, 36.18039844594108],
            [-115.23699839685315, 36.180408229759635],
            [-115.23701967540914, 36.18041583514312],
            [-115.23703030836687, 36.18042233718951],
            [-115.23703428837263, 36.18042991956851],
            [-115.23703293205983, 36.18043749552426],
            [-115.23702757508498, 36.18045481190387],
            [-115.23702218797958, 36.180484025271284],
            [-115.23701522157822, 36.180634620287506],
            [-115.23701388430145, 36.18063787008873],
            [-115.23701388589801, 36.1806400331979],
            [-115.23701254226417, 36.18064220142843],
            [-115.23701121134403, 36.18064653280025],
            [-115.23700987247047, 36.180647619492305],
            [-115.23700986771001, 36.18064870103079],
            [-115.23700853999335, 36.18064977874215],
            [-115.23700853523289, 36.180650860280636],
            [-115.23700720747651, 36.18065194700479],
            [-115.23700586384234, 36.18065411523524],
            [-115.23700319725172, 36.18065627963851],
            [-115.23699919818345, 36.180660603291415],
            [-115.23698854137972, 36.18066708881365],
            [-115.23698720726621, 36.18066709396689],
            [-115.23698587954891, 36.18066817167798],
            [-115.23698454547511, 36.18066816781841],
            [-115.23698320660087, 36.18066925451012],
            [-115.23698188364428, 36.18066925068268],
            [-115.23697522590852, 36.18067141255135],
            [-115.2369725577608, 36.18067140483197],
            [-115.23696856185578, 36.180672483836176],
            [-115.23696191368127, 36.18067247361428],
            [-115.2369605748066, 36.18067356030576],
            [-115.23613944034335, 36.18064871246639],
            [-115.23613411993963, 36.180647615484105],
            [-115.23612747019557, 36.180645442106865],
            [-115.23612614089488, 36.18064435669936],
            [-115.23612347752092, 36.180643267422624],
            [-115.23611816027882, 36.180638934805],
            [-115.23611418196273, 36.18063350649241],
            [-115.23611418673549, 36.180632424954],
            [-115.23611286220795, 36.180630258007966],
            [-115.23611153614853, 36.18062591893997],
            [-115.23612705321317, 36.18020582594842],
            [-115.23607381724413, 36.18020468011697]
        ],
        [
            [-115.23618294625469, 36.17956944939985],
            [-115.23618152437697, 36.1796170696354],
            [-115.2361813999148, 36.17967551816986],
            [-115.23634908732791, 36.17967680645728],
            [-115.23634919412686, 36.179624856198686],
            [-115.2363824679463, 36.17962489855586],
            [-115.2363825795315, 36.1795718577452],
            [-115.23638534968705, 36.179520987743686],
            [-115.23635074658684, 36.17951986899516],
            [-115.2363521827075, 36.17946899512751],
            [-115.2363522910816, 36.179419207976636],
            [-115.236386892558, 36.179418163614926],
            [-115.2363870009098, 36.17936837646343],
            [-115.23638710449244, 36.17931967085019],
            [-115.2363551585448, 36.179318541777775],
            [-115.23635527168521, 36.17926767308688],
            [-115.23638854535363, 36.1792677154416],
            [-115.23638995914024, 36.17922442138702],
            [-115.23641258255111, 36.1792244508959],
            [-115.23641552635529, 36.17909132031167],
            [-115.23634764988991, 36.17909015020365],
            [-115.23634769453865, 36.179067419704054],
            [-115.23627716107944, 36.179066250868104],
            [-115.2362146097472, 36.17906508710888],
            [-115.2362145698311, 36.17908673606951],
            [-115.23614802742047, 36.17908556971632],
            [-115.23608680530958, 36.179085500310464],
            [-115.23608551598718, 36.17906276594198],
            [-115.23601765066995, 36.17906159567923],
            [-115.23595376526016, 36.179060436926335],
            [-115.23595372049765, 36.179083167425176],
            [-115.23588717809511, 36.179082000927025],
            [-115.23582195384806, 36.17908191977068],
            [-115.23582201454218, 36.17905810776571],
            [-115.23575946318529, 36.17905695278159],
            [-115.23569424377776, 36.17905578100435],
            [-115.23569419894028, 36.179078511502695],
            [-115.23563031352298, 36.179077352577124],
            [-115.23562736517071, 36.17921372778321],
            [-115.23575645912092, 36.179216058458195],
            [-115.23588422384631, 36.17921729457083],
            [-115.2360159859503, 36.17921962369661],
            [-115.23614508469727, 36.17922087241399],
            [-115.2362741723721, 36.17922211194713],
            [-115.23627408780143, 36.179266491406025],
            [-115.23618757879821, 36.17926530324189],
            [-115.23618737296034, 36.1793648775767],
            [-115.23618449573719, 36.17946770684685],
            [-115.23618294625469, 36.17956944939985]
        ],
        [
            [-115.23686858906352, 36.17946421772446],
            [-115.23708818379693, 36.179467737173354],
            [-115.23708696717102, 36.17941578308344],
            [-115.23712289793187, 36.17941582390601],
            [-115.23712300421819, 36.17936387364166],
            [-115.23712310578506, 36.17931299590278],
            [-115.23708984321254, 36.17931295378433],
            [-115.23708994476085, 36.179262085057985],
            [-115.23709005110757, 36.17921012577965],
            [-115.23712465880284, 36.17921017178786],
            [-115.23712609917445, 36.17915821636679],
            [-115.23712620069831, 36.179107347638976],
            [-115.23709293185466, 36.17910622395091],
            [-115.23709302864063, 36.179056436761556],
            [-115.23687476910101, 36.179052921188244],
            [-115.23665251856224, 36.17904939365998],
            [-115.2366510762937, 36.17909918596493],
            [-115.236621804877, 36.179099146261294],
            [-115.2366203594083, 36.17915218321373],
            [-115.23661891870293, 36.179204138626986],
            [-115.23664953536439, 36.17920417321409],
            [-115.23664809467705, 36.17925612862733],
            [-115.23664798649122, 36.1793059157809],
            [-115.23661738090723, 36.17930588122539],
            [-115.23661727270161, 36.179355668378406],
            [-115.23661583834084, 36.17940870536066],
            [-115.23664644873001, 36.17940765837814],
            [-115.23664500327055, 36.17946069532819],
            [-115.23686858906352, 36.17946421772446]
        ],
        [
            [-115.23531117600369, 36.179579184921224],
            [-115.23537638954298, 36.179579266325774],
            [-115.23537633500685, 36.17960416891128],
            [-115.23543755751767, 36.17960423868263],
            [-115.23550144331914, 36.17960540672608],
            [-115.23550149626053, 36.17957834103089],
            [-115.23556538204222, 36.17957950904011],
            [-115.23562793859004, 36.1795795825893],
            [-115.23562787939407, 36.179605557701095],
            [-115.23569043592308, 36.17960564023055],
            [-115.23575431065326, 36.17960679909393],
            [-115.23575437458497, 36.17957974244331],
            [-115.23582357921542, 36.179579826178696],
            [-115.23582252817624, 36.17944777458885],
            [-115.23569209497232, 36.17944653066063],
            [-115.23556565919206, 36.17944637074196],
            [-115.23543922341348, 36.179446210689804],
            [-115.23531278759663, 36.17944605951695],
            [-115.23525822443638, 36.179445991018255],
            [-115.23525825181221, 36.179429749785584],
            [-115.23525979770169, 36.17932908878721],
            [-115.23526002234115, 36.17922301618337],
            [-115.23526157145767, 36.17911911053341],
            [-115.23526310621648, 36.17901844949739],
            [-115.23509542023675, 36.1790171596965],
            [-115.23509531107005, 36.17906694684531],
            [-115.23506869664503, 36.17906691449056],
            [-115.23506858900447, 36.179118864748276],
            [-115.23506846696303, 36.179174068634],
            [-115.23509375849314, 36.17917409714073],
            [-115.23509365407101, 36.17922281176253],
            [-115.23509354644585, 36.17927476201899],
            [-115.23506693195053, 36.17927472966353],
            [-115.23506548542977, 36.17932776658991],
            [-115.23506537295849, 36.179380807396655],
            [-115.23509332158127, 36.179380834620375],
            [-115.23509321715753, 36.17942954924048],
            [-115.23509311910382, 36.179479336418154],
            [-115.23506782268866, 36.179480389449196],
            [-115.23506772461859, 36.17953017662637],
            [-115.23506627330525, 36.17958429508896],
            [-115.23509289902239, 36.17958432747747],
            [-115.23509145729834, 36.179636282863015],
            [-115.2352591493816, 36.17963649113807],
            [-115.2352592215437, 36.17960509928969],
            [-115.23531112144691, 36.17960408750662],
            [-115.23531117600369, 36.179579184921224]
        ],
        [
            [-115.23715466140786, 36.18014323272865],
            [-115.23715476767816, 36.1800912824705],
            [-115.23712815766072, 36.18009016903315],
            [-115.23712826398778, 36.18003820976182],
            [-115.23712703145384, 36.17998733718353],
            [-115.23715498501544, 36.179986291401335],
            [-115.23715376202102, 36.179933246732716],
            [-115.23715254534713, 36.17988129264721],
            [-115.2371259290423, 36.17987909763896],
            [-115.23712603221048, 36.179830383013936],
            [-115.2371248187149, 36.17977518427921],
            [-115.23715276744281, 36.17977522003574],
            [-115.23715287850983, 36.17972217922288],
            [-115.23715298477842, 36.17967022896107],
            [-115.2371250360878, 36.179670193204785],
            [-115.23712379880102, 36.1796204021621],
            [-115.23695212519661, 36.17961802187439],
            [-115.23695190123763, 36.17972193137736],
            [-115.23695300817042, 36.17982908938646],
            [-115.23695546344958, 36.179933006637626],
            [-115.2369552394907, 36.18003691613518],
            [-115.23695635595108, 36.18014191106148],
            [-115.2369574708579, 36.180244733863816],
            [-115.23712782763906, 36.18024602878663],
            [-115.2371266062204, 36.18019515624228],
            [-115.23715322103163, 36.18019518814154],
            [-115.23715466140786, 36.18014323272865]
        ],
        [
            [-115.23677512801696, 36.18024883880216],
            [-115.23684033735668, 36.18025000095081],
            [-115.23684172069555, 36.18022619277727],
            [-115.2368909608097, 36.18022841726922],
            [-115.23690560226717, 36.180228441612684],
            [-115.23691120233957, 36.18009530971011],
            [-115.23677945302525, 36.18008973694613],
            [-115.2366516853144, 36.18008632965913],
            [-115.23651993761892, 36.18008291971901],
            [-115.23639084059808, 36.180078435763335],
            [-115.23638656898369, 36.18021264402907],
            [-115.23644778716528, 36.18021380383769],
            [-115.23644773935501, 36.180239778980805],
            [-115.2365142827474, 36.18024094517253],
            [-115.23657948730926, 36.18024318900176],
            [-115.23657953666071, 36.18021937696756],
            [-115.23664608639028, 36.18022162465665],
            [-115.23670996163874, 36.18022278301284],
            [-115.2367099186795, 36.180247676617995],
            [-115.23677512801696, 36.18024883880216]
        ],
        [
            [-115.23684226425577, 36.18060515225207],
            [-115.23697402395965, 36.18060856187418],
            [-115.23697829035417, 36.18047531796289],
            [-115.23691707672076, 36.180473076885946],
            [-115.23691712597076, 36.18044926485199],
            [-115.23684925308694, 36.18044701348367],
            [-115.23678670064628, 36.18044585001762],
            [-115.23678665135678, 36.180469662051266],
            [-115.23672010772597, 36.18046850502276],
            [-115.23665489189531, 36.18046625222419],
            [-115.23665627370782, 36.180440280944794],
            [-115.23658840084047, 36.18043802942873],
            [-115.23652186204708, 36.18043578173885],
            [-115.23652180310351, 36.18046176586181],
            [-115.23645793247239, 36.18045951685289],
            [-115.23645364931258, 36.18059384224745],
            [-115.2365827519096, 36.180597253613996],
            [-115.23671716865431, 36.18060066220171],
            [-115.23684226425577, 36.18060515225207]
        ],
        [
            [-115.23633258643937, 36.18056985047485],
            [-115.23633402914288, 36.180520013123044],
            [-115.23633545745574, 36.180473438411894],
            [-115.2363382229087, 36.18042364995789],
            [-115.23631959024468, 36.180423632001876],
            [-115.23632235412812, 36.18037168043877],
            [-115.23632379186483, 36.18032296968805],
            [-115.23632655574141, 36.180271018123904],
            [-115.2363279934334, 36.18022231638518],
            [-115.23618957515714, 36.18021889575871],
            [-115.23618814849672, 36.18026759752763],
            [-115.23618537341171, 36.180319549055824],
            [-115.23618261740978, 36.18036717442975],
            [-115.23618117638654, 36.18041912982545],
            [-115.2361958179183, 36.18041914524308],
            [-115.23619438644577, 36.18046893756167],
            [-115.23619295327786, 36.180516593809216],
            [-115.23619152160241, 36.18056643119107],
            [-115.23618875108032, 36.18061734624244],
            [-115.23632981596866, 36.18062077454276],
            [-115.23633258643937, 36.18056985047485]
        ],
        [
            [-115.23657932815844, 36.17968142122321],
            [-115.23651411929491, 36.179680258934894],
            [-115.2365114017708, 36.179704072254324],
            [-115.23644885627627, 36.179703990185644],
            [-115.23644591403833, 36.17983929287941],
            [-115.23657633679484, 36.17984053595765],
            [-115.2367107522468, 36.17984394454598],
            [-115.23671236152083, 36.179710810103074],
            [-115.23664582810342, 36.17970748094652],
            [-115.23664587108127, 36.1796825873393],
            [-115.23657932815844, 36.17968142122321]
        ]
    ]);
});
define("examples/style-viewer", ["require", "exports", "openlayers", "jquery", "node_modules/ol3-fun/ol3-fun/snapshot", "node_modules/ol3-fun/index", "ol3-symbolizer/format/ol3-symbolizer", "examples/styles/icon/png", "examples/styles/fill/gradient", "examples/tests/geom/polygon-with-holes"], function (require, exports, ol, $, Snapshot, index_4, ol3_symbolizer_2, pointStyle) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var html = "\n<div class='style-to-canvas'>\n    <h3>Renders a feature on a canvas</h3>\n    <div class=\"area\">\n        <label>256 x 256 Canvas</label>\n        <div id='canvas-collection'></div>\n    </div>\n    <div class=\"area\">\n        <label>Style</label>\n        <textarea class='style'></textarea>\n        <button class=\"save\">Save</button>\n    </div>\n</div>\n";
    var css = "\n<style>\n    #map {\n        display: none;\n    }\n\n    .style-to-canvas {\n    }\n\n    .style-to-canvas .area label {\n        display: block;\n        vertical-align: top;\n    }\n\n    .style-to-canvas .area {\n        border: 1px solid black;\n        padding: 20px;\n        margin: 20px;\n    }\n\n    .style-to-canvas .area .style {\n        width: 100%;\n        height: 400px;\n    }\n\n    .style-to-canvas #canvas-collection canvas {\n        font-family: sans serif;\n        font-size: 20px;\n        border: 1px solid black;\n        padding: 20px;\n        margin: 20px;\n    }\n    \n</style>\n";
    var svg = "\n<div style='display:none'>\n<svg xmlns=\"http://www.w3.org/2000/svg\">\n<symbol viewBox=\"5 0 20 15\" id=\"lock\">\n    <title>lock</title>\n    <path d=\"M10.9,11.6c-0.3-0.6-0.3-2.3,0-2.8c0.4-0.6,3.4,1.4,3.4,1.4c0.9,0.4,0.9-6.1,0-5.7\n\tc0,0-3.1,2.1-3.4,1.4c-0.3-0.7-0.3-2.1,0-2.8C11.2,2.5,15,2.4,15,2.4C15,1.7,12.1,1,10.9,1S8.4,1.1,6.8,1.8C5.2,2.4,3.9,3.4,2.7,4.6\n\tS0,8.2,0,8.9s1.5,2.8,3.7,3.7s3.3,1.1,4.5,1.3c1.1,0.1,2.6,0,3.9-0.3c1-0.2,2.9-0.7,2.9-1.1C15,12.3,11.2,12.2,10.9,11.6z M4.5,9.3\n\tC3.7,9.3,3,8.6,3,7.8s0.7-1.5,1.5-1.5S6,7,6,7.8S5.3,9.3,4.5,9.3z\"\n    />\n</symbol>\n<symbol viewBox=\"0 0 37 37\" id=\"marker\">\n      <title>marker</title>\n      <path d=\"M19.75 2.75 L32.47792206135786 7.022077938642145 L36.75 19.75 L32.47792206135786 32.47792206135786 L19.75 36.75 L7.022077938642145 32.47792206135786 L2.75 19.750000000000004 L7.022077938642141 7.022077938642145 L19.749999999999996 2.75 Z\" /> </symbol>\n</svg>\n</div>\n";
    function loadStyle(name) {
        var d = $.Deferred();
        if ('[' === name[0]) {
            d.resolve(JSON.parse(name));
        }
        else {
            var mids = name.split(",").map(function (name) { return "examples/styles/" + name; });
            require(mids, function () {
                var styles = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    styles[_i] = arguments[_i];
                }
                var style = [];
                styles.forEach(function (s) { return style = style.concat(s); });
                d.resolve(style);
            });
        }
        return d;
    }
    function loadGeom(name) {
        var mids = name.split(",").map(function (name) { return "examples/tests/geom/" + name; });
        var d = $.Deferred();
        require(mids, function () {
            var geoms = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                geoms[_i] = arguments[_i];
            }
            d.resolve(geoms);
        });
        return d;
    }
    var styles = {
        point: pointStyle
    };
    var serializer = new ol3_symbolizer_2.StyleConverter();
    var Renderer = (function () {
        function Renderer(geom) {
            this.feature = new ol.Feature(geom);
            this.canvas = this.createCanvas();
        }
        Renderer.prototype.createCanvas = function (size) {
            if (size === void 0) { size = 256; }
            var canvas = document.createElement("canvas");
            canvas.width = canvas.height = size;
            return canvas;
        };
        Renderer.prototype.draw = function (styles) {
            var canvas = this.canvas;
            var feature = this.feature;
            var style = styles.map(function (style) { return serializer.fromJson(style); });
            feature.setStyle(style);
            canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
            Snapshot.render(canvas, feature);
        };
        return Renderer;
    }());
    function run() {
        $(html).appendTo("body");
        $(svg).appendTo("body");
        $(css).appendTo("head");
        var geom = index_4.getParameterByName("geom") || "polygon-with-holes";
        var style = index_4.getParameterByName("style") || "fill/gradient";
        var save = function () {
            var style = JSON.stringify(JSON.parse($(".style").val() + ""));
            var loc = window.location;
            var url = "" + loc.origin + loc.pathname + "?run=examples/style-viewer&geom=" + geom + "&style=" + encodeURI(style);
            history.replaceState({}, "Changes", url);
            return url;
        };
        loadStyle(style).then(function (styles) {
            loadGeom(geom).then(function (geoms) {
                var style = JSON.stringify(styles, null, ' ');
                $(".style").val(style);
                var renderers = geoms.map(function (g) { return new Renderer(g); });
                renderers.forEach(function (r) { return $(r.canvas).appendTo("#canvas-collection"); });
                setInterval(function () {
                    try {
                        var style_2 = JSON.parse($(".style").val() + "");
                        renderers.forEach(function (r) { return r.draw(style_2); });
                        save();
                    }
                    catch (ex) {
                    }
                }, 2000);
            });
        });
    }
    exports.run = run;
});
define("examples/styles/basic", ["require", "exports"], function (require, exports) {
    "use strict";
    var stroke = {
        color: 'black',
        width: 2
    };
    var fill = {
        color: 'red'
    };
    var radius = 10;
    var opacity = 0.5;
    var square = {
        fill: fill,
        stroke: stroke,
        points: 4,
        radius: radius,
        angle: Math.PI / 4
    };
    var diamond = {
        fill: fill,
        stroke: stroke,
        points: 4,
        radius: radius,
        angle: 0
    };
    var triangle = {
        fill: fill,
        stroke: stroke,
        points: 3,
        radius: radius,
        angle: 0
    };
    var star = {
        fill: fill,
        stroke: stroke,
        points: 5,
        radius: radius,
        radius2: 4,
        angle: 0
    };
    var cross = {
        opacity: opacity,
        fill: fill,
        stroke: stroke,
        points: 4,
        radius: radius,
        radius2: 0,
        angle: 0
    };
    var x = {
        fill: fill,
        stroke: stroke,
        points: 4,
        radius: radius,
        radius2: 0,
        angle: Math.PI / 4
    };
    return {
        cross: [{ star: cross }],
        square: [{ star: square }],
        diamond: [{ star: diamond }],
        star: [{ star: star }],
        triangle: [{ star: triangle }],
        x: [{ star: x }]
    };
});
define("examples/styles/peace", ["require", "exports"], function (require, exports) {
    "use strict";
    return [
        {
            "star": {
                "fill": {
                    "color": "rgba(182,74,9,0.2635968300410687)"
                },
                "opacity": 1,
                "stroke": {
                    "color": "rgba(49,14,23,0.6699808995760113)",
                    "width": 3.4639032010315107
                },
                "radius": 6.63376222856383,
                "radius2": 0,
                "points": 3
            },
            "text": {
                "fill": {
                    "color": "rgba(207,45,78,0.44950090791791375)"
                },
                "stroke": {
                    "color": "rgba(233,121,254,0.3105821877136521)",
                    "width": 4.019676388210171
                },
                "text": "Test",
                "offset-x": 0,
                "offset-y": 14.239434215855646,
                "font": "18px fantasy"
            }
        }
    ];
});
define("examples/styles/ags/cartographiclinesymbol", ["require", "exports"], function (require, exports) {
    "use strict";
    var symbol = function () { return ({
        "type": "esriSLS",
        "style": "esriSLSLongDashDot",
        "color": [
            152,
            230,
            0,
            255
        ],
        "width": 1,
        "cap": "esriLCSButt",
        "join": "esriLJSBevel",
        "miterLimit": 9.75
    }); };
    var styles = "Dash,DashDot,DashDotDot,Dot,LongDash,LongDashDot,ShortDash,ShortDashDot,ShortDashDotDot,ShortDot,Solid".split(",");
    var caps = "Butt,Round,Square".split(",");
    var joins = "Bevel,Miter,Round".split(",");
    var symbols = styles.map(function (style, i) {
        var result = symbol();
        result.style = "esriSLS" + style;
        result.cap = "esriLCS" + caps[i % caps.length];
        result.join = "esriLJS" + joins[i % joins.length];
        return result;
    });
    return symbols;
});
define("examples/styles/ags/picturefillsymbol", ["require", "exports"], function (require, exports) {
    "use strict";
    return [{
            "color": [
                0,
                0,
                0,
                255
            ],
            "type": "esriPFS",
            "url": "http://www.free.designquery.com/01/bg0245.jpg",
            "width": 112.5,
            "height": 112.5,
            "xoffset": 0,
            "yoffset": 0,
            "xscale": 1,
            "yscale": 1
        }];
});
define("examples/styles/ags/picturemarkersymbol-imagedata", ["require", "exports"], function (require, exports) {
    "use strict";
    var style = [{
            "type": "esriPMS",
            "url": "4A138C60",
            "imageData": "iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAYAAAAe2bNZAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAy1JREFUWIXtl0tIG1EUhv84Ymp0AhqsJhUqmmAUtRSlPjbW4mOhaSlushANNiCBiG7GgEZCQGiD4qYSXFiQlkAXBRdWECx2o4JiwE0Jtq60ICKBKsaYSeLtolY7nRmdiYKl5N/de85/7jfnDPNIxT+k1NsG+FNJGDElYcSUhBHTjcAEg0Gi0WgUtw4TDAaJTqfDxMQEsdvt1wK6NszY2BhKnpXAbreDZVmSlpaWMNC1YNrb28kGtQHLWwsOPYeg82isrq6S6urqhIAShvH5fKTX1QvGyyAWj0F1V4U2ZxucTmeiJROHGRwchOmVCYo7CsRiMQBAlaUKkx8m4fF4iMPhkN2dhGD6+vrI/NY8DI0GxNgYJ9bibIHjuQPhcJikp6fLApINs7m5SSoqKmBdtIJlWV4870EeKs2VsNlsckvLhxkYGEBtXy3U99SIRqOCOTX2Gky1TGFhYYE0NTVJ7o5cGAITUPqoFAeHB+JZSqB7sRudLzplFZcFo2/VI+dhDtgodzxH34+QmZ/Jy6/pr4Gv3UdUKpWk7kiGWVtbI55tD6In/NGsT62jvKMc6nw1Z19dqIbVapV6hHSY4eFhZDmyEIlEOPvBL0FszW4hFAqh3lnP8818nsHc3BxpbW29sjuSYMbHx8mIdwQNbANn/xSn8E/6MTo6CoZhsP1kG9oqLSenrKsMQ0NDUo65GubseYG6l3W8e2Xn0w4MmQYwDKOYnp4mPa4eNBobkaJMOc/R1eqwPL8Ml8tF3G73pd25EsZms0HbogVtoMFGLmCiR1EE3gUw+34Wzc3NsFgsCpPJRAIfAyhqK+LUMHYY4R5yY29vj+Tm5ooCCcIo7ytJRlYGQuEQllRL0HfocRw+Po+zP1h8e/MNGTkZMPeakV2cTQBg+esyQvEQQAHaxxfjonIp1L2uQ8nTEiiLlQQAIpsRHpQgTEFXATSFmvN1PB7nxCmagrHfKHaBgh6kAUbbhWfFssLzCMLsr+7jZPvk14KInHbZ9MU8Zz6h14gojLnIDL/fD4qiQFGUoJF35X9JyPfbQ9M0drErDcbr9V77ezYR/X9/BzelJIyYkjBi+gkX4w++7OoZ3gAAAABJRU5ErkJggg==",
            "contentType": "image/png",
            "color": null,
            "width": 26,
            "height": 26,
            "angle": 0,
            "xoffset": 0,
            "yoffset": 0
        }];
    return style;
});
define("examples/styles/ags/picturemarkersymbol", ["require", "exports"], function (require, exports) {
    "use strict";
    return [
        {
            "angle": 0,
            "xoffset": 0,
            "yoffset": 0,
            "type": "esriPMS",
            "url": "https://rawgit.com/mapbox/maki/master/icons/aerialway-11.svg",
            "width": 30,
            "height": 30
        }
    ];
});
define("examples/styles/ags/simplefillsymbol", ["require", "exports"], function (require, exports) {
    "use strict";
    var symbol = function () { return ({
        "color": [
            0,
            0,
            0,
            64
        ],
        "outline": {
            "color": [
                0,
                0,
                0,
                255
            ],
            "width": 1.5,
            "type": "esriSLS",
            "style": "esriSLSDashDotDot"
        },
        "type": "esriSFS",
        "style": "esriSFSBackwardDiagonal"
    }); };
    var styles = "BackwardDiagonal,Cross,DiagonalCross,ForwardDiagonal,Horizontal,Solid,Vertical".split(",");
    var symbols = styles.map(function (style) {
        var result = symbol();
        result.style = "esriSFS" + style;
        return result;
    });
    return symbols;
});
define("examples/styles/ags/simplemarkersymbol-circle", ["require", "exports"], function (require, exports) {
    "use strict";
    var styles = [{
            "color": [
                255,
                255,
                255,
                64
            ],
            "size": 12,
            "angle": 0,
            "xoffset": 0,
            "yoffset": 0,
            "type": "esriSMS",
            "style": "esriSMSCircle",
            "outline": {
                "color": [
                    0,
                    0,
                    0,
                    255
                ],
                "width": 1,
                "type": "esriSLS",
                "style": "esriSLSSolid"
            }
        }];
    return styles;
});
define("examples/styles/ags/simplemarkersymbol-cross", ["require", "exports"], function (require, exports) {
    "use strict";
    return [
        {
            "color": [
                255,
                255,
                255,
                64
            ],
            "size": 12,
            "angle": 0,
            "xoffset": 0,
            "yoffset": 0,
            "type": "esriSMS",
            "style": "esriSMSCross",
            "outline": {
                "color": [
                    0,
                    0,
                    0,
                    255
                ],
                "width": 1,
                "type": "esriSLS",
                "style": "esriSLSSolid"
            }
        }
    ];
});
define("examples/styles/ags/simplemarkersymbol-diamond", ["require", "exports"], function (require, exports) {
    "use strict";
    return [
        {
            "color": [
                255,
                255,
                255,
                64
            ],
            "size": 12,
            "angle": 0,
            "xoffset": 0,
            "yoffset": 0,
            "type": "esriSMS",
            "style": "esriSMSDiamond",
            "outline": {
                "color": [
                    0,
                    0,
                    0,
                    255
                ],
                "width": 1,
                "type": "esriSLS",
                "style": "esriSLSSolid"
            }
        }
    ];
});
define("examples/styles/ags/simplemarkersymbol-path", ["require", "exports"], function (require, exports) {
    "use strict";
    return [
        {
            "color": [
                255,
                255,
                255,
                64
            ],
            "size": 12,
            "angle": 0,
            "xoffset": 0,
            "yoffset": 0,
            "type": "esriSMS",
            "style": "esriSMSPath",
            "outline": {
                "color": [
                    0,
                    0,
                    0,
                    255
                ],
                "width": 1,
                "type": "esriSLS",
                "style": "esriSLSSolid"
            },
            "path": "M16,3.5c-4.142,0-7.5,3.358-7.5,7.5c0,4.143,7.5,18.121,7.5,18.121S23.5,15.143,23.5,11C23.5,6.858,20.143,3.5,16,3.5z M16,14.584c-1.979,0-3.584-1.604-3.584-3.584S14.021,7.416,16,7.416S19.584,9.021,19.584,11S17.979,14.584,16,14.584z"
        }
    ];
});
define("examples/styles/ags/simplemarkersymbol-square", ["require", "exports"], function (require, exports) {
    "use strict";
    return [
        {
            "color": [
                255,
                255,
                255,
                64
            ],
            "size": 12,
            "angle": 0,
            "xoffset": 0,
            "yoffset": 0,
            "type": "esriSMS",
            "style": "esriSMSSquare",
            "outline": {
                "color": [
                    0,
                    0,
                    0,
                    255
                ],
                "width": 1,
                "type": "esriSLS",
                "style": "esriSLSSolid"
            }
        }
    ];
});
define("examples/styles/ags/simplemarkersymbol-x", ["require", "exports"], function (require, exports) {
    "use strict";
    return [{
            "color": [
                255,
                255,
                255,
                64
            ],
            "size": 12,
            "angle": 0,
            "xoffset": 0,
            "yoffset": 0,
            "type": "esriSMS",
            "style": "esriSMSX",
            "outline": {
                "color": [
                    0,
                    0,
                    0,
                    255
                ],
                "width": 1,
                "type": "esriSLS",
                "style": "esriSLSSolid"
            }
        }];
});
define("examples/styles/ags/textsymbol", ["require", "exports"], function (require, exports) {
    "use strict";
    return [
        {
            "color": [
                0,
                0,
                0,
                255
            ],
            "type": "esriTS",
            "horizontalAlignment": "center",
            "angle": 0,
            "xoffset": 0,
            "yoffset": 0,
            "text": "Sample Text",
            "rotated": false,
            "kerning": true,
            "font": {
                "size": 10,
                "style": "normal",
                "variant": "normal",
                "weight": "normal",
                "family": "serif"
            }
        }
    ];
});
define("examples/styles/circle/alert", ["require", "exports"], function (require, exports) {
    "use strict";
    return [
        {
            "circle": {
                "fill": {
                    "color": "rgba(197,37,84,0.90)"
                },
                "opacity": 1,
                "stroke": {
                    "color": "rgba(227,83,105,1)",
                    "width": 4.4
                },
                "radius": 7.3
            },
            "text": {
                "fill": {
                    "color": "rgba(205,86,109,0.9)"
                },
                "stroke": {
                    "color": "rgba(252,175,131,0.5)",
                    "width": 2
                },
                "text": "Test",
                "offset-x": 0,
                "offset-y": 20,
                "font": "18px fantasy"
            }
        }
    ];
});
define("examples/styles/circle/gradient", ["require", "exports"], function (require, exports) {
    "use strict";
    return [
        {
            "circle": {
                "fill": {
                    "color": "rgba(197,37,84,0.2)",
                    "gradient": ["rgba(197,37,84,0.2)", "rgba(197,37,84,0.8)"]
                },
                "opacity": 1,
                "stroke": {
                    "color": "rgba(227,83,105,0.5)",
                    "width": 4
                },
                "radius": 7
            }
        }
    ];
});
define("examples/styles/fill/cross", ["require", "exports"], function (require, exports) {
    "use strict";
    return [{
            "fill": {
                "pattern": {
                    "orientation": "cross",
                    "color": "rgba(12,236,43,1)",
                    "spacing": 7,
                    "repitition": "repeat"
                }
            }
        }];
});
define("examples/styles/fill/diagonal", ["require", "exports"], function (require, exports) {
    "use strict";
    return [
        {
            "fill": {
                "pattern": {
                    "orientation": "diagonal",
                    "color": "rgba(230,113,26,1)",
                    "spacing": 3,
                    "repitition": "repeat"
                }
            }
        }
    ];
});
define("examples/styles/fill/horizontal", ["require", "exports"], function (require, exports) {
    "use strict";
    return [{
            "fill": {
                "pattern": {
                    "orientation": "horizontal",
                    "color": "rgba(115,38,12,1)",
                    "spacing": 6,
                    "repitition": "repeat"
                }
            }
        }];
});
define("examples/styles/fill/vertical", ["require", "exports"], function (require, exports) {
    "use strict";
    return [{
            "fill": {
                "pattern": {
                    "orientation": "vertical",
                    "color": "rgba(12,236,43,1)",
                    "spacing": 7,
                    "repitition": "repeat"
                }
            }
        }];
});
define("examples/styles/icon/svg", ["require", "exports"], function (require, exports) {
    "use strict";
    return [
        {
            "image": {
                "imgSize": [
                    48,
                    48
                ],
                "stroke": {
                    "color": "rgba(255,25,0,0.8)",
                    "width": 10
                },
                "path": "M23 2 L23 23 L43 16.5 L23 23 L35 40 L23 23 L11 40 L23 23 L3 17 L23 23 L23 2 Z"
            }
        }
    ];
});
define("examples/styles/star/4star", ["require", "exports"], function (require, exports) {
    "use strict";
    return [
        {
            "star": {
                "fill": {
                    "color": "rgba(238,162,144,0.4)"
                },
                "opacity": 1,
                "stroke": {
                    "color": "rgba(169,141,168,0.8)",
                    "width": 5
                },
                "radius": 13,
                "radius2": 7,
                "points": 4
            }
        }
    ];
});
define("examples/styles/star/6star", ["require", "exports"], function (require, exports) {
    "use strict";
    return [
        {
            "star": {
                "fill": {
                    "color": "rgba(54,47,234,1)"
                },
                "stroke": {
                    "color": "rgba(75,92,105,0.85)",
                    "width": 4
                },
                "radius": 9,
                "radius2": 0,
                "points": 6
            }
        }
    ];
});
define("examples/styles/star/cold", ["require", "exports"], function (require, exports) {
    "use strict";
    return [
        {
            "star": {
                "fill": {
                    "color": "rgb(127,220,241)"
                },
                "opacity": 0.5,
                "stroke": {
                    "color": "rgb(160,164,166)",
                    "width": 3
                },
                "radius": 11,
                "radius2": 5,
                "points": 12
            }
        }
    ];
});
define("examples/styles/star/flower", ["require", "exports"], function (require, exports) {
    "use strict";
    return [
        {
            "star": {
                "fill": {
                    "color": "rgba(106,9,251,0.7)"
                },
                "opacity": 1,
                "stroke": {
                    "color": "rgba(42,128,244,0.8)",
                    "width": 8
                },
                "radius": 14,
                "radius2": 9,
                "points": 10
            },
            "text": {
                "fill": {
                    "color": "rgba(255,255,255,1)"
                },
                "stroke": {
                    "color": "rgba(0,0,0,1)",
                    "width": 2
                },
                "text": "Test",
                "offset-x": 0,
                "offset-y": 20,
                "font": "18px fantasy"
            }
        }
    ];
});
define("examples/styles/stroke/linedash", ["require", "exports"], function (require, exports) {
    "use strict";
    var dasharray = {
        solid: "none",
        shortdash: [4, 1],
        shortdot: [1, 1],
        shortdashdot: [4, 1, 1, 1],
        shortdashdotdot: [4, 1, 1, 1, 1, 1],
        dot: [1, 3],
        dash: [4, 3],
        longdash: [8, 3],
        dashdot: [4, 3, 1, 3],
        longdashdot: [8, 3, 1, 3],
        longdashdotdot: [8, 3, 1, 3, 1, 3]
    };
    return dasharray;
});
define("examples/styles/stroke/dash", ["require", "exports", "examples/styles/stroke/linedash"], function (require, exports, Dashes) {
    "use strict";
    return [
        {
            "stroke": {
                "color": "red",
                "width": 2,
                "lineDash": Dashes.dash
            }
        }
    ];
});
define("examples/styles/stroke/dashdotdot", ["require", "exports", "examples/styles/stroke/linedash"], function (require, exports, Dashes) {
    "use strict";
    return [
        {
            "stroke": {
                "color": "orange",
                "width": 2,
                "lineDash": Dashes.longdashdotdot
            }
        }
    ];
});
define("examples/styles/stroke/dot", ["require", "exports", "examples/styles/stroke/linedash"], function (require, exports, Dashes) {
    "use strict";
    return [
        {
            "stroke": {
                "color": "yellow",
                "width": 2,
                "lineDash": Dashes.dot
            }
        }
    ];
});
define("examples/styles/stroke/solid", ["require", "exports"], function (require, exports) {
    "use strict";
    return [
        {
            "stroke": {
                "color": "blue",
                "width": 2
            }
        }
    ];
});
define("examples/styles/text/text", ["require", "exports"], function (require, exports) {
    "use strict";
    return [
        {
            "text": {
                "fill": {
                    "color": "rgba(75,92,85,0.85)"
                },
                "stroke": {
                    "color": "rgba(255,255,255,1)",
                    "width": 5
                },
                "offset-x": 0,
                "offset-y": 0,
                "text": "fantasy light",
                "font": "18px serif"
            }
        }
    ];
});
define("examples/tests/backward-diagonal", ["require", "exports", "ol3-symbolizer/format/ags-symbolizer", "ol3-symbolizer/format/ol3-symbolizer"], function (require, exports, ags_symbolizer_1, ol3_symbolizer_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var agsZones = {
        "currentVersion": 10.31,
        "id": 6,
        "name": "Overlay Zones",
        "type": "Feature Layer",
        "description": "",
        "geometryType": "esriGeometryPolygon",
        "copyrightText": "",
        "parentLayer": null,
        "subLayers": [],
        "minScale": 0,
        "maxScale": 0,
        "drawingInfo": {
            "renderer": {
                "type": "uniqueValue",
                "field1": "PLANZONE",
                "field2": null,
                "field3": null,
                "fieldDelimiter": ", ",
                "defaultSymbol": null,
                "defaultLabel": null,
                "uniqueValueInfos": [
                    {
                        "symbol": {
                            "type": "esriSFS",
                            "style": "esriSFSForwardDiagonal",
                            "color": [
                                0,
                                255,
                                0,
                                255
                            ],
                            "outline": {
                                "type": "esriSLS",
                                "style": "esriSLSSolid",
                                "color": [
                                    0,
                                    255,
                                    0,
                                    255
                                ],
                                "width": 0.4
                            }
                        },
                        "value": "AO-1",
                        "label": "AO-1",
                        "description": ""
                    },
                    {
                        "symbol": {
                            "type": "esriSFS",
                            "style": "esriSFSBackwardDiagonal",
                            "color": [
                                0,
                                129,
                                254,
                                255
                            ],
                            "outline": {
                                "type": "esriSLS",
                                "style": "esriSLSSolid",
                                "color": [
                                    0,
                                    129,
                                    254,
                                    255
                                ],
                                "width": 0.4
                            }
                        },
                        "value": "AO-2",
                        "label": "AO-2",
                        "description": ""
                    },
                    {
                        "symbol": {
                            "type": "esriPFS",
                            "url": "78ff6f6cb8ad6ca6d96eed86217d46ca",
                            "imageData": "iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAYAAACohjseAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAyRJREFUaIG1WkGSAyEIJFX+JP9/Ut6SvaxVhkDTDYZTZkREBBqcrJfZ2/7pafYwQJu34rsxl+Wv9F/nSy/UP3cM8DJ7P80ep0wvJ1JSMSLiXYhR3VDEz8h8mj3OTfo1IoOxOi40qJ6o4lasMRWjb7mnHnCD6okid0dyog13KIxBvxBiVniRW53zz/hk5Veecr6HMYgUrDZQyVW8QZ170mLiJovBbMEbLqd4E1p3KYqwp8bAQKTcOc7Ec5VRX2bvFTEzJzDFKQVjWUNG4yti7gS96pJdF64SlueHMOEVysBY2XCmIOs9asIKNxgBZiWIXbBS8IZ3lEBfbagqnyp+ZozJ7tncDxxEGSqawDwr9aKSQJis6Q2fwgTjFiwuMnMYUjP7h4uiQI+K7qjEUoqGjCp3jvRA8ymYYF2SPfWuARhP+apkKoUYJZUkwcTWTYIwkT0zqZztRjrdBJJJnWCkrFp7KjDCyIyIkbtYS01qzypW1D40w+mw2FYBGI13ryymhTuiECYyQVXcsAlkgrEKb9pNqIsw8YlkMTcGSBbCRQkmJlUPcudOhcLqkbpopXingL4hO+PPZFI4yCqIbrYrBdmkox6E1NFPTgXJmmTRCnOhi7LVhoqf0yyK9NpFyf4Nrw0rnPtF/agU7hl9nKCSKDqB7+d1ugnmSjGb2+omvKI3jHGrhdry9ljqop1KhlFYqYD22KRIaN9so/eTyieSMWkCwq9LVSqe0sQALK7u39TXJcY1bt58T07M80AcREoqbslkxsk9KFWqVVZXwJnh72TdqpuI9GnXolNoUGV31klhgom5bt0ZvWNld5IdDRPd01GTgid0B7PHvZzy44ufzKblW8aqNlXJCrNoR1G0yOQbxE2i/+mk3qJN4gitqxYB1L8sGEW6c9SMiWrTEAd/ETdKtvuFYdMk0/keEPGrMckahOVLkwxSUF1M6f5Zt1WLj69KBgWvH+9mx5udCVMfUx1950Qnm7gZv2EWvfm568bGfXevyAizKJsIuteGjOxMhtpO0ZUM8+6XN2kMwX4QKTyNCRXcWWLkSBe/XjjLq8id8vhN/wHAM/YoQRgDtgAAAABJRU5ErkJggg==",
                            "contentType": "image/png",
                            "outline": {
                                "type": "esriSLS",
                                "style": "esriSLSSolid",
                                "color": [
                                    255,
                                    0,
                                    0,
                                    255
                                ],
                                "width": 1
                            },
                            "width": 42,
                            "height": 42,
                            "angle": 0,
                            "xoffset": 0,
                            "yoffset": 0,
                            "xscale": 1,
                            "yscale": 1
                        },
                        "value": "AO-3",
                        "label": "AO-3",
                        "description": ""
                    },
                    {
                        "symbol": {
                            "type": "esriSFS",
                            "style": "esriSFSForwardDiagonal",
                            "color": [
                                0,
                                208,
                                219,
                                255
                            ],
                            "outline": {
                                "type": "esriSLS",
                                "style": "esriSLSSolid",
                                "color": [
                                    0,
                                    112,
                                    255,
                                    255
                                ],
                                "width": 1
                            }
                        },
                        "value": "L",
                        "label": "L",
                        "description": ""
                    },
                    {
                        "symbol": {
                            "type": "esriSFS",
                            "style": "esriSFSBackwardDiagonal",
                            "color": [
                                0,
                                208,
                                219,
                                255
                            ],
                            "outline": {
                                "type": "esriSLS",
                                "style": "esriSLSSolid",
                                "color": [
                                    115,
                                    255,
                                    223,
                                    255
                                ],
                                "width": 1
                            }
                        },
                        "value": "UCD 1",
                        "label": "UC",
                        "description": ""
                    },
                    {
                        "symbol": {
                            "type": "esriSFS",
                            "style": "esriSFSBackwardDiagonal",
                            "color": [
                                0,
                                208,
                                219,
                                255
                            ],
                            "outline": {
                                "type": "esriSLS",
                                "style": "esriSLSSolid",
                                "color": [
                                    115,
                                    255,
                                    223,
                                    255
                                ],
                                "width": 1
                            }
                        },
                        "value": "UCD 1 E",
                        "label": "UC",
                        "description": ""
                    },
                    {
                        "symbol": {
                            "type": "esriSFS",
                            "style": "esriSFSBackwardDiagonal",
                            "color": [
                                0,
                                208,
                                219,
                                255
                            ],
                            "outline": {
                                "type": "esriSLS",
                                "style": "esriSLSSolid",
                                "color": [
                                    115,
                                    255,
                                    223,
                                    255
                                ],
                                "width": 1
                            }
                        },
                        "value": "UCD 1 W",
                        "label": "UC",
                        "description": ""
                    },
                    {
                        "symbol": {
                            "type": "esriSFS",
                            "style": "esriSFSBackwardDiagonal",
                            "color": [
                                0,
                                208,
                                219,
                                255
                            ],
                            "outline": {
                                "type": "esriSLS",
                                "style": "esriSLSSolid",
                                "color": [
                                    115,
                                    255,
                                    223,
                                    255
                                ],
                                "width": 1
                            }
                        },
                        "value": "UCD 2",
                        "label": "UC",
                        "description": ""
                    },
                    {
                        "symbol": {
                            "type": "esriSFS",
                            "style": "esriSFSBackwardDiagonal",
                            "color": [
                                0,
                                208,
                                219,
                                255
                            ],
                            "outline": {
                                "type": "esriSLS",
                                "style": "esriSLSSolid",
                                "color": [
                                    115,
                                    255,
                                    223,
                                    255
                                ],
                                "width": 1
                            }
                        },
                        "value": "UCD 2 A",
                        "label": "UC",
                        "description": ""
                    },
                    {
                        "symbol": {
                            "type": "esriSFS",
                            "style": "esriSFSBackwardDiagonal",
                            "color": [
                                0,
                                208,
                                219,
                                255
                            ],
                            "outline": {
                                "type": "esriSLS",
                                "style": "esriSLSSolid",
                                "color": [
                                    115,
                                    255,
                                    223,
                                    255
                                ],
                                "width": 1
                            }
                        },
                        "value": "UCD 2 B",
                        "label": "UC",
                        "description": ""
                    },
                    {
                        "symbol": {
                            "type": "esriSFS",
                            "style": "esriSFSBackwardDiagonal",
                            "color": [
                                0,
                                208,
                                219,
                                255
                            ],
                            "outline": {
                                "type": "esriSLS",
                                "style": "esriSLSSolid",
                                "color": [
                                    115,
                                    255,
                                    223,
                                    255
                                ],
                                "width": 1
                            }
                        },
                        "value": "UCD 2 C",
                        "label": "UC",
                        "description": ""
                    },
                    {
                        "symbol": {
                            "type": "esriSFS",
                            "style": "esriSFSBackwardDiagonal",
                            "color": [
                                0,
                                208,
                                219,
                                255
                            ],
                            "outline": {
                                "type": "esriSLS",
                                "style": "esriSLSSolid",
                                "color": [
                                    115,
                                    255,
                                    223,
                                    255
                                ],
                                "width": 1
                            }
                        },
                        "value": "UCD 2 D",
                        "label": "UC",
                        "description": ""
                    },
                    {
                        "symbol": {
                            "type": "esriSFS",
                            "style": "esriSFSBackwardDiagonal",
                            "color": [
                                0,
                                208,
                                219,
                                255
                            ],
                            "outline": {
                                "type": "esriSLS",
                                "style": "esriSLSSolid",
                                "color": [
                                    115,
                                    255,
                                    223,
                                    255
                                ],
                                "width": 1
                            }
                        },
                        "value": "UCD 2 E",
                        "label": "UC",
                        "description": ""
                    },
                    {
                        "symbol": {
                            "type": "esriSFS",
                            "style": "esriSFSBackwardDiagonal",
                            "color": [
                                0,
                                208,
                                219,
                                255
                            ],
                            "outline": {
                                "type": "esriSLS",
                                "style": "esriSLSSolid",
                                "color": [
                                    115,
                                    255,
                                    223,
                                    255
                                ],
                                "width": 1
                            }
                        },
                        "value": "UCD 2 F",
                        "label": "UC",
                        "description": ""
                    },
                    {
                        "symbol": {
                            "type": "esriSFS",
                            "style": "esriSFSBackwardDiagonal",
                            "color": [
                                0,
                                208,
                                219,
                                255
                            ],
                            "outline": {
                                "type": "esriSLS",
                                "style": "esriSLSSolid",
                                "color": [
                                    115,
                                    255,
                                    223,
                                    255
                                ],
                                "width": 1
                            }
                        },
                        "value": "UCD 3",
                        "label": "UC",
                        "description": ""
                    },
                    {
                        "symbol": {
                            "type": "esriSFS",
                            "style": "esriSFSBackwardDiagonal",
                            "color": [
                                0,
                                208,
                                219,
                                255
                            ],
                            "outline": {
                                "type": "esriSLS",
                                "style": "esriSLSSolid",
                                "color": [
                                    115,
                                    255,
                                    223,
                                    255
                                ],
                                "width": 1
                            }
                        },
                        "value": "UCD 3 A",
                        "label": "UC",
                        "description": ""
                    },
                    {
                        "symbol": {
                            "type": "esriSFS",
                            "style": "esriSFSBackwardDiagonal",
                            "color": [
                                0,
                                208,
                                219,
                                255
                            ],
                            "outline": {
                                "type": "esriSLS",
                                "style": "esriSLSSolid",
                                "color": [
                                    115,
                                    255,
                                    223,
                                    255
                                ],
                                "width": 1
                            }
                        },
                        "value": "UCD 3 B",
                        "label": "UC",
                        "description": ""
                    },
                    {
                        "symbol": {
                            "type": "esriSFS",
                            "style": "esriSFSBackwardDiagonal",
                            "color": [
                                0,
                                208,
                                219,
                                255
                            ],
                            "outline": {
                                "type": "esriSLS",
                                "style": "esriSLSSolid",
                                "color": [
                                    115,
                                    255,
                                    223,
                                    255
                                ],
                                "width": 1
                            }
                        },
                        "value": "UCD 3 C",
                        "label": "UC",
                        "description": ""
                    },
                    {
                        "symbol": {
                            "type": "esriSFS",
                            "style": "esriSFSBackwardDiagonal",
                            "color": [
                                0,
                                208,
                                219,
                                255
                            ],
                            "outline": {
                                "type": "esriSLS",
                                "style": "esriSLSSolid",
                                "color": [
                                    115,
                                    255,
                                    223,
                                    255
                                ],
                                "width": 1
                            }
                        },
                        "value": "UCD 4",
                        "label": "UC",
                        "description": ""
                    },
                    {
                        "symbol": {
                            "type": "esriSFS",
                            "style": "esriSFSForwardDiagonal",
                            "color": [
                                0,
                                208,
                                219,
                                255
                            ],
                            "outline": {
                                "type": "esriSLS",
                                "style": "esriSLSSolid",
                                "color": [
                                    0,
                                    230,
                                    169,
                                    255
                                ],
                                "width": 1
                            }
                        },
                        "value": "UN",
                        "label": "UN",
                        "description": ""
                    }
                ]
            },
            "transparency": 0,
            "labelingInfo": null
        },
        "defaultVisibility": true,
        "extent": {
            "xmin": 1374524.3392499983,
            "ymin": 494286.04200000316,
            "xmax": 1418161.7010000013,
            "ymax": 525857.6349999979,
            "spatialReference": {
                "wkid": 102697,
                "latestWkid": 102697
            }
        },
        "hasAttachments": false,
        "htmlPopupType": "esriServerHTMLPopupTypeNone",
        "displayField": "PLANZONE",
        "typeIdField": null,
        "fields": [
            {
                "name": "OBJECTID",
                "type": "esriFieldTypeOID",
                "alias": "OBJECTID",
                "domain": null
            },
            {
                "name": "PLANZONE",
                "type": "esriFieldTypeString",
                "alias": "Overlay Zoning District",
                "length": 8,
                "domain": {
                    "type": "codedValue",
                    "name": "ZoningDistricts_3",
                    "codedValues": [
                        {
                            "name": "Single-Family Residential",
                            "code": "R-SF"
                        },
                        {
                            "name": "Townhouse Residential",
                            "code": "R-TH"
                        },
                        {
                            "name": "Low-Density Multi-Family Residential",
                            "code": "R-LD"
                        },
                        {
                            "name": "Medium-Density Multi-Family Residential",
                            "code": "R-MD"
                        },
                        {
                            "name": "High-Density Multi-Family Residential",
                            "code": "R-HD"
                        },
                        {
                            "name": "Manufactured Home Community",
                            "code": "R-MHC"
                        },
                        {
                            "name": "Government and Institutional",
                            "code": "GI"
                        },
                        {
                            "name": "Planned Development",
                            "code": "PD"
                        },
                        {
                            "name": "Limited Business",
                            "code": "LB"
                        },
                        {
                            "name": "General Retail",
                            "code": "GR"
                        },
                        {
                            "name": "Highway Commercial",
                            "code": "HC"
                        },
                        {
                            "name": "Commercial Service",
                            "code": "CS"
                        },
                        {
                            "name": "Center City",
                            "code": "CC"
                        },
                        {
                            "name": "Restricted Industrial",
                            "code": "RI"
                        },
                        {
                            "name": "Light Industrial",
                            "code": "LI"
                        },
                        {
                            "name": "General Manufacturing",
                            "code": "GM"
                        },
                        {
                            "name": "Heavy Manufacturing",
                            "code": "HM"
                        },
                        {
                            "name": "Industrial Commercial",
                            "code": "IC"
                        },
                        {
                            "name": "University Combining",
                            "code": "UN"
                        },
                        {
                            "name": "Urban Conservation",
                            "code": "UC"
                        },
                        {
                            "name": "Landmarks",
                            "code": "L"
                        },
                        {
                            "name": "Airport Overlay District-1",
                            "code": "AO-1"
                        },
                        {
                            "name": "Airport Overlay District-2",
                            "code": "AO-2"
                        },
                        {
                            "name": "Airport Overlay District-3",
                            "code": "AO-3"
                        },
                        {
                            "name": "Office (O-1)",
                            "code": "O-1"
                        },
                        {
                            "name": "Office (O-2)",
                            "code": "O-2"
                        },
                        {
                            "name": "Agriculture",
                            "code": "CNTY-A-1"
                        },
                        {
                            "name": "Agriculture-Residence",
                            "code": "CNTY-A-R"
                        },
                        {
                            "name": "Suburban Residence",
                            "code": "CNTY-R-1"
                        },
                        {
                            "name": "One and Two Family Residence",
                            "code": "CNTY-R-2"
                        },
                        {
                            "name": "Multi-Family Residence (R-3)",
                            "code": "CNTY-R-3"
                        },
                        {
                            "name": "Multi-Family Residence (R-4)",
                            "code": "CNTY-R-4"
                        },
                        {
                            "name": "Professional Office",
                            "code": "CNTY-O-1"
                        },
                        {
                            "name": "General Office",
                            "code": "CNTY-O-2"
                        },
                        {
                            "name": "Neighborhood Commercial",
                            "code": "CNTY-C-1"
                        },
                        {
                            "name": "General Commercial",
                            "code": "CNTY-C-2"
                        },
                        {
                            "name": "Rural Commercial",
                            "code": "CNTY-C-3"
                        },
                        {
                            "name": "Light Manufacturing or Industrial",
                            "code": "CNTY-M-1"
                        },
                        {
                            "name": "General Manufacturing or Industrial",
                            "code": "CNTY-M-2"
                        },
                        {
                            "name": "Plot Assignment District",
                            "code": "CNTY-PAD"
                        },
                        {
                            "name": "No Designation",
                            "code": "NONE"
                        },
                        {
                            "name": "Conditional Overlay District",
                            "code": "COD"
                        },
                        {
                            "name": "Manufactured Home Park or Subdivision",
                            "code": "CNTY-MH1"
                        },
                        {
                            "name": "Commercial Street Zone 1",
                            "code": "COM-1"
                        },
                        {
                            "name": "Commercial Street Zone 2",
                            "code": "COM-2"
                        }
                    ]
                }
            },
            {
                "name": "Shape",
                "type": "esriFieldTypeGeometry",
                "alias": "Shape",
                "domain": null
            },
            {
                "name": "SHAPE_STArea__",
                "type": "esriFieldTypeDouble",
                "alias": "SHAPE_STArea__",
                "domain": null
            },
            {
                "name": "SHAPE_STLength__",
                "type": "esriFieldTypeDouble",
                "alias": "SHAPE_STLength__",
                "domain": null
            },
            {
                "name": "Shape.STArea()",
                "type": "esriFieldTypeDouble",
                "alias": "Shape.STArea()",
                "domain": null
            },
            {
                "name": "Shape.STLength()",
                "type": "esriFieldTypeDouble",
                "alias": "Shape.STLength()",
                "domain": null
            }
        ],
        "relationships": [],
        "canModifyLayer": false,
        "canScaleSymbols": false,
        "hasLabels": false,
        "capabilities": "Map,Query,Data",
        "maxRecordCount": 1000,
        "supportsStatistics": true,
        "supportsAdvancedQueries": true,
        "supportedQueryFormats": "JSON, AMF",
        "ownershipBasedAccessControlForFeatures": {
            "allowOthersToQuery": true
        },
        "advancedQueryCapabilities": {
            "useStandardizedQueries": false,
            "supportsStatistics": true,
            "supportsOrderBy": true,
            "supportsDistinct": true,
            "supportsPagination": false,
            "supportsTrueCurve": true,
            "supportsReturningQueryExtent": true,
            "supportsQueryWithDistance": true
        }
    };
    function convertBackwardDiagonal() {
        var converter = new ags_symbolizer_1.StyleConverter();
        var inverse = new ol3_symbolizer_3.StyleConverter();
        var sfsBackwardDiagonals = agsZones.drawingInfo.renderer.uniqueValueInfos
            .filter(function (vi) { return vi.symbol.type === "esriSFS" && vi.symbol.style === "esriSFSBackwardDiagonal"; });
        sfsBackwardDiagonals.forEach(function (symbolInfo) {
            console.log("testing: " + symbolInfo.label + "='" + symbolInfo.value + "'");
            var sy = symbolInfo.symbol;
            var olStyle = converter.fromJson(sy);
            var style = inverse.toJson(olStyle);
            console.assert(style.fill.pattern.orientation === "backward", "backward orientation");
            sy.color && console.assert(!!style.fill.pattern.color, "color defined");
            if (sy.outline) {
                switch (sy.outline.type) {
                    case "esriSLS":
                        console.assert(3 * style.stroke.width === 4 * sy.outline.width);
                        break;
                }
            }
        });
    }
    function run() {
        convertBackwardDiagonal();
    }
    exports.run = run;
});
define("examples/tests/index", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function run() {
        var l = window.location;
        var path = "" + l.origin + l.pathname + "?run=examples/tests/";
        var labs = "\n    index\n    backward-diagonal\n    ";
        document.writeln("\n    <p>\n    Watch the console output for failed assertions (blank is good).\n    </p>\n    ");
        document.writeln(labs
            .split(/ /)
            .map(function (v) { return v.trim(); })
            .filter(function (v) { return !!v; })
            .sort()
            .map(function (lab) { return "<a href=" + path + lab + "&debug=1>" + lab + "</a>"; })
            .join("<br/>"));
    }
    exports.run = run;
    ;
});
define("examples/tests/geom/multipoint", ["require", "exports", "openlayers"], function (require, exports, ol) {
    "use strict";
    return new ol.geom.MultiPoint([
        [-115, 36],
        [-115.26, 36.3],
        [-115.2553, 36.1831]
    ]);
});
define("examples/tests/geom/multipolygon", ["require", "exports", "openlayers"], function (require, exports, ol) {
    "use strict";
    return new ol.geom.MultiPolygon([
        [[
                [-115.23618294625469, 36.17956944939985],
                [-115.23618152437697, 36.1796170696354],
                [-115.2361813999148, 36.17967551816986],
                [-115.23634908732791, 36.17967680645728],
                [-115.23634919412686, 36.179624856198686],
                [-115.2363824679463, 36.17962489855586],
                [-115.2363825795315, 36.1795718577452],
                [-115.23638534968705, 36.179520987743686],
                [-115.23635074658684, 36.17951986899516],
                [-115.2363521827075, 36.17946899512751],
                [-115.2363522910816, 36.179419207976636],
                [-115.236386892558, 36.179418163614926],
                [-115.2363870009098, 36.17936837646343],
                [-115.23638710449244, 36.17931967085019],
                [-115.2363551585448, 36.179318541777775],
                [-115.23635527168521, 36.17926767308688],
                [-115.23638854535363, 36.1792677154416],
                [-115.23638995914024, 36.17922442138702],
                [-115.23641258255111, 36.1792244508959],
                [-115.23641552635529, 36.17909132031167],
                [-115.23634764988991, 36.17909015020365],
                [-115.23634769453865, 36.179067419704054],
                [-115.23627716107944, 36.179066250868104],
                [-115.2362146097472, 36.17906508710888],
                [-115.2362145698311, 36.17908673606951],
                [-115.23614802742047, 36.17908556971632],
                [-115.23608680530958, 36.179085500310464],
                [-115.23608551598718, 36.17906276594198],
                [-115.23601765066995, 36.17906159567923],
                [-115.23595376526016, 36.179060436926335],
                [-115.23595372049765, 36.179083167425176],
                [-115.23588717809511, 36.179082000927025],
                [-115.23582195384806, 36.17908191977068],
                [-115.23582201454218, 36.17905810776571],
                [-115.23575946318529, 36.17905695278159],
                [-115.23569424377776, 36.17905578100435],
                [-115.23569419894028, 36.179078511502695],
                [-115.23563031352298, 36.179077352577124],
                [-115.23562736517071, 36.17921372778321],
                [-115.23575645912092, 36.179216058458195],
                [-115.23588422384631, 36.17921729457083],
                [-115.2360159859503, 36.17921962369661],
                [-115.23614508469727, 36.17922087241399],
                [-115.2362741723721, 36.17922211194713],
                [-115.23627408780143, 36.179266491406025],
                [-115.23618757879821, 36.17926530324189],
                [-115.23618737296034, 36.1793648775767],
                [-115.23618449573719, 36.17946770684685],
                [-115.23618294625469, 36.17956944939985]
            ]],
        [[
                [-115.23686858906352, 36.17946421772446],
                [-115.23708818379693, 36.179467737173354],
                [-115.23708696717102, 36.17941578308344],
                [-115.23712289793187, 36.17941582390601],
                [-115.23712300421819, 36.17936387364166],
                [-115.23712310578506, 36.17931299590278],
                [-115.23708984321254, 36.17931295378433],
                [-115.23708994476085, 36.179262085057985],
                [-115.23709005110757, 36.17921012577965],
                [-115.23712465880284, 36.17921017178786],
                [-115.23712609917445, 36.17915821636679],
                [-115.23712620069831, 36.179107347638976],
                [-115.23709293185466, 36.17910622395091],
                [-115.23709302864063, 36.179056436761556],
                [-115.23687476910101, 36.179052921188244],
                [-115.23665251856224, 36.17904939365998],
                [-115.2366510762937, 36.17909918596493],
                [-115.236621804877, 36.179099146261294],
                [-115.2366203594083, 36.17915218321373],
                [-115.23661891870293, 36.179204138626986],
                [-115.23664953536439, 36.17920417321409],
                [-115.23664809467705, 36.17925612862733],
                [-115.23664798649122, 36.1793059157809],
                [-115.23661738090723, 36.17930588122539],
                [-115.23661727270161, 36.179355668378406],
                [-115.23661583834084, 36.17940870536066],
                [-115.23664644873001, 36.17940765837814],
                [-115.23664500327055, 36.17946069532819],
                [-115.23686858906352, 36.17946421772446]
            ]],
        [[
                [-115.23531117600369, 36.179579184921224],
                [-115.23537638954298, 36.179579266325774],
                [-115.23537633500685, 36.17960416891128],
                [-115.23543755751767, 36.17960423868263],
                [-115.23550144331914, 36.17960540672608],
                [-115.23550149626053, 36.17957834103089],
                [-115.23556538204222, 36.17957950904011],
                [-115.23562793859004, 36.1795795825893],
                [-115.23562787939407, 36.179605557701095],
                [-115.23569043592308, 36.17960564023055],
                [-115.23575431065326, 36.17960679909393],
                [-115.23575437458497, 36.17957974244331],
                [-115.23582357921542, 36.179579826178696],
                [-115.23582252817624, 36.17944777458885],
                [-115.23569209497232, 36.17944653066063],
                [-115.23556565919206, 36.17944637074196],
                [-115.23543922341348, 36.179446210689804],
                [-115.23531278759663, 36.17944605951695],
                [-115.23525822443638, 36.179445991018255],
                [-115.23525825181221, 36.179429749785584],
                [-115.23525979770169, 36.17932908878721],
                [-115.23526002234115, 36.17922301618337],
                [-115.23526157145767, 36.17911911053341],
                [-115.23526310621648, 36.17901844949739],
                [-115.23509542023675, 36.1790171596965],
                [-115.23509531107005, 36.17906694684531],
                [-115.23506869664503, 36.17906691449056],
                [-115.23506858900447, 36.179118864748276],
                [-115.23506846696303, 36.179174068634],
                [-115.23509375849314, 36.17917409714073],
                [-115.23509365407101, 36.17922281176253],
                [-115.23509354644585, 36.17927476201899],
                [-115.23506693195053, 36.17927472966353],
                [-115.23506548542977, 36.17932776658991],
                [-115.23506537295849, 36.179380807396655],
                [-115.23509332158127, 36.179380834620375],
                [-115.23509321715753, 36.17942954924048],
                [-115.23509311910382, 36.179479336418154],
                [-115.23506782268866, 36.179480389449196],
                [-115.23506772461859, 36.17953017662637],
                [-115.23506627330525, 36.17958429508896],
                [-115.23509289902239, 36.17958432747747],
                [-115.23509145729834, 36.179636282863015],
                [-115.2352591493816, 36.17963649113807],
                [-115.2352592215437, 36.17960509928969],
                [-115.23531112144691, 36.17960408750662],
                [-115.23531117600369, 36.179579184921224]
            ],
            [
                [-115.23715466140786, 36.18014323272865],
                [-115.23715476767816, 36.1800912824705],
                [-115.23712815766072, 36.18009016903315],
                [-115.23712826398778, 36.18003820976182],
                [-115.23712703145384, 36.17998733718353],
                [-115.23715498501544, 36.179986291401335],
                [-115.23715376202102, 36.179933246732716],
                [-115.23715254534713, 36.17988129264721],
                [-115.2371259290423, 36.17987909763896],
                [-115.23712603221048, 36.179830383013936],
                [-115.2371248187149, 36.17977518427921],
                [-115.23715276744281, 36.17977522003574],
                [-115.23715287850983, 36.17972217922288],
                [-115.23715298477842, 36.17967022896107],
                [-115.2371250360878, 36.179670193204785],
                [-115.23712379880102, 36.1796204021621],
                [-115.23695212519661, 36.17961802187439],
                [-115.23695190123763, 36.17972193137736],
                [-115.23695300817042, 36.17982908938646],
                [-115.23695546344958, 36.179933006637626],
                [-115.2369552394907, 36.18003691613518],
                [-115.23695635595108, 36.18014191106148],
                [-115.2369574708579, 36.180244733863816],
                [-115.23712782763906, 36.18024602878663],
                [-115.2371266062204, 36.18019515624228],
                [-115.23715322103163, 36.18019518814154],
                [-115.23715466140786, 36.18014323272865]
            ],
            [
                [-115.23677512801696, 36.18024883880216],
                [-115.23684033735668, 36.18025000095081],
                [-115.23684172069555, 36.18022619277727],
                [-115.2368909608097, 36.18022841726922],
                [-115.23690560226717, 36.180228441612684],
                [-115.23691120233957, 36.18009530971011],
                [-115.23677945302525, 36.18008973694613],
                [-115.2366516853144, 36.18008632965913],
                [-115.23651993761892, 36.18008291971901],
                [-115.23639084059808, 36.180078435763335],
                [-115.23638656898369, 36.18021264402907],
                [-115.23644778716528, 36.18021380383769],
                [-115.23644773935501, 36.180239778980805],
                [-115.2365142827474, 36.18024094517253],
                [-115.23657948730926, 36.18024318900176],
                [-115.23657953666071, 36.18021937696756],
                [-115.23664608639028, 36.18022162465665],
                [-115.23670996163874, 36.18022278301284],
                [-115.2367099186795, 36.180247676617995],
                [-115.23677512801696, 36.18024883880216]
            ]],
        [[
                [-115.23684226425577, 36.18060515225207],
                [-115.23697402395965, 36.18060856187418],
                [-115.23697829035417, 36.18047531796289],
                [-115.23691707672076, 36.180473076885946],
                [-115.23691712597076, 36.18044926485199],
                [-115.23684925308694, 36.18044701348367],
                [-115.23678670064628, 36.18044585001762],
                [-115.23678665135678, 36.180469662051266],
                [-115.23672010772597, 36.18046850502276],
                [-115.23665489189531, 36.18046625222419],
                [-115.23665627370782, 36.180440280944794],
                [-115.23658840084047, 36.18043802942873],
                [-115.23652186204708, 36.18043578173885],
                [-115.23652180310351, 36.18046176586181],
                [-115.23645793247239, 36.18045951685289],
                [-115.23645364931258, 36.18059384224745],
                [-115.2365827519096, 36.180597253613996],
                [-115.23671716865431, 36.18060066220171],
                [-115.23684226425577, 36.18060515225207]
            ]],
        [[
                [-115.23633258643937, 36.18056985047485],
                [-115.23633402914288, 36.180520013123044],
                [-115.23633545745574, 36.180473438411894],
                [-115.2363382229087, 36.18042364995789],
                [-115.23631959024468, 36.180423632001876],
                [-115.23632235412812, 36.18037168043877],
                [-115.23632379186483, 36.18032296968805],
                [-115.23632655574141, 36.180271018123904],
                [-115.2363279934334, 36.18022231638518],
                [-115.23618957515714, 36.18021889575871],
                [-115.23618814849672, 36.18026759752763],
                [-115.23618537341171, 36.180319549055824],
                [-115.23618261740978, 36.18036717442975],
                [-115.23618117638654, 36.18041912982545],
                [-115.2361958179183, 36.18041914524308],
                [-115.23619438644577, 36.18046893756167],
                [-115.23619295327786, 36.180516593809216],
                [-115.23619152160241, 36.18056643119107],
                [-115.23618875108032, 36.18061734624244],
                [-115.23632981596866, 36.18062077454276],
                [-115.23633258643937, 36.18056985047485]
            ]],
        [[
                [-115.23657932815844, 36.17968142122321],
                [-115.23651411929491, 36.179680258934894],
                [-115.2365114017708, 36.179704072254324],
                [-115.23644885627627, 36.179703990185644],
                [-115.23644591403833, 36.17983929287941],
                [-115.23657633679484, 36.17984053595765],
                [-115.2367107522468, 36.17984394454598],
                [-115.23671236152083, 36.179710810103074],
                [-115.23664582810342, 36.17970748094652],
                [-115.23664587108127, 36.1796825873393],
                [-115.23657932815844, 36.17968142122321]
            ]
        ]
    ]);
});
define("examples/tests/geom/point", ["require", "exports", "openlayers"], function (require, exports, ol) {
    "use strict";
    return new ol.geom.Point([-115.2553, 36.1832]);
});
define("examples/tests/geom/polygon", ["require", "exports", "openlayers"], function (require, exports, ol) {
    "use strict";
    return new ol.geom.Polygon([
        [
            [-115.25532322799027, 36.18318333413792],
            [-115.25480456865377, 36.18318418316166],
            [-115.25480483306748, 36.1831581364999],
            [-115.25482974334876, 36.183156591542996],
            [-115.2548544229261, 36.18315172017415],
            [-115.25487928533187, 36.18314300077779],
            [-115.25490054503052, 36.18313174786991],
            [-115.25491924756955, 36.18311784715259],
            [-115.25493579649431, 36.183100506595494],
            [-115.25494767927427, 36.18308236911088],
            [-115.25495573195485, 36.18306290523016],
            [-115.2553212003638, 36.183064339787606],
            [-115.25532322799027, 36.18318333413792]
        ]
    ]);
});
define("examples/tests/geom/polyline", ["require", "exports", "openlayers"], function (require, exports, ol) {
    "use strict";
    return new ol.geom.MultiLineString([
        [
            [-115.25532322799027, 36.18318333413792],
            [-115.25480456865377, 36.18318418316166],
            [-115.25480483306748, 36.1831581364999],
            [-115.25482974334876, 36.183156591542996],
            [-115.2548544229261, 36.18315172017415],
            [-115.25487928533187, 36.18314300077779],
            [-115.25490054503052, 36.18313174786991],
            [-115.25491924756955, 36.18311784715259],
            [-115.25493579649431, 36.183100506595494],
            [-115.25494767927427, 36.18308236911088],
            [-115.25495573195485, 36.18306290523016],
            [-115.2553212003638, 36.183064339787606],
            [-115.25532322799027, 36.18318333413792]
        ]
    ]);
});
//# sourceMappingURL=examples.max.js.map