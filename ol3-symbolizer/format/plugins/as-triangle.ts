import { Format } from "../@types/formats";

export class Shapeshifter {

    /**
     * @param style does this style represent a triangle?
     */
    static is(style: Format.Style) {
        if (!style) return false;
        if (!!style.triangle) return true;
        if (!style.star) return false;
        if (!style.star.radius) return false;
        if (3 !== style.star.points) return false;
        if (undefined != style.star.radius2) return false;
        if (0 != style.star.angle) return false;
        return true;
    }

    /**
     * 
     * @param style return this style as a cross json encoding
     */
    static as(style: Format.Style) {
        let star = style.star;
        if (!star) throw "star expected";
        
        let result: Format.Style = {
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
    }

    static inverse(style: Format.Style) {
        let triangle = style.triangle;
        if (!triangle) return style;

        return <Format.Style>{
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
    }

}