import { describe, it, should, shouldEqual, stringify } from "ol3-fun/tests/base";

import { StyleConverter } from "../ol3-symbolizer/format/ags-symbolizer";
import { StyleConverter as ToJsonConverter } from "../ol3-symbolizer/format/ol3-symbolizer";
import { ArcGisFeatureServerLayer } from "../ol3-symbolizer/format/@types/ArcGisFeatureServerLayer";

let fromJson = (() => {
	let fromJsonConverter = new StyleConverter();
	return (style: ArcGisFeatureServerLayer.Symbol) => fromJsonConverter.fromJson(style);
})();

let toJson = (() => {
	let toJsonConverter = new ToJsonConverter();
	return (style: ol.style.Style) => toJsonConverter.toJson(style);
})();

function rgba([r, g, b, a]: number[]) {
	return `rgba(${r},${g},${b},${a / 255})`;
}

describe("esriSMS Tests", () => {
	it("esriSMSCircle", () => {
		let baseline = <ArcGisFeatureServerLayer.Symbol>{
			color: [255, 255, 255, 64],
			size: 12,
			angle: 0,
			xoffset: 0,
			yoffset: 0,
			type: "esriSMS",
			style: "esriSMSCircle",
			outline: {
				color: [0, 0, 0, 255],
				width: 1,
				type: "esriSLS",
				style: "esriSLSSolid"
			}
		};

		let style = fromJson(baseline);
		let circleJson = toJson(style);

		let expectedRadius = (baseline.size * 4) / 3 / 2;
		shouldEqual(
			circleJson.circle.radius,
			expectedRadius,
			"circleJson radius is 33% larger than specified in the ags style (see StyleConverter.asWidth)"
		);

		shouldEqual(circleJson.circle.fill.color, rgba(baseline.color), "circleJson fill color");
		shouldEqual(circleJson.circle.fill.pattern, null, "circleJson fill pattern is solid");

		shouldEqual(circleJson.circle.stroke.color, rgba(baseline.outline.color), "circleJson stroke color");
		shouldEqual(circleJson.circle.stroke.width, (baseline.outline.width * 4) / 3, "circleJson stroke width");
		shouldEqual(circleJson.circle.stroke.lineCap, undefined, "circleJson stroke lineCap");
		shouldEqual(circleJson.circle.stroke.lineDash, undefined, "circleJson stroke lineDash");
		shouldEqual(circleJson.circle.stroke.lineJoin, undefined, "circleJson stroke lineJoin");
	});

	it("esriSMSCross", () => {
		let baseline = <ArcGisFeatureServerLayer.Symbol>{
			color: [255, 255, 255, 64],
			size: 12,
			angle: 0,
			xoffset: 0,
			yoffset: 0,
			type: "esriSMS",
			style: "esriSMSCross",
			outline: {
				color: [0, 0, 0, 255],
				width: 1,
				type: "esriSLS",
				style: "esriSLSSolid"
			}
		};
		let json = toJson(fromJson(baseline));

		should(!!json.cross, "cross");
		shouldEqual(json.cross.opacity, 1, "opacity");
		shouldEqual(json.cross.size, 22.62741699796952, "size"); // no idea why, but let me know if it changes :)
	});
});

describe("esriSLS Tests", () => {
	it("esriSLSShortDash esriLCSSquare esriLJSRound", () => {
		let baseline: ArcGisFeatureServerLayer.Symbol = {
			type: "esriSLS",
			style: "esriSLSShortDash",
			color: [152, 230, 0, 255],
			width: 1,
			cap: "esriLCSSquare",
			join: "esriLJSRound",
			miterLimit: 9.75
		};

		let style = fromJson(baseline);
		let json = toJson(style);
		shouldEqual(json.stroke.color, rgba(baseline.color), "stroke color");
	});

	it("esriSLSDash esriLCSButt esriLJSBevel", () => {
		let baseline: ArcGisFeatureServerLayer.Symbol = {
			type: "esriSLS",
			style: "esriSLSDash",
			color: [152, 230, 0, 255],
			width: 1,
			cap: "esriLCSButt",
			join: "esriLJSBevel",
			miterLimit: 9.75
		};

		let style = fromJson(baseline);
		let json = toJson(style);
		shouldEqual(json.stroke.color, rgba(baseline.color), "stroke color");
	});

	it("esriSLSSolid esriLCSRound esriLJSMiter", () => {
		let baseline: ArcGisFeatureServerLayer.Symbol = {
			type: "esriSLS",
			style: "esriSLSSolid",
			color: [152, 230, 0, 255],
			width: 1,
			cap: "esriLCSRound",
			join: "esriLJSMiter",
			miterLimit: 9.75
		};

		let style = fromJson(baseline);
		let json = toJson(style);
		shouldEqual(json.stroke.color, rgba(baseline.color), "stroke color");
	});
});
