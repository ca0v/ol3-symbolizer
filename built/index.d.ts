/// <reference path="../typings/index.d.ts" />
declare module "ajax" {
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
declare module "ags-catalog" {
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
declare module "format/base" {
    export interface IConverter<T> {
        fromJson: (json: T) => ol.style.Style;
        toJson(style: ol.style.Style): T;
    }
}
declare module "format/ol3-symbolizer" {
    import Serializer = require("format/base");
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
        interface Svg extends Image {
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
declare module "format/ags-symbolizer" {
    export namespace ArcGisFeatureServerLayer {
        type SpatialReference = {
            wkid: string;
        };
        type Extent = {
            xmin: number;
        };
        type Styles = "esriSMSCircle" | "esriSMSCross" | "esriSMSDiamond" | "esriSMSPath" | "esriSLSSolid" | "esriSMSSquare" | "esriSMSX"
            | "esriSFSSolid" | "esriSFSForwardDiagonal"
            | "esriSLSDot" | "esriSLSDash" | "esriSLSDashDot" | "esriSLSDashDotDot";
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
declare module "arcgis-source" {
    import ol = require("openlayers");
    export interface IOptions extends olx.source.VectorOptions {
        services: string;
        serviceName: string;
        map: ol.Map;
        layers: number[];
        tileSize: number;
    }
    export class ArcGisVectorSourceFactory {
        static create(options: IOptions): JQueryDeferred<ol.layer.Vector[]>;
    }
}
declare module "labs/index" {
    export function run(): void;
}
declare module "tests/index" {
    export function run(): void;
}
