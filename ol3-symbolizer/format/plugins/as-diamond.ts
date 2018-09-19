import { Format } from "../@types/formats";

export class Shapeshifter {
	/**
	 * @param style does this style represent a diamond?
	 */
	static is(style: Format.Style) {
		//  "points": 4,"radius": >0,"radius2": 0,"angle": 0
		if (!style) return false;
		if (!!style.diamond) return true;
		if (!style.star) return false;
		if (!style.star.radius) return false;
		if (4 !== style.star.points) return false;
		if (undefined !== style.star.radius2) return false;
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
			diamond: {
				size: (star.radius || 24) * 2,
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
	}

	static inverse(style: Format.Style) {
		let diamond = style.diamond;
		if (!diamond) return style;

		return <Format.Style>{
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
	}
}
