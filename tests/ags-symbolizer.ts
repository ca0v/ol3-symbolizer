import { describe, it, should, shouldEqual } from "./base";

import { ArcGisFeatureServerLayer, StyleConverter } from "../ol3-symbolizer/format/ags-symbolizer";

describe("API Tests", () => {

    it("StyleConverter API", () => {
        let converter = new StyleConverter();
        should(typeof converter.fromJson === "function", "fromJson exists");
        should(typeof converter.fromRenderer === "function", "fromRenderer exists");
        // toJson doesn't make sense because this is an ol solution (ags styles won't exist), use toJson on the ol-symbolizer instead
    });

});

describe("Circle Tests", () => {

    let converter = new StyleConverter();

    it("Circle 1", () => {
        let baseline = <ArcGisFeatureServerLayer.Symbol>{
            "color": [
                255,
                255,
                255,
                64
            ],
            "size": 12,
            "angle": 0,
            "xoffset": 0,
            "yoffset": 0,
            "type": "esriSMS",
            "style": "esriSMSCircle",
            "outline": {
                "color": [
                    0,
                    0,
                    0,
                    255
                ],
                "width": 1,
                "type": "esriSLS",
                "style": "esriSLSSolid"
            }
        };

        let style = converter.fromJson(baseline);

        let circleStyle = style.getImage() as ol.style.Circle;
        should(circleStyle !== null, "getImage returns a style");
        let expectedRadius = (baseline.size * 4 / 3) / 2;
        shouldEqual(circleStyle.getRadius(), expectedRadius, "circleStyle radius is 33% larger than specified in the ags style (see StyleConverter.asWidth)");

    });


});

