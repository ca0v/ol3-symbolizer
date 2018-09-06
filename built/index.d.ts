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
        static inverse(style: Format.Style): Format.Style;
    }
}
declare module "ol3-symbolizer/format/plugins/as-square" {
    import { Format } from "../@types/formats";
    export class Shapeshifter {
        static is(style: Format.Style): boolean;
        static as(style: Format.Style): Format.Style;
        static inverse(style: Format.Style): Format.Style;
    }
}
declare module "ol3-symbolizer/format/plugins/as-diamond" {
    import { Format } from "../@types/formats";
    export class Shapeshifter {
        static is(style: Format.Style): boolean;
        static as(style: Format.Style): Format.Style;
        static inverse(style: Format.Style): Format.Style;
    }
}
declare module "ol3-symbolizer/format/plugins/as-triangle" {
    import { Format } from "../@types/formats";
    export class Shapeshifter {
        static is(style: Format.Style): boolean;
        static as(style: Format.Style): Format.Style;
        static inverse(style: Format.Style): Format.Style;
    }
}
declare module "ol3-symbolizer/format/plugins/as-x" {
    import { Format } from "../@types/formats";
    export class Shapeshifter {
        static is(style: Format.Style): boolean;
        static as(style: Format.Style): Format.Style;
        static inverse(style: Format.Style): Format.Style;
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
declare module "ol3-symbolizer/format/ags-symbolizer" {
    import { ArcGisFeatureServerLayer } from "./@types/ArcGisFeatureServerLayer";
    export class StyleConverter {
        private asWidth;
        private asColor;
        private fromSFSSolid;
        private fromSFSForwardDiagonal;
        private fromSFSBackwardDiagonal;
        private fromSFS;
        private fromSMSCircle;
        private fromSMSCross;
        private fromSMSDiamond;
        private fromSMSPath;
        private fromSMSSquare;
        private fromSMSX;
        private fromSMS;
        private fromPMS;
        private fromSLSSolid;
        private fromSLS;
        private fromPFS;
        private fromTS;
        fromJson(symbol: ArcGisFeatureServerLayer.Symbol): import("@types/openlayers/index").style.Style;
        private fromSymbol;
        fromRenderer(renderer: ArcGisFeatureServerLayer.Renderer, args: {
            url: string;
        }): import("@types/openlayers/index").style.Style | ((feature: import("@types/openlayers/index").Feature) => import("@types/openlayers/index").style.Style);
    }
}
declare module "index" {
    import Symbolizer = require("ol3-symbolizer/format/ol3-symbolizer");
    import { StyleConverter as AgsStyleConverter } from "ol3-symbolizer/format/ags-symbolizer";
    import { StyleConverter } from "ol3-symbolizer/format/ol3-symbolizer";
    import { Format } from "./ol3-symbolizer/format/@types/formats";
    export { Symbolizer, AgsStyleConverter, StyleConverter, Format };
}
