import { Format } from "../@types/formats";

export class Shapeshifter {

    /**
     * @param style does this style represent a X?
     */
    static is(style: Format.Style) {
        if (!style) return false;
        if (!!style.x) return true;
        if (!style.star) return false;
        if (!style.star.radius) return false;
        if (4 !== style.star.points) return false;
        if (0 != style.star.radius2) return false;
        if (0.7853981633974483 != style.star.angle) return false;
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
    }

    static inverse(style: Format.Style) {
        let x = style.x;
        if (!x) return style;

        return <Format.Style>{
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
    }

}