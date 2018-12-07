var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define("ol3-symbolizer/format/base", ["require", "exports"], function (require, exports) {
    "use strict";
});
define("ol3-symbolizer/format/ol3-symbolizer", ["require", "exports", "openlayers"], function (require, exports, ol) {
    "use strict";
    function doif(v, cb) {
        if (v !== undefined && v !== null)
            cb(v);
    }
    function mixin(a, b) {
        Object.keys(b).forEach(function (k) { return a[k] = b[k]; });
        return a;
    }
    var StyleConverter = (function () {
        function StyleConverter() {
        }
        StyleConverter.prototype.fromJson = function (json) {
            return this.deserializeStyle(json);
        };
        StyleConverter.prototype.toJson = function (style) {
            return this.serializeStyle(style);
        };
        StyleConverter.prototype.setGeometry = function (feature) {
            var geom = feature.getGeometry();
            if (geom instanceof ol.geom.Polygon) {
                geom = geom.getInteriorPoint();
            }
            return geom;
        };
        StyleConverter.prototype.assign = function (obj, prop, value) {
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
                    prop = "star";
                }
            }
            obj[prop] = value;
        };
        StyleConverter.prototype.serializeStyle = function (style) {
            var _this = this;
            var s = {};
            if (!style)
                return null;
            if (typeof style === "string")
                return style;
            if (typeof style === "number")
                return style;
            if (style.getColor)
                mixin(s, this.serializeColor(style.getColor()));
            if (style.getImage)
                this.assign(s, "image", this.serializeStyle(style.getImage()));
            if (style.getFill)
                this.assign(s, "fill", this.serializeFill(style.getFill()));
            if (style.getOpacity)
                this.assign(s, "opacity", style.getOpacity());
            if (style.getStroke)
                this.assign(s, "stroke", this.serializeStyle(style.getStroke()));
            if (style.getText)
                this.assign(s, "text", this.serializeStyle(style.getText()));
            if (style.getWidth)
                this.assign(s, "width", style.getWidth());
            if (style.getOffsetX)
                this.assign(s, "offset-x", style.getOffsetX());
            if (style.getOffsetY)
                this.assign(s, "offset-y", style.getOffsetY());
            if (style.getWidth)
                this.assign(s, "width", style.getWidth());
            if (style.getFont)
                this.assign(s, "font", style.getFont());
            if (style.getRadius)
                this.assign(s, "radius", style.getRadius());
            if (style.getRadius2)
                this.assign(s, "radius2", style.getRadius2());
            if (style.getPoints)
                this.assign(s, "points", style.getPoints());
            if (style.getAngle)
                this.assign(s, "angle", style.getAngle());
            if (style.getRotation)
                this.assign(s, "rotation", style.getRotation());
            if (style.getOrigin)
                this.assign(s, "origin", style.getOrigin());
            if (style.getScale)
                this.assign(s, "scale", style.getScale());
            if (style.getSize)
                this.assign(s, "size", style.getSize());
            if (style.getAnchor) {
                this.assign(s, "anchor", style.getAnchor());
                "anchorXUnits,anchorYUnits,anchorOrigin".split(",").forEach(function (k) {
                    _this.assign(s, k, style[k + "_"]);
                });
            }
            if (style.path) {
                if (style.path)
                    this.assign(s, "path", style.path);
                if (style.getImageSize)
                    this.assign(s, "imgSize", style.getImageSize());
                if (style.stroke)
                    this.assign(s, "stroke", style.stroke);
                if (style.fill)
                    this.assign(s, "fill", style.fill);
                if (style.scale)
                    this.assign(s, "scale", style.scale);
                if (style.imgSize)
                    this.assign(s, "imgSize", style.imgSize);
            }
            if (style.getSrc)
                this.assign(s, "src", style.getSrc());
            if (s.points && s.radius !== s.radius2)
                s.points /= 2;
            return s;
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
            image && s.setGeometry(function (feature) { return _this.setGeometry(feature); });
            return s;
        };
        StyleConverter.prototype.deserializeText = function (json) {
            json.rotation = json.rotation || 0;
            json.scale = json.scale || 1;
            var _a = [json["offset-x"] || 0, json["offset-y"] || 0], x = _a[0], y = _a[1];
            {
                var p = new ol.geom.Point([x, y]);
                p.rotate(json.rotation, [0, 0]);
                p.scale(json.scale, json.scale);
                _b = p.getCoordinates(), x = _b[0], y = _b[1];
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
            var _b;
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
            doif(json.rotation, function (v) { return image.setRotation(v); });
            doif(json.opacity, function (v) { return image.setOpacity(v); });
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
            return mixin(icon, {
                path: json.path,
                stroke: json.stroke,
                fill: json.fill,
                scale: json.scale,
                imgSize: json.imgSize
            });
            var _a;
        };
        StyleConverter.prototype.deserializeFill = function (json) {
            var fill = new ol.style.Fill({
                color: json && this.deserializeColor(json)
            });
            return fill;
        };
        StyleConverter.prototype.deserializeStroke = function (json) {
            var stroke = new ol.style.Stroke();
            doif(json.color, function (v) { return stroke.setColor(v); });
            doif(json.lineCap, function (v) { return stroke.setLineCap(v); });
            doif(json.lineDash, function (v) { return stroke.setLineDash(v); });
            doif(json.lineJoin, function (v) { return stroke.setLineJoin(v); });
            doif(json.miterLimit, function (v) { return stroke.setMiterLimit(v); });
            doif(json.width, function (v) { return stroke.setWidth(v); });
            return stroke;
        };
        StyleConverter.prototype.deserializeColor = function (fill) {
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
                    mixin(gradient_1, {
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
                var context = canvas.getContext('2d');
                context.fillStyle = fill.pattern.color;
                switch (fill.pattern.orientation) {
                    case "horizontal":
                        for (var i = 0; i < spacing; i++) {
                            context.fillRect(i, 0, 1, 1);
                        }
                        break;
                    case "vertical":
                        for (var i = 0; i < spacing; i++) {
                            context.fillRect(0, i, 1, 1);
                        }
                        break;
                    case "cross":
                        for (var i = 0; i < spacing; i++) {
                            context.fillRect(i, 0, 1, 1);
                            context.fillRect(0, i, 1, 1);
                        }
                        break;
                    case "forward":
                        for (var i = 0; i < spacing; i++) {
                            context.fillRect(i, i, 1, 1);
                        }
                        break;
                    case "backward":
                        for (var i = 0; i < spacing; i++) {
                            context.fillRect(spacing - 1 - i, i, 1, 1);
                        }
                        break;
                    case "diagonal":
                        for (var i = 0; i < spacing; i++) {
                            context.fillRect(i, i, 1, 1);
                            context.fillRect(spacing - 1 - i, i, 1, 1);
                        }
                        break;
                }
                return mixin(context.createPattern(canvas, repitition), fill.pattern);
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
            mixin(gradient, {
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
            mixin(gradient, {
                type: "radial(" + [x0, y0, r0, x1, y1, r1].join(",") + ")"
            });
            return gradient;
        };
        return StyleConverter;
    }());
    exports.StyleConverter = StyleConverter;
});
define("ol3-symbolizer", ["require", "exports", "ol3-symbolizer/format/ol3-symbolizer"], function (require, exports, Symbolizer) {
    "use strict";
    return Symbolizer;
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
        Ajax.prototype["delete"] = function (args) {
            return this.ajax('DELETE', args);
        };
        return Ajax;
    }());
    return Ajax;
});
define("ol3-symbolizer/ags/ags-catalog", ["require", "exports", "ol3-symbolizer/common/ajax"], function (require, exports, Ajax) {
    "use strict";
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
    var Catalog = (function () {
        function Catalog(url) {
            this.ajax = new Ajax(url);
        }
        Catalog.prototype.about = function (data) {
            var req = defaults({
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
            return defaults(ajax.jsonp(req), { url: ajax.url });
        };
        Catalog.prototype.aboutMapServer = function (name) {
            var ajax = new Ajax(this.ajax.url + "/" + name + "/MapServer");
            var req = {
                f: "pjson"
            };
            return defaults(ajax.jsonp(req), { url: ajax.url });
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
define("ol3-symbolizer/format/ags-symbolizer", ["require", "exports", "jquery", "ol3-symbolizer/format/ol3-symbolizer"], function (require, exports, $, Symbolizer) {
    "use strict";
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
        "esriSFSForwardDiagonal": "forward-diagonal"
    };
    var typeMap = {
        "esriSMS": "sms",
        "esriSLS": "sls",
        "esriSFS": "sfs",
        "esriPMS": "pms",
        "esriPFS": "pfs",
        "esriTS": "txt"
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
        StyleConverter.prototype.fromSFS = function (symbol, style) {
            switch (symbol.style) {
                case "esriSFSSolid":
                    this.fromSFSSolid(symbol, style);
                    break;
                case "esriSFSForwardDiagonal":
                    this.fromSFSSolid(symbol, style);
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
                    color: this.asColor(symbol.outline.color)
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
            throw "not-implemented";
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
                                                var json = $.extend({}, classBreakInfo.symbol);
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
define("ol3-symbolizer/common/common", ["require", "exports"], function (require, exports) {
    "use strict";
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
    function defaults(a, b) {
        Object.keys(b).filter(function (k) { return a[k] == undefined; }).forEach(function (k) { return a[k] = b[k]; });
        return a;
    }
    exports.defaults = defaults;
    function cssin(name, css) {
        var id = "style-" + name;
        var styleTag = document.getElementById(id);
        if (!styleTag) {
            styleTag = document.createElement("style");
            styleTag.id = id;
            styleTag.innerText = css;
            document.head.appendChild(styleTag);
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
});
define("ol3-symbolizer/ags/ags-source", ["require", "exports", "jquery", "openlayers", "ol3-symbolizer/ags/ags-catalog", "ol3-symbolizer/format/ags-symbolizer", "ol3-symbolizer/common/common"], function (require, exports, $, ol, AgsCatalog, Symbolizer, common_1) {
    "use strict";
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
        where: "1=1"
    };
    var ArcGisVectorSourceFactory = (function () {
        function ArcGisVectorSourceFactory() {
        }
        ArcGisVectorSourceFactory.create = function (options) {
            var d = $.Deferred();
            options = common_1.defaults(options, DEFAULT_OPTIONS);
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
                        outFields: "*"
                    };
                    var query = options.services + "/" + options.serviceName + "/FeatureServer/" + layerId + "/query?" + asParam(params);
                    $.ajax({
                        url: query,
                        dataType: 'jsonp',
                        success: function (response) {
                            if (response.error) {
                                alert(response.error.message + '\n' +
                                    response.error.details.join('\n'));
                            }
                            else {
                                var features = esrijsonFormat.readFeatures(response, {
                                    featureProjection: projection,
                                    dataProjection: projection
                                });
                                if (features.length > 0) {
                                    source.addFeatures(features);
                                }
                            }
                        }
                    });
                };
                var source = new ol.source.Vector({
                    strategy: strategy,
                    loader: loader
                });
                var catalog = new AgsCatalog.Catalog(options.services + "/" + options.serviceName + "/FeatureServer");
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
define("bower_components/ol3-popup/ol3-popup/paging/paging", ["require", "exports", "openlayers"], function (require, exports, ol) {
    "use strict";
    function getInteriorPoint(geom) {
        if (geom["getInteriorPoint"])
            return geom["getInteriorPoint"]().getCoordinates();
        return ol.extent.getCenter(geom.getExtent());
    }
    var classNames = {
        pages: "pages",
        page: "page"
    };
    var eventNames = {
        add: "add",
        clear: "clear",
        goto: "goto"
    };
    var Paging = (function () {
        function Paging(options) {
            this.options = options;
            this._pages = [];
            this.domNode = document.createElement("div");
            this.domNode.classList.add(classNames.pages);
            options.popup.domNode.appendChild(this.domNode);
        }
        Object.defineProperty(Paging.prototype, "activePage", {
            get: function () {
                return this._pages[this._activeIndex];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Paging.prototype, "activeIndex", {
            get: function () {
                return this._activeIndex;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Paging.prototype, "count", {
            get: function () {
                return this._pages.length;
            },
            enumerable: true,
            configurable: true
        });
        Paging.prototype.dispatch = function (name) {
            this.domNode.dispatchEvent(new Event(name));
        };
        Paging.prototype.on = function (name, listener) {
            this.domNode.addEventListener(name, listener);
        };
        Paging.prototype.add = function (source, geom) {
            if (false) {
            }
            else if (typeof source === "string") {
                var page = document.createElement("div");
                page.innerHTML = source;
                this._pages.push({
                    element: page,
                    location: geom
                });
            }
            else if (source["appendChild"]) {
                var page = source;
                page.classList.add(classNames.page);
                this._pages.push({
                    element: page,
                    location: geom
                });
            }
            else if (source["then"]) {
                var d = source;
                var page_1 = document.createElement("div");
                page_1.classList.add(classNames.page);
                this._pages.push({
                    element: page_1,
                    location: geom
                });
                $.when(d).then(function (v) {
                    if (typeof v === "string") {
                        page_1.innerHTML = v;
                    }
                    else {
                        page_1.appendChild(v);
                    }
                });
            }
            else if (typeof source === "function") {
                var page = document.createElement("div");
                page.classList.add("page");
                this._pages.push({
                    callback: source,
                    element: page,
                    location: geom
                });
            }
            else {
                throw "invalid source value: " + source;
            }
            this.dispatch(eventNames.add);
        };
        Paging.prototype.clear = function () {
            var activeChild = this._activeIndex >= 0 && this._pages[this._activeIndex];
            this._activeIndex = -1;
            this._pages = [];
            if (activeChild) {
                this.domNode.removeChild(activeChild.element);
                this.dispatch(eventNames.clear);
            }
        };
        Paging.prototype.goto = function (index) {
            var _this = this;
            var page = this._pages[index];
            if (!page)
                return;
            var activeChild = this._activeIndex >= 0 && this._pages[this._activeIndex];
            var d = $.Deferred();
            if (page.callback) {
                var refreshedContent = page.callback();
                $.when(refreshedContent).then(function (v) {
                    if (false) {
                    }
                    else if (typeof v === "string") {
                        page.element.innerHTML = v;
                    }
                    else if (typeof v["innerHTML"] !== "undefined") {
                        page.element.innerHTML = "";
                        page.element.appendChild(v);
                    }
                    else {
                        throw "invalid callback result: " + v;
                    }
                    d.resolve();
                });
            }
            else {
                d.resolve();
            }
            d.then(function () {
                activeChild && activeChild.element.remove();
                _this._activeIndex = index;
                _this.domNode.appendChild(page.element);
                if (page.location) {
                    _this.options.popup.setPosition(getInteriorPoint(page.location));
                }
                _this.dispatch(eventNames.goto);
            });
        };
        Paging.prototype.next = function () {
            (0 <= this.activeIndex) && (this.activeIndex < this.count) && this.goto(this.activeIndex + 1);
        };
        Paging.prototype.prev = function () {
            (0 < this.activeIndex) && this.goto(this.activeIndex - 1);
        };
        return Paging;
    }());
    exports.Paging = Paging;
});
define("bower_components/ol3-popup/ol3-popup/paging/page-navigator", ["require", "exports"], function (require, exports) {
    "use strict";
    var classNames = {
        prev: 'btn-prev',
        next: 'btn-next',
        hidden: 'hidden',
        active: 'active',
        inactive: 'inactive',
        pagenum: "page-num"
    };
    var eventNames = {
        show: "show",
        hide: "hide",
        prev: "prev",
        next: "next"
    };
    var PageNavigator = (function () {
        function PageNavigator(options) {
            var _this = this;
            this.options = options;
            var pages = options.pages;
            this.domNode = document.createElement("div");
            this.domNode.classList.add("pagination");
            this.domNode.innerHTML = this.template();
            this.prevButton = this.domNode.getElementsByClassName(classNames.prev)[0];
            this.nextButton = this.domNode.getElementsByClassName(classNames.next)[0];
            this.pageInfo = this.domNode.getElementsByClassName(classNames.pagenum)[0];
            pages.options.popup.domNode.appendChild(this.domNode);
            this.prevButton.addEventListener('click', function () { return _this.dispatch(eventNames.prev); });
            this.nextButton.addEventListener('click', function () { return _this.dispatch(eventNames.next); });
            pages.on("goto", function () { return pages.count > 1 ? _this.show() : _this.hide(); });
            pages.on("clear", function () { return _this.hide(); });
            pages.on("goto", function () {
                var index = pages.activeIndex;
                var count = pages.count;
                var canPrev = 0 < index;
                var canNext = count - 1 > index;
                _this.prevButton.classList.toggle(classNames.inactive, !canPrev);
                _this.prevButton.classList.toggle(classNames.active, canPrev);
                _this.nextButton.classList.toggle(classNames.inactive, !canNext);
                _this.nextButton.classList.toggle(classNames.active, canNext);
                _this.prevButton.disabled = !canPrev;
                _this.nextButton.disabled = !canNext;
                _this.pageInfo.innerHTML = 1 + index + " of " + count;
            });
        }
        PageNavigator.prototype.dispatch = function (name) {
            this.domNode.dispatchEvent(new Event(name));
        };
        PageNavigator.prototype.on = function (name, listener) {
            this.domNode.addEventListener(name, listener);
        };
        PageNavigator.prototype.template = function () {
            return "<button class=\"arrow btn-prev\"></button><span class=\"page-num\">m of n</span><button class=\"arrow btn-next\"></button>";
        };
        PageNavigator.prototype.hide = function () {
            this.domNode.classList.add(classNames.hidden);
            this.dispatch(eventNames.hide);
        };
        PageNavigator.prototype.show = function () {
            this.domNode.classList.remove(classNames.hidden);
            this.dispatch(eventNames.show);
        };
        return PageNavigator;
    }());
    return PageNavigator;
});
define("bower_components/ol3-popup/ol3-popup/ol3-popup", ["require", "exports", "jquery", "openlayers", "bower_components/ol3-popup/ol3-popup/paging/paging", "bower_components/ol3-popup/ol3-popup/paging/page-navigator"], function (require, exports, $, ol, paging_1, PageNavigator) {
    "use strict";
    var css = "\n.ol-popup {\n    position: absolute;\n    bottom: 12px;\n    left: -50px;\n}\n\n.ol-popup:after {\n    top: auto;\n    bottom: -20px;\n    left: 50px;\n    border: solid transparent;\n    border-top-color: inherit;\n    content: \" \";\n    height: 0;\n    width: 0;\n    position: absolute;\n    pointer-events: none;\n    border-width: 10px;\n    margin-left: -10px;\n}\n\n.ol-popup.docked {\n    position:absolute;\n    bottom:0;\n    top:0;\n    left:0;\n    right:0;\n    width:auto;\n    height:auto;\n    pointer-events: all;\n}\n\n.ol-popup.docked:after {\n    display:none;\n}\n\n.ol-popup.docked .pages {\n    max-height: inherit;\n    overflow: auto;\n    height: calc(100% - 60px);\n}\n\n.ol-popup.docked .pagination {\n    position: absolute;\n    bottom: 0;\n}\n\n.ol-popup .pagination .btn-prev::after {\n    content: \"\u21E6\"; \n}\n\n.ol-popup .pagination .btn-next::after {\n    content: \"\u21E8\"; \n}\n\n.ol-popup .pagination.hidden {\n    display: none;\n}\n\n.ol-popup .ol-popup-closer {\n    border: none;\n    background: transparent;\n    color: inherit;\n    position: absolute;\n    top: 0;\n    right: 0;\n    text-decoration: none;\n}\n    \n.ol-popup .ol-popup-closer:after {\n    content:'\u2716';\n}\n\n.ol-popup .ol-popup-docker {\n    border: none;\n    background: transparent;\n    color: inherit;\n    text-decoration: none;\n    position: absolute;\n    top: 0;\n    right: 20px;\n}\n\n.ol-popup .ol-popup-docker:after {\n    content:'\u25A1';\n}\n";
    var classNames = {
        olPopup: 'ol-popup',
        olPopupDocker: 'ol-popup-docker',
        olPopupCloser: 'ol-popup-closer',
        olPopupContent: 'ol-popup-content',
        hidden: 'hidden',
        docked: 'docked'
    };
    var eventNames = {
        show: "show",
        hide: "hide"
    };
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
    function debounce(func, wait, immediate) {
        var _this = this;
        if (wait === void 0) { wait = 20; }
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
                    func.call(_this, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow)
                func.call(_this, args);
        });
    }
    var isTouchDevice = function () {
        try {
            document.createEvent("TouchEvent");
            isTouchDevice = function () { return true; };
        }
        catch (e) {
            isTouchDevice = function () { return false; };
        }
        return isTouchDevice();
    };
    function enableTouchScroll(elm) {
        var scrollStartPos = 0;
        elm.addEventListener("touchstart", function (event) {
            scrollStartPos = this.scrollTop + event.touches[0].pageY;
        }, false);
        elm.addEventListener("touchmove", function (event) {
            this.scrollTop = scrollStartPos - event.touches[0].pageY;
        }, false);
    }
    ;
    var DEFAULT_OPTIONS = {
        insertFirst: true,
        autoPan: true,
        autoPanAnimation: {
            source: null,
            duration: 250
        },
        pointerPosition: 50,
        xOffset: 0,
        yOffset: 0,
        positioning: "top-right",
        stopEvent: true
    };
    var Popup = (function (_super) {
        __extends(Popup, _super);
        function Popup(options) {
            if (options === void 0) { options = DEFAULT_OPTIONS; }
            var _this = this;
            options = defaults({}, options, DEFAULT_OPTIONS);
            _this = _super.call(this, options) || this;
            _this.options = options;
            _this.handlers = [];
            _this.postCreate();
            return _this;
        }
        Popup.prototype.postCreate = function () {
            var _this = this;
            this.injectCss(css);
            var options = this.options;
            options.css && this.injectCss(options.css);
            var domNode = this.domNode = document.createElement('div');
            domNode.className = classNames.olPopup;
            this.setElement(domNode);
            if (typeof this.options.pointerPosition === "number") {
                this.setIndicatorPosition(this.options.pointerPosition);
            }
            if (this.options.dockContainer) {
                var dockContainer = $(this.options.dockContainer)[0];
                if (dockContainer) {
                    var docker = this.docker = document.createElement('label');
                    docker.className = classNames.olPopupDocker;
                    domNode.appendChild(docker);
                    docker.addEventListener('click', function (evt) {
                        _this.isDocked() ? _this.undock() : _this.dock();
                        evt.preventDefault();
                    }, false);
                }
            }
            {
                var closer = this.closer = document.createElement('label');
                closer.className = classNames.olPopupCloser;
                domNode.appendChild(closer);
                closer.addEventListener('click', function (evt) {
                    _this.hide();
                    evt.preventDefault();
                }, false);
            }
            {
                var content = this.content = document.createElement('div');
                content.className = classNames.olPopupContent;
                this.domNode.appendChild(content);
                isTouchDevice() && enableTouchScroll(content);
            }
            {
                var pages_1 = this.pages = new paging_1.Paging({ popup: this });
                var pageNavigator = new PageNavigator({ pages: pages_1 });
                pageNavigator.hide();
                pageNavigator.on("prev", function () { return pages_1.prev(); });
                pageNavigator.on("next", function () { return pages_1.next(); });
                pages_1.on("goto", function () { return _this.panIntoView(); });
            }
            if (0) {
                var callback_1 = this.setPosition;
                this.setPosition = debounce(function (args) { return callback_1.apply(_this, args); }, 50);
            }
        };
        Popup.prototype.injectCss = function (css) {
            var style = $("<style type='text/css'>" + css + "</style>");
            style.appendTo('head');
            this.handlers.push(function () { return style.remove(); });
        };
        Popup.prototype.setIndicatorPosition = function (offset) {
            var _this = this;
            var _a = this.getPositioning().split("-", 2), verticalPosition = _a[0], horizontalPosition = _a[1];
            var css = [];
            switch (verticalPosition) {
                case "bottom":
                    css.push(".ol-popup { top: " + (10 + this.options.yOffset) + "px; bottom: auto; }");
                    css.push(".ol-popup:after {  top: -20px; bottom: auto; transform: rotate(180deg);}");
                    break;
                case "center":
                    break;
                case "top":
                    css.push(".ol-popup { top: auto; bottom: " + (10 + this.options.yOffset) + "px; }");
                    css.push(".ol-popup:after {  top: auto; bottom: -20px; transform: rotate(0deg);}");
                    break;
            }
            switch (horizontalPosition) {
                case "center":
                    break;
                case "left":
                    css.push(".ol-popup { left: auto; right: " + (this.options.xOffset - offset - 10) + "px; }");
                    css.push(".ol-popup:after { left: auto; right: " + offset + "px; }");
                    break;
                case "right":
                    css.push(".ol-popup { left: " + (this.options.xOffset - offset - 10) + "px; right: auto; }");
                    css.push(".ol-popup:after { left: " + (10 + offset) + "px; right: auto; }");
                    break;
            }
            css.forEach(function (css) { return _this.injectCss(css); });
        };
        Popup.prototype.setPosition = function (position) {
            this.options.position = position;
            if (!this.isDocked()) {
                _super.prototype.setPosition.call(this, position);
            }
            else {
                var view = this.options.map.getView();
                view.animate({
                    center: position
                });
            }
        };
        Popup.prototype.panIntoView = function () {
            if (!this.isOpened())
                return;
            if (this.isDocked())
                return;
            var p = this.getPosition();
            p && this.setPosition(p.map(function (v) { return v; }));
        };
        Popup.prototype.destroy = function () {
            this.handlers.forEach(function (h) { return h(); });
            this.handlers = [];
            this.getMap().removeOverlay(this);
            this.dispatch("dispose");
        };
        Popup.prototype.dispatch = function (name) {
            this["dispatchEvent"](new Event(name));
        };
        Popup.prototype.show = function (coord, html) {
            if (html instanceof HTMLElement) {
                this.content.innerHTML = "";
                this.content.appendChild(html);
            }
            else {
                this.content.innerHTML = html;
            }
            this.domNode.classList.remove(classNames.hidden);
            this.setPosition(coord);
            this.dispatch(eventNames.show);
            return this;
        };
        Popup.prototype.hide = function () {
            this.isDocked() && this.undock();
            this.setPosition(undefined);
            this.pages.clear();
            this.dispatch(eventNames.hide);
            this.domNode.classList.add(classNames.hidden);
            return this;
        };
        Popup.prototype.isOpened = function () {
            return !this.domNode.classList.contains(classNames.hidden);
        };
        Popup.prototype.isDocked = function () {
            return this.domNode.classList.contains(classNames.docked);
        };
        Popup.prototype.dock = function () {
            var map = this.getMap();
            this.options.map = map;
            this.options.parentNode = this.domNode.parentElement;
            map.removeOverlay(this);
            this.domNode.classList.add(classNames.docked);
            $(this.options.dockContainer).append(this.domNode);
        };
        Popup.prototype.undock = function () {
            this.options.parentNode.appendChild(this.domNode);
            this.domNode.classList.remove(classNames.docked);
            this.options.map.addOverlay(this);
            this.setPosition(this.options.position);
        };
        Popup.prototype.applyOffset = function (_a) {
            var x = _a[0], y = _a[1];
            switch (this.getPositioning()) {
                case "bottom-left":
                    this.setOffset([x, -y]);
                    break;
                case "bottom-right":
                    this.setOffset([-x, -y]);
                    break;
                case "top-left":
                    this.setOffset([x, y]);
                    break;
                case "top-right":
                    this.setOffset([-x, y]);
                    break;
            }
        };
        return Popup;
    }(ol.Overlay));
    exports.Popup = Popup;
});
define("bower_components/ol3-popup/ol3-popup", ["require", "exports", "bower_components/ol3-popup/ol3-popup/ol3-popup"], function (require, exports, Popup) {
    "use strict";
    return Popup;
});
define("ol3-symbolizer/labs/ags-viewer", ["require", "exports", "jquery", "openlayers", "ol3-symbolizer/common/common", "bower_components/ol3-popup/ol3-popup", "ol3-symbolizer/ags/ags-source"], function (require, exports, $, ol, common_2, ol3_popup_1, ags_source_1) {
    "use strict";
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
        $(html).appendTo(".map");
        $(css).appendTo("head");
        var options = {
            srs: 'EPSG:4326',
            center: center.vegas,
            zoom: 10,
            services: "//sampleserver3.arcgisonline.com/ArcGIS/rest/services",
            serviceName: "SanFrancisco/311Incidents",
            where: "1=1",
            filter: {},
            layers: [0]
        };
        {
            var opts_1 = options;
            Object.keys(opts_1).forEach(function (k) {
                common_2.doif(common_2.getParameterByName(k), function (v) {
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
            where: options.where,
            layers: options.layers.reverse()
        }).then(function (agsLayers) {
            agsLayers.forEach(function (agsLayer) { return map.addLayer(agsLayer); });
            var popup = new ol3_popup_1.Popup({
                css: "\n            .ol-popup {\n                background-color: white;\n            }\n            .ol-popup .page {\n                max-height: 200px;\n                overflow-y: auto;\n            }\n            "
            });
            map.addOverlay(popup);
            map.on("click", function (event) {
                console.log("click");
                var coord = event.coordinate;
                popup.hide();
                var pageNum = 0;
                map.forEachFeatureAtPixel(event.pixel, function (feature, layer) {
                    var page = document.createElement('p');
                    var keys = Object.keys(feature.getProperties()).filter(function (key) {
                        var v = feature.get(key);
                        if (typeof v === "string")
                            return true;
                        if (typeof v === "number")
                            return true;
                        return false;
                    });
                    page.title = "" + ++pageNum;
                    page.innerHTML = "<table>" + keys.map(function (k) { return "<tr><td>" + k + "</td><td>" + feature.get(k) + "</td></tr>"; }).join("") + "</table>";
                    popup.pages.add(page, feature.getGeometry());
                });
                popup.show(coord, "<label>" + pageNum + " Features Found</label>");
                popup.pages.goto(0);
            });
        });
        return map;
    }
    exports.run = run;
});
define("ol3-symbolizer/labs/index", ["require", "exports"], function (require, exports) {
    "use strict";
    function run() {
        var l = window.location;
        var path = "" + l.origin + l.pathname + "?run=ol3-symbolizer/labs/";
        var labs = "    \n  index\n  ags-viewer\n  ags-viewer&services=//sampleserver3.arcgisonline.com/ArcGIS/rest/services&serviceName=SanFrancisco/311Incidents&layers=0&center=-122.49,37.738\n  ags-viewer&services=//sampleserver3.arcgisonline.com/ArcGIS/rest/services&serviceName=Fire/Sheep&layers=0,1,2&center=-117.9,34.35\n  ags-viewer&services=//sampleserver3.arcgisonline.com/ArcGIS/rest/services&serviceName=HomelandSecurity/operations&layers=0,1,2&center=-117.2,32.7\n  ags-viewer&services=//sampleserver3.arcgisonline.com/ArcGIS/rest/services&serviceName=Hydrography/Watershed173811&layers=0,1&center=-96.53,38.37\n  ags-viewer&services=//sampleserver3.arcgisonline.com/ArcGIS/rest/services&serviceName=Petroleum/KSFields&layers=0&center=-98.93,38.55\n\n  ags-viewer&services=//usgvl-shotgun02:6080/arcgis/rest/services&serviceName=Annotations/H840_ANNOTATIONS5&layers=3&center=-115.3,36.1&where=H8REGION=%27GREEN%27\n  ags-viewer&services=//usgvl-shotgun02:6080/arcgis/rest/services&serviceName=Annotations/H840_ANNOTATIONS5&layers=3&center=-115.3,36.1&where=H8REGION%20IN(%27RED%27,%27GREEN%27)\n\n    ";
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
        var testDiv = document.createElement("div");
        document.body.appendChild(testDiv);
        testDiv.innerHTML = "<a href='" + l.origin + l.pathname + "?run=ol3-symbolizer/tests/index'>tests</a>";
    }
    exports.run = run;
    ;
});
define("ol3-symbolizer/styles/ags/cartographiclinesymbol", ["require", "exports"], function (require, exports) {
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
define("ol3-symbolizer/styles/ags/picturefillsymbol", ["require", "exports"], function (require, exports) {
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
define("ol3-symbolizer/styles/ags/picturemarkersymbol-imagedata", ["require", "exports"], function (require, exports) {
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
define("ol3-symbolizer/styles/ags/picturemarkersymbol", ["require", "exports"], function (require, exports) {
    "use strict";
    return [
        {
            "angle": 0,
            "xoffset": 0,
            "yoffset": 0,
            "type": "esriPMS",
            "url": "https://cdn.jsdelivr.net/gh/mapbox/maki/icons/aerialway-11.svg",
            "width": 30,
            "height": 30
        }
    ];
});
define("ol3-symbolizer/styles/ags/simplefillsymbol", ["require", "exports"], function (require, exports) {
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
define("ol3-symbolizer/styles/ags/simplemarkersymbol-circle", ["require", "exports"], function (require, exports) {
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
define("ol3-symbolizer/styles/ags/simplemarkersymbol-cross", ["require", "exports"], function (require, exports) {
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
define("ol3-symbolizer/styles/ags/simplemarkersymbol-diamond", ["require", "exports"], function (require, exports) {
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
define("ol3-symbolizer/styles/ags/simplemarkersymbol-path", ["require", "exports"], function (require, exports) {
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
define("ol3-symbolizer/styles/ags/simplemarkersymbol-square", ["require", "exports"], function (require, exports) {
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
define("ol3-symbolizer/styles/ags/simplemarkersymbol-x", ["require", "exports"], function (require, exports) {
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
define("ol3-symbolizer/styles/ags/textsymbol", ["require", "exports"], function (require, exports) {
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
define("ol3-symbolizer/styles/basic", ["require", "exports"], function (require, exports) {
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
define("ol3-symbolizer/styles/circle/alert", ["require", "exports"], function (require, exports) {
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
define("ol3-symbolizer/styles/circle/gradient", ["require", "exports"], function (require, exports) {
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
define("ol3-symbolizer/styles/fill/cross", ["require", "exports"], function (require, exports) {
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
define("ol3-symbolizer/styles/fill/diagonal", ["require", "exports"], function (require, exports) {
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
define("ol3-symbolizer/styles/fill/gradient", ["require", "exports"], function (require, exports) {
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
define("ol3-symbolizer/styles/fill/horizontal", ["require", "exports"], function (require, exports) {
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
define("ol3-symbolizer/styles/fill/vertical", ["require", "exports"], function (require, exports) {
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
define("ol3-symbolizer/styles/icon/png", ["require", "exports"], function (require, exports) {
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
define("ol3-symbolizer/styles/icon/svg", ["require", "exports"], function (require, exports) {
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
define("ol3-symbolizer/styles/peace", ["require", "exports"], function (require, exports) {
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
define("ol3-symbolizer/styles/star/4star", ["require", "exports"], function (require, exports) {
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
define("ol3-symbolizer/styles/star/6star", ["require", "exports"], function (require, exports) {
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
define("ol3-symbolizer/styles/star/cold", ["require", "exports"], function (require, exports) {
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
define("ol3-symbolizer/styles/star/flower", ["require", "exports"], function (require, exports) {
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
define("ol3-symbolizer/styles/stroke/linedash", ["require", "exports"], function (require, exports) {
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
define("ol3-symbolizer/styles/stroke/dash", ["require", "exports", "ol3-symbolizer/styles/stroke/linedash"], function (require, exports, Dashes) {
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
define("ol3-symbolizer/styles/stroke/dashdotdot", ["require", "exports", "ol3-symbolizer/styles/stroke/linedash"], function (require, exports, Dashes) {
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
define("ol3-symbolizer/styles/stroke/dot", ["require", "exports", "ol3-symbolizer/styles/stroke/linedash"], function (require, exports, Dashes) {
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
define("ol3-symbolizer/styles/stroke/solid", ["require", "exports"], function (require, exports) {
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
define("ol3-symbolizer/styles/text/text", ["require", "exports"], function (require, exports) {
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
define("ol3-symbolizer/tests/index", ["require", "exports"], function (require, exports) {
    "use strict";
    function run() {
        var l = window.location;
        var path = "" + l.origin + l.pathname + "?run=ol3-symbolizer/tests/";
        var labs = "\n    index\n    ";
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
//# sourceMappingURL=index.js.map