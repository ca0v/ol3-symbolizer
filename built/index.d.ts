declare module "ol3-symbolizer/common/assign" {
    export function assign(obj: any, prop: string, value: any): void;
}
declare module "ol3-symbolizer/common/mixin" {
    export function mixin<A extends any, B extends any>(a: A, b: B): A & B;
}
declare module "ol3-symbolizer/common/doif" {
    export function doif<T>(v: T, cb: (v: T) => void): void;
}
declare module "ol3-symbolizer/format/plugins/as-cross" {
    import { Format } from "../@types/formats";
    export class Shapeshifter {
        static is(style: Format.Style): boolean;
        static as(style: Format.Style): Format.Style;
    }
}
declare module "ol3-symbolizer/format/plugins/as-square" {
    import { Format } from "../@types/formats";
    export class Shapeshifter {
        static is(style: Format.Style): boolean;
        static as(style: Format.Style): Format.Style;
    }
}
declare module "ol3-symbolizer/format/plugins/as-diamond" {
    import { Format } from "../@types/formats";
    export class Shapeshifter {
        static is(style: Format.Style): boolean;
        static as(style: Format.Style): Format.Style;
    }
}
declare module "ol3-symbolizer/format/plugins/as-triangle" {
    import { Format } from "../@types/formats";
    export class Shapeshifter {
        static is(style: Format.Style): boolean;
        static as(style: Format.Style): Format.Style;
    }
}
declare module "ol3-symbolizer/format/plugins/as-x" {
    import { Format } from "../@types/formats";
    export class Shapeshifter {
        static is(style: Format.Style): boolean;
        static as(style: Format.Style): Format.Style;
    }
}
declare module "ol3-symbolizer/format/ol3-symbolizer" {
    import ol = require("openlayers");
    import Serializer = require("./@types/base");
    import { Format } from "./@types/formats";
    export class StyleConverter implements Serializer.IConverter<Format.Style> {
        private converters;
        constructor();
        fromJson(json: Format.Style): ol.style.Style;
        toJson(style: ol.style.Style): Format.Style;
        getGeometry(feature: ol.Feature | ol.render.Feature): ol.geom.Geometry | ol.render.Feature;
        private serializeStyle;
        private serializeImage;
        private serializeStroke;
        private serializeText;
        private serializeColor;
        private serializeFill;
        private deserializeStyle;
        private deserializeText;
        private deserializeCircle;
        private deserializeStar;
        private deserializeIcon;
        private deserializeSvg;
        private deserializeFill;
        private deserializeStroke;
        private deserializeColor;
        private deserializeLinearGradient;
        private deserializeRadialGradient;
    }
}
declare module "index" {
    import Symbolizer = require("ol3-symbolizer/format/ol3-symbolizer");
    export = Symbolizer;
}
