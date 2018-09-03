define("ol3-symbolizer/common/assign", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
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
    exports.__esModule = true;
    function mixin(a, b) {
        Object.keys(b).forEach(function (k) { return a[k] = b[k]; });
        return a;
    }
    exports.mixin = mixin;
});
define("ol3-symbolizer/common/defaults", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
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
define("tests/base", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    function describe(title, cb) {
        console.log(title || "undocumented test group");
        return window.describe(title, cb);
    }
    exports.describe = describe;
    function it(title, cb) {
        console.log(title || "undocumented test");
        return window.it(title, cb);
    }
    exports.it = it;
    function should(result, message) {
        console.log(message || "undocumented assertion");
        if (!result)
            throw message;
    }
    exports.should = should;
    function shouldEqual(a, b, message) {
        if (a != b)
            console.warn(a, b);
        should(a == b, message);
    }
    exports.shouldEqual = shouldEqual;
    function stringify(o) {
        return JSON.stringify(o, null, "\t");
    }
    exports.stringify = stringify;
});
define("tests/common", ["require", "exports", "ol3-symbolizer/common/assign", "ol3-symbolizer/common/mixin", "ol3-symbolizer/common/defaults", "tests/base"], function (require, exports, assign_1, mixin_1, defaults_1, base_1) {
    "use strict";
    exports.__esModule = true;
    describe("assign tests", function () {
        it("assign empty", function () {
        });
        it("assign number", function () {
            var target = {};
            assign_1.assign(target, "a", 100);
            base_1.should(target.a === 100, "");
        });
        it("assign object", function () {
            var target = {};
            assign_1.assign(target, "a", { "a": 100 });
            base_1.should(target.a.a === 100, "");
        });
    });
    describe("defaults tests", function () {
        it("defaults number", function () {
            base_1.should(defaults_1.defaults({}, { a: 100 }).a === 100, "");
            base_1.should(defaults_1.defaults(defaults_1.defaults({}, { a: 100 }), { a: 200 }).a === 100, "");
            var a = defaults_1.defaults({}, { a: 1 });
            base_1.should(a === defaults_1.defaults(a, { a: 2 }), "");
        });
    });
    describe("mixin tests", function () {
        it("mixin number", function () {
            base_1.should(mixin_1.mixin({}, { a: 100 }).a === 100, "");
            base_1.should(mixin_1.mixin(mixin_1.mixin({}, { a: 100 }), { a: 200 }).a === 200, "");
            var a = mixin_1.mixin({}, { a: 1 });
            base_1.should(a === mixin_1.mixin(a, { a: 2 }), "");
        });
    });
    describe("test accessing openlayers using amd", function () {
        it("log ol.style.Style", function () {
            require(["openlayers"], function (ol) {
                var style = ol.style.Style;
                base_1.should(!!style, "");
                console.log(style.toString());
            });
        });
    });
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
define("ol3-symbolizer/common/doif", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    function doif(v, cb) {
        if (v !== undefined && v !== null)
            cb(v);
    }
    exports.doif = doif;
});
define("ol3-symbolizer/format/plugins/as-cross", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
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
                    stroke: star.stroke
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
                    stroke: cross.stroke
                }
            };
        };
        return Shapeshifter;
    }());
    exports.Shapeshifter = Shapeshifter;
});
define("ol3-symbolizer/format/plugins/as-square", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
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
                    stroke: star.stroke
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
                    stroke: square.stroke
                }
            };
        };
        return Shapeshifter;
    }());
    exports.Shapeshifter = Shapeshifter;
});
define("ol3-symbolizer/format/plugins/as-diamond", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
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
                    stroke: star.stroke
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
                    stroke: diamond.stroke
                }
            };
        };
        return Shapeshifter;
    }());
    exports.Shapeshifter = Shapeshifter;
});
define("ol3-symbolizer/format/plugins/as-triangle", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
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
                    stroke: star.stroke
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
                    stroke: triangle.stroke
                }
            };
        };
        return Shapeshifter;
    }());
    exports.Shapeshifter = Shapeshifter;
});
define("ol3-symbolizer/format/plugins/as-x", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
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
                    stroke: star.stroke
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
                    stroke: x.stroke
                }
            };
        };
        return Shapeshifter;
    }());
    exports.Shapeshifter = Shapeshifter;
});
define("ol3-symbolizer/format/ol3-symbolizer", ["require", "exports", "openlayers", "ol3-symbolizer/common/assign", "ol3-symbolizer/common/mixin", "ol3-symbolizer/common/doif", "ol3-symbolizer/format/plugins/as-cross", "ol3-symbolizer/format/plugins/as-square", "ol3-symbolizer/format/plugins/as-diamond", "ol3-symbolizer/format/plugins/as-triangle", "ol3-symbolizer/format/plugins/as-x"], function (require, exports, ol, assign_2, mixin_2, doif_1, as_cross_1, as_square_1, as_diamond_1, as_triangle_1, as_x_1) {
    "use strict";
    exports.__esModule = true;
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
                mixin_2.mixin(s, this.serializeColor(style.getColor()));
            if (style.getImage)
                assign_2.assign(s, "image", this.serializeImage(style.getImage()));
            if (style.getFill)
                assign_2.assign(s, "fill", this.serializeFill(style.getFill()));
            if (style.getOpacity)
                assign_2.assign(s, "opacity", style.getOpacity());
            if (style.getStroke)
                assign_2.assign(s, "stroke", this.serializeStroke(style.getStroke()));
            if (style.getText)
                assign_2.assign(s, "text", this.serializeText(style.getText()));
            if (style.getWidth)
                assign_2.assign(s, "width", style.getWidth());
            if (style.getOffsetX)
                assign_2.assign(s, "offset-x", style.getOffsetX());
            if (style.getOffsetY)
                assign_2.assign(s, "offset-y", style.getOffsetY());
            if (style.getWidth)
                assign_2.assign(s, "width", style.getWidth());
            if (style.getFont)
                assign_2.assign(s, "font", style.getFont());
            if (style.getRadius)
                assign_2.assign(s, "radius", style.getRadius());
            if (style.getRadius2)
                assign_2.assign(s, "radius2", style.getRadius2());
            if (style.getPoints)
                assign_2.assign(s, "points", style.getPoints());
            if (style.getAngle)
                assign_2.assign(s, "angle", style.getAngle());
            if (style.getRotation)
                assign_2.assign(s, "rotation", style.getRotation());
            if (style.getOrigin)
                assign_2.assign(s, "origin", style.getOrigin());
            if (style.getScale)
                assign_2.assign(s, "scale", style.getScale());
            if (style.getSize)
                assign_2.assign(s, "size", style.getSize());
            if (style.getAnchor) {
                assign_2.assign(s, "anchor", style.getAnchor());
                "anchorXUnits,anchorYUnits,anchorOrigin".split(",").forEach(function (k) {
                    assign_2.assign(s, k, style[k + "_"]);
                });
            }
            if (style.path) {
                if (style.path)
                    assign_2.assign(s, "path", style.path);
                if (style.getImageSize)
                    assign_2.assign(s, "imgSize", style.getImageSize());
                if (style.stroke)
                    assign_2.assign(s, "stroke", style.stroke);
                if (style.fill)
                    assign_2.assign(s, "fill", style.fill);
                if (style.scale)
                    assign_2.assign(s, "scale", style.scale);
                if (style.imgSize)
                    assign_2.assign(s, "imgSize", style.imgSize);
            }
            if (style.getSrc)
                assign_2.assign(s, "src", style.getSrc());
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
            return mixin_2.mixin(icon, {
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
                    mixin_2.mixin(gradient_1, {
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
                return mixin_2.mixin(context_1.createPattern(canvas, repitition), fill.pattern);
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
            mixin_2.mixin(gradient, {
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
            mixin_2.mixin(gradient, {
                type: "radial(" + [x0, y0, r0, x1, y1, r1].join(",") + ")"
            });
            return gradient;
        };
        return StyleConverter;
    }());
    exports.StyleConverter = StyleConverter;
});
define("tests/ol3-symbolizer", ["require", "exports", "ol3-symbolizer/styles/stroke/linedash", "tests/base", "ol3-symbolizer/format/ol3-symbolizer"], function (require, exports, Dashes, base_2, ol3_symbolizer_1) {
    "use strict";
    exports.__esModule = true;
    var converter = new ol3_symbolizer_1.StyleConverter();
    base_2.describe("OL Format Tests", function () {
        base_2.it("Ensures interface does not break", function () {
            var circle = {};
            circle.fill;
            circle.opacity;
            circle.radius;
            circle.snapToPixel;
            circle.stroke;
            var color = {};
            color === [1] || color == "";
            var fill = {};
            fill.color;
            fill.gradient;
            fill.image;
            fill.pattern;
            var icon = {};
            icon["anchor-x"];
            icon["anchor-y"];
            icon.anchor;
            icon.anchorOrigin;
            icon.anchorXUnits;
            icon.anchorYUnits;
            icon.color;
            icon.crossOrigin;
            icon.offset;
            icon.offsetOrigin;
            icon.opacity;
            icon.rotateWithView;
            icon.rotation;
            icon.scale;
            icon.size;
            icon.snapToPixel;
            icon.src;
            var image = {};
            image.opacity;
            image.rotateWithView;
            image.rotation;
            image.scale;
            image.snapToPixel;
        });
    });
    base_2.describe("OL StyleConverter API Tests", function () {
        base_2.it("StyleConverter API", function () {
            var converter = new ol3_symbolizer_1.StyleConverter();
            base_2.should(typeof converter.fromJson === "function", "fromJson exists");
            base_2.should(typeof converter.toJson === "function", "toJson exists");
        });
    });
    base_2.describe("OL StyleConverter Json Tests", function () {
        base_2.it("Circle Tests", function () {
            var baseline = {
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
            };
            var style = converter.fromJson(baseline);
            var circleStyle = style.getImage();
            base_2.should(circleStyle !== null, "getImage returns a style");
            base_2.shouldEqual(circleStyle.getRadius(), baseline.circle.radius, "getImage is a circle and radius");
            var circleJson = converter.toJson(style);
            base_2.should(circleJson.circle !== null, "json contains a circle");
            base_2.shouldEqual(circleJson.circle.radius, baseline.circle.radius, "circle radius");
        });
        base_2.it("Star Tests", function () {
            var baseline = {
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
            };
            var style = converter.fromJson(baseline);
            var starStyle = style.getImage();
            base_2.should(starStyle !== null, "getImage returns a style");
            base_2.shouldEqual(starStyle.getRadius(), baseline.star.radius, "starStyle radius");
            base_2.shouldEqual(starStyle.getRadius2(), baseline.star.radius2, "starStyle radius2");
            base_2.shouldEqual(starStyle.getPoints(), baseline.star.points, "starStyle points");
            var starJson = converter.toJson(style);
            base_2.should(starJson.star !== null, "json contains a star");
            base_2.shouldEqual(starJson.star.radius, baseline.star.radius, "starJson radius");
            base_2.shouldEqual(starJson.star.radius2, baseline.star.radius2, "starJson radius2");
            base_2.shouldEqual(starJson.star.points, baseline.star.points, "starJson point count");
        });
        base_2.it("Fill Test", function () {
            var baseline = {
                "fill": {
                    "gradient": {
                        "type": "linear(200,0,201,0)",
                        "stops": "rgba(255,0,0,.1) 0%;rgba(255,0,0,0.8) 100%"
                    }
                }
            };
            var style = converter.fromJson(baseline);
            var fillStyle = style.getFill();
            base_2.should(fillStyle !== null, "fillStyle exists");
            var gradient = fillStyle.getColor();
            base_2.shouldEqual(gradient.stops, baseline.fill.gradient.stops, "fillStyle color");
            base_2.shouldEqual(gradient.type, baseline.fill.gradient.type, "fillStyle color");
        });
        base_2.it("Stroke Test", function () {
            var baseline = {
                "stroke": {
                    "color": "orange",
                    "width": 2,
                    "lineDash": Dashes.longdashdotdot
                }
            };
            var style = converter.fromJson(baseline);
            var strokeStyle = style.getStroke();
            base_2.should(strokeStyle !== null, "strokeStyle exists");
            base_2.shouldEqual(strokeStyle.getColor(), baseline.stroke.color, "strokeStyle color");
            base_2.shouldEqual(strokeStyle.getWidth(), baseline.stroke.width, "strokeStyle width");
            base_2.shouldEqual(strokeStyle.getLineDash().join(), baseline.stroke.lineDash.join(), "strokeStyle lineDash");
        });
        base_2.it("Text Test", function () {
            var baseline = {
                "text": {
                    "fill": {
                        "color": "rgba(75,92,85,0.85)"
                    },
                    "stroke": {
                        "color": "rgba(255,255,255,1)",
                        "width": 5
                    },
                    "offset-x": 5,
                    "offset-y": 10,
                    offsetX: 15,
                    offsetY: 20,
                    "text": "fantasy light",
                    "font": "18px serif"
                }
            };
            var style = converter.fromJson(baseline);
            var textStyle = style.getText();
            base_2.should(textStyle !== null, "textStyle exists");
            base_2.shouldEqual(textStyle.getFill().getColor(), baseline.text.fill.color, "textStyle text color");
            base_2.shouldEqual(textStyle.getText(), baseline.text.text, "textStyle text");
            base_2.shouldEqual(textStyle.getOffsetX(), baseline.text["offset-x"], "textStyle color");
            base_2.shouldEqual(textStyle.getOffsetY(), baseline.text["offset-y"], "textStyle color");
            base_2.shouldEqual(textStyle.getFont(), baseline.text.font, "textStyle font");
        });
    });
    base_2.describe("OL Basic shapes", function () {
        base_2.it("cross, square, diamond, star, triangle, x", function () {
            var cross = {
                "star": {
                    "opacity": 0.5,
                    "fill": {
                        "color": "red"
                    },
                    "stroke": {
                        "color": "black",
                        "width": 2
                    },
                    "points": 4,
                    "radius": 10,
                    "radius2": 0,
                    "angle": 0
                }
            };
            var square = {
                "star": {
                    "fill": {
                        "color": "red"
                    },
                    "stroke": {
                        "color": "black",
                        "width": 2
                    },
                    "points": 4,
                    "radius": 10,
                    "angle": 0.7853981633974483
                }
            };
            var diamond = {
                "star": {
                    "fill": {
                        "color": "red"
                    },
                    "stroke": {
                        "color": "black",
                        "width": 2
                    },
                    "points": 4,
                    "radius": 10,
                    "angle": 0
                }
            };
            var star = {
                "star": {
                    "fill": {
                        "color": "red"
                    },
                    "stroke": {
                        "color": "black",
                        "width": 2
                    },
                    "points": 5,
                    "radius": 10,
                    "radius2": 4,
                    "angle": 0
                }
            };
            var triangle = {
                "star": {
                    "fill": {
                        "color": "red"
                    },
                    "stroke": {
                        "color": "black",
                        "width": 2
                    },
                    "points": 3,
                    "radius": 10,
                    "angle": 0
                }
            };
            var x = {
                "star": {
                    "fill": {
                        "color": "red"
                    },
                    "stroke": {
                        "color": "black",
                        "width": 2
                    },
                    "points": 4,
                    "radius": 10,
                    "radius2": 0,
                    "angle": 0.7853981633974483
                }
            };
            var crossJson = converter.toJson(converter.fromJson(cross));
            var squareJson = converter.toJson(converter.fromJson(square));
            var diamondJson = converter.toJson(converter.fromJson(diamond));
            var starJson = converter.toJson(converter.fromJson(star));
            var triangleJson = converter.toJson(converter.fromJson(triangle));
            var xJson = converter.toJson(converter.fromJson(x));
            base_2.should(!!crossJson.cross, "cross exists");
            base_2.shouldEqual(crossJson.cross.size, cross.star.radius * 2, "cross size");
            base_2.should(!!squareJson.square, "square exists");
            base_2.shouldEqual(squareJson.square.size, square.star.radius * 2, "square size");
            base_2.should(!!diamondJson.diamond, "diamond exists");
            base_2.shouldEqual(diamondJson.diamond.size, diamond.star.radius * 2, "diamond size");
            base_2.should(!!triangleJson.triangle, "triangle exists");
            base_2.shouldEqual(triangleJson.triangle.size, triangle.star.radius * 2, "triangle size");
            base_2.should(!!xJson.x, "x exists");
            base_2.shouldEqual(xJson.x.size, x.star.radius * 2, "x size");
            var items = { crossJson: crossJson, squareJson: squareJson, diamondJson: diamondJson, triangleJson: triangleJson, xJson: xJson };
            Object.keys(items).forEach(function (k) {
                base_2.shouldEqual(base_2.stringify(converter.toJson(converter.fromJson(items[k]))), base_2.stringify(items[k]), k + " json->style->json");
            });
        });
    });
    base_2.describe("OL NEXT", function () {
        base_2.it("NEXT", function () {
        });
    });
});
define("ol3-symbolizer/format/ags-symbolizer", ["require", "exports", "ol3-symbolizer/format/ol3-symbolizer"], function (require, exports, Symbolizer) {
    "use strict";
    exports.__esModule = true;
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
        StyleConverter.prototype.fromSFSForwardDiagonal = function (symbol, style) {
            style.fill = {
                pattern: {
                    color: this.asColor(symbol.color),
                    orientation: "forward",
                    spacing: 3,
                    repitition: "repeat"
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
                    repitition: "repeat"
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
define("tests/ags-symbolizer", ["require", "exports", "tests/base", "ol3-symbolizer/format/ags-symbolizer", "ol3-symbolizer/format/ol3-symbolizer"], function (require, exports, base_3, ags_symbolizer_1, ol3_symbolizer_2) {
    "use strict";
    exports.__esModule = true;
    var fromJson = (function () {
        var fromJsonConverter = new ags_symbolizer_1.StyleConverter();
        return function (style) { return fromJsonConverter.fromJson(style); };
    })();
    var toJson = (function () {
        var toJsonConverter = new ol3_symbolizer_2.StyleConverter();
        return function (style) { return toJsonConverter.toJson(style); };
    })();
    function rgba(_a) {
        var r = _a[0], g = _a[1], b = _a[2], a = _a[3];
        return "rgba(" + r + "," + g + "," + b + "," + a / 255 + ")";
    }
    base_3.describe("esriSMS Tests", function () {
        base_3.it("esriSMSCircle", function () {
            var baseline = {
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
            };
            var style = fromJson(baseline);
            var circleJson = toJson(style);
            var expectedRadius = (baseline.size * 4 / 3) / 2;
            base_3.shouldEqual(circleJson.circle.radius, expectedRadius, "circleJson radius is 33% larger than specified in the ags style (see StyleConverter.asWidth)");
            base_3.shouldEqual(circleJson.circle.fill.color, rgba(baseline.color), "circleJson fill color");
            base_3.shouldEqual(circleJson.circle.fill.pattern, null, "circleJson fill pattern is solid");
            base_3.shouldEqual(circleJson.circle.stroke.color, rgba(baseline.outline.color), "circleJson stroke color");
            base_3.shouldEqual(circleJson.circle.stroke.width, baseline.outline.width * 4 / 3, "circleJson stroke width");
            base_3.shouldEqual(circleJson.circle.stroke.lineCap, undefined, "circleJson stroke lineCap");
            base_3.shouldEqual(circleJson.circle.stroke.lineDash, undefined, "circleJson stroke lineDash");
            base_3.shouldEqual(circleJson.circle.stroke.lineJoin, undefined, "circleJson stroke lineJoin");
        });
        base_3.it("esriSMSCross", function () {
            var baseline = {
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
            };
            var json = toJson(fromJson(baseline));
            base_3.should(!!json.cross, "cross");
            base_3.shouldEqual(json.cross.opacity, 1, "opacity");
            base_3.shouldEqual(json.cross.size, 22.62741699796952, "size");
        });
    });
    base_3.describe("esriSLS Tests", function () {
        base_3.it("esriSLSShortDash esriLCSSquare esriLJSRound", function () {
            var baseline = {
                "type": "esriSLS",
                "style": "esriSLSShortDash",
                "color": [
                    152,
                    230,
                    0,
                    255
                ],
                "width": 1,
                "cap": "esriLCSSquare",
                "join": "esriLJSRound",
                "miterLimit": 9.75
            };
            var style = fromJson(baseline);
            var json = toJson(style);
            base_3.shouldEqual(json.stroke.color, rgba(baseline.color), "stroke color");
        });
        base_3.it("esriSLSDash esriLCSButt esriLJSBevel", function () {
            var baseline = {
                "type": "esriSLS",
                "style": "esriSLSDash",
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
            };
            var style = fromJson(baseline);
            var json = toJson(style);
            base_3.shouldEqual(json.stroke.color, rgba(baseline.color), "stroke color");
        });
        base_3.it("esriSLSSolid esriLCSRound esriLJSMiter", function () {
            var baseline = {
                "type": "esriSLS",
                "style": "esriSLSSolid",
                "color": [
                    152,
                    230,
                    0,
                    255
                ],
                "width": 1,
                "cap": "esriLCSRound",
                "join": "esriLJSMiter",
                "miterLimit": 9.75
            };
            var style = fromJson(baseline);
            var json = toJson(style);
            base_3.shouldEqual(json.stroke.color, rgba(baseline.color), "stroke color");
        });
    });
});
define("tests/index", ["require", "exports", "tests/common", "tests/ol3-symbolizer", "tests/ags-symbolizer"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});
//# sourceMappingURL=index.js.map