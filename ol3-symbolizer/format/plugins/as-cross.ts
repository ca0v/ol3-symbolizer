import { Format } from "../@types/formats";

export class Shapeshifter {
	/**
	 * @param style does this style represent a cross?
	 */
	static is(style: Format.Style) {
		//  "points": 4,"radius": >0,"radius2": 0,"angle": 0
		if (!style) return false;
		if (!!style.cross) return true;
		if (!style.star) return false;
		if (!style.star.radius) return false;
		if (4 !== style.star.points) return false;
		if (0 != style.star.radius2) return false;
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
			cross: {
				size: (star.radius || 24) * 2,
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
		let cross = style.cross;
		if (!cross) return style;

		return <Format.Style>{
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
	}
}
