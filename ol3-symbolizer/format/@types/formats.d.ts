export namespace Format {

    export type Color = number[] | string;
    export type Size = number[];
    export type Offset = number[];
    export type LineDash = number[];

    export interface Fill {
        color?: string;
        gradient?: {
            type?: string;
            stops?: string;
        };
        pattern?: {
            color?: any;
            orientation?: "backward" | "forward" | "diagonal" | "horizontal" | "vertical" | "cross";
            spacing?: number;
            repitition?: string;
        };
        image?: {
            src?: any;
            imageData?: string;
            imgSize?: Size;
            "anchor-x": any;
            "anchor-y": any;
        };
    }

    export interface Stroke {
        color?: string;
        width?: number;
        lineCap?: string;
        lineJoin?: string;
        lineDash?: LineDash;
        miterLimit?: number;
    }

    export interface Style {
        //geometry?: string | ol.geom.Geometry | ol.style.GeometryFunction;
        fill?: Fill;
        image?: Image & Icon & Svg;
        stroke?: Stroke;
        text?: Text;
        zIndex?: number;
    }

    export interface Image {
        opacity?: number;
        rotateWithView?: boolean;
        rotation?: number;
        scale?: number;
        snapToPixel?: boolean;
    }

    export interface Circle {
        radius: number;
        stroke?: Stroke;
        fill?: Fill;
        snapToPixel?: boolean;
    }

    export interface Star extends Image {
        angle?: number;
        fill?: Fill;
        points?: number;
        stroke?: Stroke;
        radius?: number;
        radius2?: number;
    }

    export interface Icon extends Image {
        anchor?: Offset;
        anchorOrigin?: "bottom-left" | "bottom-right" | "top-left" | "top-right";
        anchorXUnits?: "fraction" | "pixels";
        anchorYUnits?: "fraction" | "pixels";
        color?: Color;
        crossOrigin?: string;
        src?: string; // same as img.src?
        offset?: Offset;
        offsetOrigin?: 'top_left' | 'top_right' | 'bottom-left' | 'bottom-right';
        size?: Size; // same as image size?
    }

    export interface Text {
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

// these are extensions from ol3
export namespace Format {

    export interface Style {
        image?: Image & Icon & Svg; // if 'image' specified must auto-detect icon or svg 
        icon?: Icon;
        svg?: Svg;
        star?: Star;
        circle?: Circle;
        text?: Text;
        fill?: Fill;
        stroke?: Stroke;
        cross?: Image & {
            size: number; 
            fill?: Fill;
            stroke?: Stroke;
        };
        square?: Image & {
            size: number; 
            fill?: Fill;
            stroke?: Stroke;
        };
        diamond?: Image & {
            size: number; 
            fill?: Fill;
            stroke?: Stroke;
        };
        triangle?: Image & {
            size: number; 
            fill?: Fill;
            stroke?: Stroke;
        };
        x?: Image & {
            size: number; 
            fill?: Fill;
            stroke?: Stroke;
        };
    }

    export interface Icon {
        "anchor-x"?: number;
        "anchor-y"?: number;
    }

    export interface Text {
        "offset-x"?: number;
        "offset-y"?: number;
    }

    export interface Circle {
        opacity?: number;
    }

    // icon + path - src    
    export interface Svg {
        anchor?: Offset;
        anchorOrigin?: "bottom-left" | "bottom-right" | "top-left" | "top-right";
        anchorXUnits?: "fraction" | "pixels";
        anchorYUnits?: "fraction" | "pixels";
        color?: Color;
        crossOrigin?: string;
        img?: string;
        imgSize?: Size;
        offset?: Offset;
        offsetOrigin?: 'top_left' | 'top_right' | 'bottom-left' | 'bottom-right';
        path?: string;
        stroke?: Stroke;
        fill?: Fill;
        rotation?: number;
    }

}

