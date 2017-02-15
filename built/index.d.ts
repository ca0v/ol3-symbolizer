declare module "ol3-symbolizer/format/base" {
    export interface IConverter<T> {
        fromJson: (json: T) => ol.style.Style;
        toJson(style: ol.style.Style): T;
    }
}
declare module "ol3-symbolizer/format/ol3-symbolizer" {
    import ol = require("openlayers");
    import Serializer = require("ol3-symbolizer/format/base");
    export namespace Format {
        type Color = number[] | string;
        type Size = number[];
        type Offset = number[];
        type LineDash = number[];
        interface Fill {
            color?: string;
        }
        interface Stroke {
            color?: string;
            width?: number;
            lineCap?: string;
            lineJoin?: string;
            lineDash?: LineDash;
            miterLimit?: number;
        }
        interface Style {
            fill?: Fill;
            image?: Image;
            stroke?: Stroke;
            text?: Text;
            zIndex?: number;
        }
        interface Image {
            opacity?: number;
            rotateWithView?: boolean;
            rotation?: number;
            scale?: number;
            snapToPixel?: boolean;
        }
        interface Circle {
            radius: number;
            stroke?: Stroke;
            fill?: Fill;
            snapToPixel?: boolean;
        }
        interface Star extends Image {
            angle?: number;
            fill?: Fill;
            points?: number;
            stroke?: Stroke;
            radius?: number;
            radius2?: number;
        }
        interface Icon extends Image {
            anchor?: Offset;
            anchorOrigin?: "bottom-left" | "bottom-right" | "top-left" | "top-right";
            anchorXUnits?: "fraction" | "pixels";
            anchorYUnits?: "fraction" | "pixels";
            color?: Color;
            crossOrigin?: string;
            src?: string;
            offset?: Offset;
            offsetOrigin?: 'top_left' | 'top_right' | 'bottom-left' | 'bottom-right';
            size?: Size;
        }
        interface Text {
            fill?: Fill;
            font?: string;
            offsetX?: number;
            offsetY?: number;
            rotation?: number;
            scale?: number;
            stroke?: Stroke;
            text?: string;
            textAlign?: string;
            textBaseline?: string;
        }
    }
    export namespace Format {
        interface Style {
            image?: Icon & Svg;
            icon?: Icon;
            svg?: Svg;
            star?: Star;
            circle?: Circle;
            text?: Text;
            fill?: Fill;
            stroke?: Stroke;
        }
        interface Icon {
            "anchor-x"?: number;
            "anchor-y"?: number;
        }
        interface Text {
            "offset-x"?: number;
            "offset-y"?: number;
        }
        interface Circle {
            opacity?: number;
        }
        interface Svg {
            anchor?: Offset;
            anchorOrigin?: "bottom-left" | "bottom-right" | "top-left" | "top-right";
            anchorXUnits?: string;
            anchorYUnits?: string;
            color?: Color;
            crossOrigin?: string;
            img?: string;
            imgSize?: Size;
            offset?: Offset;
            offsetOrigin?: 'top_left' | 'top_right' | 'bottom-left' | 'bottom-right';
            path?: string;
            stroke?: Stroke;
            fill?: Fill;
        }
    }
    export class StyleConverter implements Serializer.IConverter<Format.Style> {
        fromJson(json: Format.Style): ol.style.Style;
        toJson(style: ol.style.Style): Format.Style;
        setGeometry(feature: ol.Feature): ol.geom.Geometry;
        private assign(obj, prop, value);
        private serializeStyle(style);
        private serializeColor(color);
        private serializeFill(fill);
        private deserializeStyle(json);
        private deserializeText(json);
        private deserializeCircle(json);
        private deserializeStar(json);
        private deserializeIcon(json);
        private deserializeSvg(json);
        private deserializeFill(json);
        private deserializeStroke(json);
        private deserializeColor(fill);
        private deserializeLinearGradient(json);
        private deserializeRadialGradient(json);
    }
}
declare module "index" {
    import Symbolizer = require("ol3-symbolizer/format/ol3-symbolizer");
    export = Symbolizer;
}
declare module "ol3-symbolizer/common/ajax" {
    class Ajax {
        url: string;
        options: {
            use_json: boolean;
            use_cors: boolean;
        };
        constructor(url: string);
        jsonp<T>(args?: any, url?: string): JQueryDeferred<T>;
        private ajax<T>(method, args?, url?);
        get<T>(args?: any): JQueryDeferred<T>;
        post<T>(args?: any): JQueryDeferred<T>;
        put<T>(args?: any): JQueryDeferred<T>;
        delete(args?: any): JQueryDeferred<{}>;
    }
    export = Ajax;
}
declare module "ol3-symbolizer/ags/ags-catalog" {
    export interface Service {
        name: string;
        type: string;
    }
    export interface CatalogInfo {
        currentVersion: number;
        folders: string[];
        services: Service[];
    }
    export interface SpatialReference {
        wkid: number;
        latestWkid: number;
        wkt: string;
    }
    export interface Extent {
        xmin: number;
        ymin: number;
        xmax: number;
        ymax: number;
        spatialReference: SpatialReference;
    }
    export interface DocumentInfo {
        Title: string;
        Author: string;
        Comments: string;
        Subject: string;
        Category: string;
        AntialiasingMode: string;
        TextAntialiasingMode: string;
        Keywords: string;
    }
    export interface Layer {
        id: number;
        name: string;
        parentLayerId: number;
        defaultVisibility: boolean;
        subLayerIds?: any;
        minScale: number;
        maxScale: number;
    }
    export interface FeatureServerInfo {
        currentVersion: number;
        serviceDescription: string;
        hasVersionedData: boolean;
        supportsDisconnectedEditing: boolean;
        syncEnabled: boolean;
        supportedQueryFormats: string;
        maxRecordCount: number;
        capabilities: string;
        description: string;
        copyrightText: string;
        spatialReference: SpatialReference;
        initialExtent: Extent;
        fullExtent: Extent;
        allowGeometryUpdates: boolean;
        units: string;
        documentInfo: DocumentInfo;
        layers: Layer[];
        tables: any[];
        enableZDefaults: boolean;
        zDefault: number;
    }
    export interface AdvancedQueryCapabilities {
        supportsPagination: boolean;
        supportsStatistics: boolean;
        supportsOrderBy: boolean;
        supportsDistinct: boolean;
    }
    export interface EsriTSSymbol {
        type: string;
        color: number[];
        backgroundColor?: any;
        borderLineColor?: any;
        borderLineSize?: any;
        verticalAlignment: string;
        horizontalAlignment: string;
        rightToLeft: boolean;
        angle: number;
        xoffset: number;
        yoffset: number;
        kerning: boolean;
        haloColor?: any;
        haloSize?: any;
        font: Font;
    }
    export interface DefaultSymbol {
        type: string;
        url: string;
        imageData: string;
        contentType: string;
        width: number;
        height: number;
        angle: number;
        xoffset: number;
        yoffset: number;
    }
    export interface UniqueValueInfo {
        symbol: DefaultSymbol;
        value: string;
        label: string;
        description: string;
    }
    export interface Renderer {
        type: string;
        field1: string;
        field2?: any;
        field3?: any;
        fieldDelimiter: string;
        defaultSymbol: DefaultSymbol;
        defaultLabel: string;
        uniqueValueInfos: UniqueValueInfo[];
    }
    export interface Font {
        family: string;
        size: number;
        style: string;
        weight: string;
        decoration: string;
    }
    export interface LabelingInfo {
        labelPlacement: string;
        where?: any;
        labelExpression: string;
        useCodedValues: boolean;
        symbol: DefaultSymbol & EsriTSSymbol;
        minScale: number;
        maxScale: number;
    }
    export interface DrawingInfo {
        renderer: Renderer;
        transparency: number;
        labelingInfo: LabelingInfo[];
    }
    export interface CodedValue {
        name: string;
        code: any;
    }
    export interface Domain {
        type: string;
        name: string;
        codedValues: CodedValue[];
        range: number[];
    }
    export interface Field {
        name: string;
        type: string;
        alias: string;
        domain: Domain;
        editable: boolean;
        nullable: boolean;
        length?: number;
    }
    export interface Domains {
        [n: string]: {
            type: string;
        };
    }
    export interface Attributes {
        [n: string]: string;
    }
    export interface Prototype {
        attributes: Attributes;
    }
    export interface Template {
        name: string;
        description: string;
        prototype: Prototype;
        drawingTool: string;
    }
    export interface Type {
        id: string;
        name: string;
        domains: Domains;
        templates: Template[];
    }
    export interface FeatureLayerInfo {
        currentVersion: number;
        id: number;
        name: string;
        type: string;
        description: string;
        copyrightText: string;
        defaultVisibility: boolean;
        editFieldsInfo?: any;
        ownershipBasedAccessControlForFeatures?: any;
        syncCanReturnChanges: boolean;
        relationships: any[];
        isDataVersioned: boolean;
        supportsRollbackOnFailureParameter: boolean;
        supportsStatistics: boolean;
        supportsAdvancedQueries: boolean;
        advancedQueryCapabilities: AdvancedQueryCapabilities;
        geometryType: string;
        minScale: number;
        maxScale: number;
        extent: Extent;
        drawingInfo: DrawingInfo;
        hasM: boolean;
        hasZ: boolean;
        enableZDefaults: boolean;
        zDefault: number;
        allowGeometryUpdates: boolean;
        hasAttachments: boolean;
        htmlPopupType: string;
        objectIdField: string;
        globalIdField: string;
        displayField: string;
        typeIdField: string;
        fields: Field[];
        types: Type[];
        templates: any[];
        maxRecordCount: number;
        supportedQueryFormats: string;
        capabilities: string;
        useStandardizedQueries: boolean;
    }
    export interface Origin {
        x: number;
        y: number;
    }
    export interface Lod {
        level: number;
        resolution: number;
        scale: number;
    }
    export interface TileInfo {
        rows: number;
        cols: number;
        dpi: number;
        format: string;
        compressionQuality: number;
        origin: Origin;
        spatialReference: SpatialReference;
        lods: Lod[];
    }
    export interface InitialExtent {
        xmin: number;
        ymin: number;
        xmax: number;
        ymax: number;
        spatialReference: SpatialReference;
    }
    export interface FullExtent {
        xmin: number;
        ymin: number;
        xmax: number;
        ymax: number;
        spatialReference: SpatialReference;
    }
    export interface MapServerInfo {
        currentVersion: number;
        serviceDescription: string;
        mapName: string;
        description: string;
        copyrightText: string;
        supportsDynamicLayers: boolean;
        layers: Layer[];
        tables: any[];
        spatialReference: SpatialReference;
        singleFusedMapCache: boolean;
        tileInfo: TileInfo;
        initialExtent: InitialExtent;
        fullExtent: FullExtent;
        minScale: number;
        maxScale: number;
        units: string;
        supportedImageFormatTypes: string;
        documentInfo: DocumentInfo;
        capabilities: string;
        supportedQueryFormats: string;
        exportTilesAllowed: boolean;
        maxRecordCount: number;
        maxImageHeight: number;
        maxImageWidth: number;
        supportedExtensions: string;
    }
    export class Catalog {
        private ajax;
        constructor(url: string);
        about(data?: any): JQueryDeferred<CatalogInfo>;
        aboutFolder(folder: string): JQueryDeferred<CatalogInfo>;
        aboutFeatureServer(name: string): JQueryDeferred<FeatureServerInfo> & {
            url: string;
        };
        aboutMapServer(name: string): JQueryDeferred<MapServerInfo> & {
            url: string;
        };
        aboutLayer(layer: number): JQueryDeferred<FeatureLayerInfo>;
    }
}
declare module "ol3-symbolizer/format/ags-symbolizer" {
    export namespace ArcGisFeatureServerLayer {
        type SpatialReference = {
            wkid: string;
        };
        type Extent = {
            xmin: number;
        };
        type Styles = "esriSMSCircle" | "esriSMSCross" | "esriSMSDiamond" | "esriSMSPath" | "esriSMSSquare" | "esriSMSX" | "esriSFSSolid" | "esriSFSForwardDiagonal" | "esriSLSSolid" | "esriSLSDot" | "esriSLSDash" | "esriSLSDashDot" | "esriSLSDashDotDot";
        type SymbolTypes = "esriSMS" | "esriSLS" | "esriSFS" | "esriPMS" | "esriPFS" | "esriTS";
        type Color = number[];
        interface AdvancedQueryCapabilities {
            supportsPagination: boolean;
            supportsStatistics: boolean;
            supportsOrderBy: boolean;
            supportsDistinct: boolean;
        }
        interface Outline {
            style?: Styles;
            color?: number[];
            width?: number;
            type?: SymbolTypes;
            d?: Date;
        }
        interface Font {
            weight: string;
            style: string;
            family: string;
            size: number;
        }
        interface Symbol {
            type: SymbolTypes;
            style?: Styles;
            color?: number[];
            outline?: Outline;
            width?: number;
            horizontalAlignment?: string;
            verticalAlignment?: string;
            font?: Font;
            height?: number;
            xoffset?: number;
            yoffset?: number;
            contentType?: string;
            url?: string;
            size?: number;
            angle?: number;
            imageData?: string;
            path?: string;
        }
        interface UniqueValueInfo {
            symbol: Symbol;
            value?: string;
            label?: string;
            description?: string;
        }
        interface VisualVariable {
            type: string;
            field: string;
            valueUnit: string;
            minSize: number;
            maxSize: number;
            minDataValue: number;
            maxDataValue: number;
            minSliderValue: number;
            maxSliderValue: number;
        }
        interface ClassBreakInfo {
            symbol: Symbol;
            classMaxValue: number;
        }
        interface Renderer extends Attributes {
            type: string;
            label?: string;
            description?: string;
            field1?: string;
            field2?: string;
            field3?: string;
            fieldDelimiter?: string;
            defaultSymbol?: Symbol;
            defaultLabel?: any;
            symbol?: Symbol;
            uniqueValueInfos?: UniqueValueInfo[];
        }
        interface ClassBreakRenderer extends Renderer {
            field?: string;
            minValue?: number;
            classBreakInfos?: ClassBreakInfo[];
            visualVariables?: VisualVariable[];
            authoringInfo: {
                visualVariables: VisualVariable[];
            };
        }
        interface DrawingInfo {
            renderer: Renderer;
            transparency?: number;
            labelingInfo?: any;
        }
        interface CodedValue {
            name: string;
            code: string;
        }
        interface Domain {
            type: string;
            name: string;
            codedValues: CodedValue[];
        }
        interface Field {
            name: string;
            type: string;
            alias: string;
            domain: Domain;
            editable: boolean;
            nullable: boolean;
            length?: number;
        }
        interface Domains {
        }
        interface Attributes {
            [attribute: string]: any;
        }
        interface Prototype {
            attributes: Attributes;
        }
        interface Template {
            name: string;
            description: string;
            prototype: Prototype;
            drawingTool: string;
        }
        interface Type {
            id: string;
            name: string;
            domains: Domains;
            templates: Template[];
        }
        interface RootObject {
            currentVersion: string | number;
            id: number;
            name: string;
            type: string;
            description: string;
            copyrightText: string;
            defaultVisibility: boolean;
            editFieldsInfo?: any;
            ownershipBasedAccessControlForFeatures?: any;
            syncCanReturnChanges: boolean;
            relationships: any[];
            isDataVersioned: boolean;
            supportsRollbackOnFailureParameter: boolean;
            supportsStatistics: boolean;
            supportsAdvancedQueries: boolean;
            advancedQueryCapabilities: AdvancedQueryCapabilities;
            geometryType: string;
            minScale: number;
            maxScale: number;
            extent: Extent;
            drawingInfo: DrawingInfo;
            hasM: boolean;
            hasZ: boolean;
            allowGeometryUpdates: boolean;
            hasAttachments: boolean;
            htmlPopupType: string;
            objectIdField: string;
            globalIdField: string;
            displayField: string;
            typeIdField: string;
            fields: Field[];
            types: Type[];
            templates: any[];
            maxRecordCount: number;
            supportedQueryFormats: string;
            capabilities: string;
            useStandardizedQueries: boolean;
            spatialReference?: SpatialReference;
            displayFieldName?: string;
        }
    }
    export class StyleConverter {
        private asWidth(v);
        private asColor(color);
        private fromSFSSolid(symbol, style);
        private fromSFS(symbol, style);
        private fromSMSCircle(symbol, style);
        private fromSMSCross(symbol, style);
        private fromSMSDiamond(symbol, style);
        private fromSMSPath(symbol, style);
        private fromSMSSquare(symbol, style);
        private fromSMSX(symbol, style);
        private fromSMS(symbol, style);
        private fromPMS(symbol, style);
        private fromSLSSolid(symbol, style);
        private fromSLS(symbol, style);
        private fromPFS(symbol, style);
        private fromTS(symbol, style);
        fromJson(symbol: ArcGisFeatureServerLayer.Symbol): ol.style.Style;
        private fromSymbol(symbol, style);
        fromRenderer(renderer: ArcGisFeatureServerLayer.Renderer, args: {
            url: string;
        }): ol.style.Style | ((feature: ol.Feature) => ol.style.Style);
    }
}
declare module "ol3-symbolizer/common/common" {
    export function getParameterByName(name: string, url?: string): string;
    export function doif<T>(v: T, cb: (v: T) => void): void;
    export function mixin<A extends any, B extends any>(a: A, b: B): A & B;
    export function defaults<T extends any>(a: T, b: T): T;
    export function cssin(name: string, css: string): () => void;
}
declare module "ol3-symbolizer/ags/ags-source" {
    import ol = require("openlayers");
    export interface IOptions extends olx.source.VectorOptions {
        services: string;
        serviceName: string;
        map: ol.Map;
        layers: number[];
        tileSize?: number;
        where?: string;
    }
    export class ArcGisVectorSourceFactory {
        static create(options: IOptions): JQueryDeferred<ol.layer.Vector[]>;
    }
}
declare module "bower_components/ol3-popup/ol3-popup/paging/paging" {
    import ol = require("openlayers");
    import { Popup } from "bower_components/ol3-popup/ol3-popup/ol3-popup";
    export type SourceType = HTMLElement | string | JQueryDeferred<HTMLElement | string>;
    export type SourceCallback = () => SourceType;
    export class Paging {
        options: {
            popup: Popup;
        };
        private _pages;
        private _activeIndex;
        domNode: HTMLDivElement;
        constructor(options: {
            popup: Popup;
        });
        readonly activePage: {
            callback?: SourceCallback;
            element: HTMLElement;
            location: ol.geom.Geometry;
        };
        readonly activeIndex: number;
        readonly count: number;
        dispatch(name: string): void;
        on(name: string, listener: EventListener): void;
        add(source: SourceType | SourceCallback, geom?: ol.geom.Geometry): void;
        clear(): void;
        goto(index: number): void;
        next(): void;
        prev(): void;
    }
}
declare module "bower_components/ol3-popup/ol3-popup/paging/page-navigator" {
    import { Paging } from "bower_components/ol3-popup/ol3-popup/paging/paging";
    class PageNavigator {
        options: {
            pages: Paging;
        };
        private domNode;
        prevButton: HTMLButtonElement;
        nextButton: HTMLButtonElement;
        pageInfo: HTMLSpanElement;
        constructor(options: {
            pages: Paging;
        });
        dispatch(name: string): void;
        on(name: string, listener: EventListener): void;
        template(): string;
        hide(): void;
        show(): void;
    }
    export = PageNavigator;
}
declare module "bower_components/ol3-popup/ol3-popup/ol3-popup" {
    import ol = require("openlayers");
    import { Paging } from "bower_components/ol3-popup/ol3-popup/paging/paging";
    export interface IPopupOptions_2_0_4 extends olx.OverlayOptions {
        autoPan?: boolean;
        autoPanAnimation?: {
            duration: number;
            source: any;
        };
        autoPanMargin?: number;
        insertFirst?: boolean;
        stopEvent?: boolean;
        offset?: [number, number];
        positioning?: string;
        position?: [number, number];
    }
    export interface IPopupOptions_2_0_5 extends IPopupOptions_2_0_4 {
        dockContainer?: JQuery | string | HTMLElement;
    }
    export interface IPopupOptions_2_0_6 extends IPopupOptions_2_0_5 {
        css?: string;
        pointerPosition?: number;
    }
    export interface IPopupOptions_2_0_7 extends IPopupOptions_2_0_6 {
        xOffset?: number;
        yOffset?: number;
    }
    export interface IPopupOptions_3_20_1 extends IPopupOptions_2_0_7 {
    }
    export interface IPopupOptions extends IPopupOptions_3_20_1 {
    }
    export interface IPopup_2_0_4<T> {
        show(position: ol.Coordinate, markup: string): T;
        hide(): T;
    }
    export interface IPopup_2_0_5<T> extends IPopup_2_0_4<T> {
        isOpened(): boolean;
        destroy(): void;
        panIntoView(): void;
        isDocked(): boolean;
    }
    export interface IPopup_3_20_1<T> extends IPopup_2_0_5<T> {
        applyOffset([x, y]: [number, number]): any;
        setIndicatorPosition(offset: number): any;
    }
    export interface IPopup extends IPopup_3_20_1<Popup> {
    }
    export class Popup extends ol.Overlay implements IPopup {
        options: IPopupOptions & {
            map?: ol.Map;
            parentNode?: HTMLElement;
        };
        content: HTMLDivElement;
        domNode: HTMLDivElement;
        private closer;
        private docker;
        pages: Paging;
        private handlers;
        constructor(options?: IPopupOptions);
        private postCreate();
        private injectCss(css);
        setIndicatorPosition(offset: number): void;
        setPosition(position: ol.Coordinate): void;
        panIntoView(): void;
        destroy(): void;
        dispatch(name: string): void;
        show(coord: ol.Coordinate, html: string | HTMLElement): this;
        hide(): this;
        isOpened(): boolean;
        isDocked(): boolean;
        dock(): void;
        undock(): void;
        applyOffset([x, y]: [number, number]): void;
    }
}
declare module "bower_components/ol3-fun/ol3-fun/common" {
    export function parse<T>(v: string, type: T): T;
    export function getQueryParameters(options: any, url?: string): void;
    export function getParameterByName(name: string, url?: string): string;
    export function doif<T>(v: T, cb: (v: T) => void): void;
    export function mixin<A extends any, B extends any>(a: A, b: B): A & B;
    export function defaults<A extends any, B extends any>(a: A, ...b: B[]): A & B;
    export function cssin(name: string, css: string): () => void;
    export function debounce(func: () => void, wait?: number): () => void;
    export function html(html: string): HTMLElement;
}
declare module "ol3-symbolizer/labs/ags-viewer" {
    import ol = require("openlayers");
    export function run(): ol.Map;
}
declare module "ol3-symbolizer/labs/index" {
    export function run(): void;
}
declare module "ol3-symbolizer/styles/ags/cartographiclinesymbol" {
    let symbols: {
        "type": string;
        "style": string;
        "color": number[];
        "width": number;
        "cap": string;
        "join": string;
        "miterLimit": number;
    }[];
    export = symbols;
}
declare module "ol3-symbolizer/styles/ags/picturefillsymbol" {
    var _default: {
        "color": number[];
        "type": string;
        "url": string;
        "width": number;
        "height": number;
        "xoffset": number;
        "yoffset": number;
        "xscale": number;
        "yscale": number;
    }[];
    export = _default;
}
declare module "ol3-symbolizer/styles/ags/picturemarkersymbol-imagedata" {
    const style: {
        "type": string;
        "url": string;
        "imageData": string;
        "contentType": string;
        "color": string;
        "width": number;
        "height": number;
        "angle": number;
        "xoffset": number;
        "yoffset": number;
    }[];
    export = style;
}
declare module "ol3-symbolizer/styles/ags/picturemarkersymbol" {
    var _default: {
        "angle": number;
        "xoffset": number;
        "yoffset": number;
        "type": string;
        "url": string;
        "width": number;
        "height": number;
    }[];
    export = _default;
}
declare module "ol3-symbolizer/styles/ags/simplefillsymbol" {
    import { ArcGisFeatureServerLayer } from "ol3-symbolizer/format/ags-symbolizer";
    let symbols: ArcGisFeatureServerLayer.Symbol[];
    export = symbols;
}
declare module "ol3-symbolizer/styles/ags/simplemarkersymbol-circle" {
    import { ArcGisFeatureServerLayer } from "ol3-symbolizer/format/ags-symbolizer";
    const styles: ArcGisFeatureServerLayer.Symbol[];
    export = styles;
}
declare module "ol3-symbolizer/styles/ags/simplemarkersymbol-cross" {
    import { ArcGisFeatureServerLayer } from "ol3-symbolizer/format/ags-symbolizer";
    var _default: ArcGisFeatureServerLayer.Symbol[];
    export = _default;
}
declare module "ol3-symbolizer/styles/ags/simplemarkersymbol-diamond" {
    import { ArcGisFeatureServerLayer } from "ol3-symbolizer/format/ags-symbolizer";
    var _default: ArcGisFeatureServerLayer.Symbol[];
    export = _default;
}
declare module "ol3-symbolizer/styles/ags/simplemarkersymbol-path" {
    import { ArcGisFeatureServerLayer } from "ol3-symbolizer/format/ags-symbolizer";
    var _default: ArcGisFeatureServerLayer.Symbol[];
    export = _default;
}
declare module "ol3-symbolizer/styles/ags/simplemarkersymbol-square" {
    import { ArcGisFeatureServerLayer } from "ol3-symbolizer/format/ags-symbolizer";
    var _default: ArcGisFeatureServerLayer.Symbol[];
    export = _default;
}
declare module "ol3-symbolizer/styles/ags/simplemarkersymbol-x" {
    import { ArcGisFeatureServerLayer } from "ol3-symbolizer/format/ags-symbolizer";
    var _default: ArcGisFeatureServerLayer.Symbol[];
    export = _default;
}
declare module "ol3-symbolizer/styles/ags/textsymbol" {
    var _default: {
        "color": number[];
        "type": string;
        "horizontalAlignment": string;
        "angle": number;
        "xoffset": number;
        "yoffset": number;
        "text": string;
        "rotated": boolean;
        "kerning": boolean;
        "font": {
            "size": number;
            "style": string;
            "variant": string;
            "weight": string;
            "family": string;
        };
    }[];
    export = _default;
}
declare module "ol3-symbolizer/styles/basic" {
    var _default: {
        cross: {
            star: {
                opacity: number;
                fill: {
                    color: string;
                };
                stroke: {
                    color: string;
                    width: number;
                };
                points: number;
                radius: number;
                radius2: number;
                angle: number;
            };
        }[];
        square: {
            star: {
                fill: {
                    color: string;
                };
                stroke: {
                    color: string;
                    width: number;
                };
                points: number;
                radius: number;
                angle: number;
            };
        }[];
        diamond: {
            star: {
                fill: {
                    color: string;
                };
                stroke: {
                    color: string;
                    width: number;
                };
                points: number;
                radius: number;
                angle: number;
            };
        }[];
        star: {
            star: {
                fill: {
                    color: string;
                };
                stroke: {
                    color: string;
                    width: number;
                };
                points: number;
                radius: number;
                radius2: number;
                angle: number;
            };
        }[];
        triangle: {
            star: {
                fill: {
                    color: string;
                };
                stroke: {
                    color: string;
                    width: number;
                };
                points: number;
                radius: number;
                angle: number;
            };
        }[];
        x: {
            star: {
                fill: {
                    color: string;
                };
                stroke: {
                    color: string;
                    width: number;
                };
                points: number;
                radius: number;
                radius2: number;
                angle: number;
            };
        }[];
    };
    export = _default;
}
declare module "ol3-symbolizer/styles/circle/alert" {
    var _default: {
        "circle": {
            "fill": {
                "color": string;
            };
            "opacity": number;
            "stroke": {
                "color": string;
                "width": number;
            };
            "radius": number;
        };
        "text": {
            "fill": {
                "color": string;
            };
            "stroke": {
                "color": string;
                "width": number;
            };
            "text": string;
            "offset-x": number;
            "offset-y": number;
            "font": string;
        };
    }[];
    export = _default;
}
declare module "ol3-symbolizer/styles/circle/gradient" {
    var _default: {
        "circle": {
            "fill": {
                "color": string;
                "gradient": string[];
            };
            "opacity": number;
            "stroke": {
                "color": string;
                "width": number;
            };
            "radius": number;
        };
    }[];
    export = _default;
}
declare module "ol3-symbolizer/styles/fill/cross" {
    var _default: {
        "fill": {
            "pattern": {
                "orientation": string;
                "color": string;
                "spacing": number;
                "repitition": string;
            };
        };
    }[];
    export = _default;
}
declare module "ol3-symbolizer/styles/fill/diagonal" {
    var _default: {
        "fill": {
            "pattern": {
                "orientation": string;
                "color": string;
                "spacing": number;
                "repitition": string;
            };
        };
    }[];
    export = _default;
}
declare module "ol3-symbolizer/styles/fill/gradient" {
    var _default: {
        "fill": {
            "gradient": {
                "type": string;
                "stops": string;
            };
        };
    }[];
    export = _default;
}
declare module "ol3-symbolizer/styles/fill/horizontal" {
    var _default: {
        "fill": {
            "pattern": {
                "orientation": string;
                "color": string;
                "spacing": number;
                "repitition": string;
            };
        };
    }[];
    export = _default;
}
declare module "ol3-symbolizer/styles/fill/vertical" {
    var _default: {
        "fill": {
            "pattern": {
                "orientation": string;
                "color": string;
                "spacing": number;
                "repitition": string;
            };
        };
    }[];
    export = _default;
}
declare module "ol3-symbolizer/styles/icon/png" {
    var _default: ({
        "circle": {
            "fill": {
                "gradient": {
                    "type": string;
                    "stops": string;
                };
            };
            "opacity": number;
            "stroke": {
                "color": string;
                "width": number;
            };
            "radius": number;
        };
    } | {
        "image": {
            "anchor": number[];
            "imgSize": number[];
            "anchorXUnits": string;
            "anchorYUnits": string;
            "src": string;
        };
    })[];
    export = _default;
}
declare module "ol3-symbolizer/styles/icon/svg" {
    var _default: {
        "image": {
            "imgSize": number[];
            "stroke": {
                "color": string;
                "width": number;
            };
            "path": string;
        };
    }[];
    export = _default;
}
declare module "ol3-symbolizer/styles/peace" {
    var _default: {
        "star": {
            "fill": {
                "color": string;
            };
            "opacity": number;
            "stroke": {
                "color": string;
                "width": number;
            };
            "radius": number;
            "radius2": number;
            "points": number;
        };
        "text": {
            "fill": {
                "color": string;
            };
            "stroke": {
                "color": string;
                "width": number;
            };
            "text": string;
            "offset-x": number;
            "offset-y": number;
            "font": string;
        };
    }[];
    export = _default;
}
declare module "ol3-symbolizer/styles/star/4star" {
    var _default: {
        "star": {
            "fill": {
                "color": string;
            };
            "opacity": number;
            "stroke": {
                "color": string;
                "width": number;
            };
            "radius": number;
            "radius2": number;
            "points": number;
        };
    }[];
    export = _default;
}
declare module "ol3-symbolizer/styles/star/6star" {
    var _default: {
        "star": {
            "fill": {
                "color": string;
            };
            "stroke": {
                "color": string;
                "width": number;
            };
            "radius": number;
            "radius2": number;
            "points": number;
        };
    }[];
    export = _default;
}
declare module "ol3-symbolizer/styles/star/cold" {
    var _default: {
        "star": {
            "fill": {
                "color": string;
            };
            "opacity": number;
            "stroke": {
                "color": string;
                "width": number;
            };
            "radius": number;
            "radius2": number;
            "points": number;
        };
    }[];
    export = _default;
}
declare module "ol3-symbolizer/styles/star/flower" {
    var _default: {
        "star": {
            "fill": {
                "color": string;
            };
            "opacity": number;
            "stroke": {
                "color": string;
                "width": number;
            };
            "radius": number;
            "radius2": number;
            "points": number;
        };
        "text": {
            "fill": {
                "color": string;
            };
            "stroke": {
                "color": string;
                "width": number;
            };
            "text": string;
            "offset-x": number;
            "offset-y": number;
            "font": string;
        };
    }[];
    export = _default;
}
declare module "ol3-symbolizer/styles/stroke/linedash" {
    var dasharray: {
        solid: string;
        shortdash: number[];
        shortdot: number[];
        shortdashdot: number[];
        shortdashdotdot: number[];
        dot: number[];
        dash: number[];
        longdash: number[];
        dashdot: number[];
        longdashdot: number[];
        longdashdotdot: number[];
    };
    export = dasharray;
}
declare module "ol3-symbolizer/styles/stroke/dash" {
    var _default: {
        "stroke": {
            "color": string;
            "width": number;
            "lineDash": number[];
        };
    }[];
    export = _default;
}
declare module "ol3-symbolizer/styles/stroke/dashdotdot" {
    var _default: {
        "stroke": {
            "color": string;
            "width": number;
            "lineDash": number[];
        };
    }[];
    export = _default;
}
declare module "ol3-symbolizer/styles/stroke/dot" {
    var _default: {
        "stroke": {
            "color": string;
            "width": number;
            "lineDash": number[];
        };
    }[];
    export = _default;
}
declare module "ol3-symbolizer/styles/stroke/solid" {
    var _default: {
        "stroke": {
            "color": string;
            "width": number;
        };
    }[];
    export = _default;
}
declare module "ol3-symbolizer/styles/text/text" {
    var _default: {
        "text": {
            "fill": {
                "color": string;
            };
            "stroke": {
                "color": string;
                "width": number;
            };
            "offset-x": number;
            "offset-y": number;
            "text": string;
            "font": string;
        };
    }[];
    export = _default;
}
declare module "ol3-symbolizer/tests/index" {
    export function run(): void;
}
