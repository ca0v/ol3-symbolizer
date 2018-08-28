import { StyleTypes, SymbolTypes } from "../../ags/@types/cataloginfo";
/**
 * Need a single definition, prefer the one in ags-catalog
 */
export namespace ArcGisFeatureServerLayer {
    export type SpatialReference = {
        wkid: string;
    };
    export type Extent = {
        xmin: number;
    };
    export type Color = number[];
    export interface AdvancedQueryCapabilities {
        supportsPagination: boolean;
        supportsStatistics: boolean;
        supportsOrderBy: boolean;
        supportsDistinct: boolean;
    }
    export interface Outline {
        style?: StyleTypes;
        color?: number[];
        width?: number;
        type?: SymbolTypes;
        d?: Date;
    }
    export interface Font {
        weight: string;
        style: string;
        family: string;
        size: number;
    }
    export interface Symbol {
        type: SymbolTypes;
        style?: StyleTypes;
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
        cap?: "esriLCSButt" | "esriLCSRound" | "esriLCSSquare";
        join?: "esriLJSBevel" | "esriLJSMiter" | "esriLJSRound";
        miterLimit?: number;
    }
    export interface UniqueValueInfo {
        symbol: Symbol;
        value?: string;
        label?: string;
        description?: string;
    }
    export interface VisualVariable {
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
    export interface ClassBreakInfo {
        symbol: Symbol;
        classMaxValue: number;
    }
    export interface Renderer extends Attributes {
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
    export interface ClassBreakRenderer extends Renderer {
        field?: string;
        minValue?: number;
        classBreakInfos?: ClassBreakInfo[];
        visualVariables?: VisualVariable[];
        authoringInfo: {
            visualVariables: VisualVariable[];
        };
    }
    export interface DrawingInfo {
        renderer: Renderer;
        transparency?: number;
        labelingInfo?: any;
    }
    export interface CodedValue {
        name: string;
        code: string;
    }
    export interface Domain {
        type: string;
        name: string;
        codedValues: CodedValue[];
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
    }
    export interface Attributes {
        [attribute: string]: any;
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