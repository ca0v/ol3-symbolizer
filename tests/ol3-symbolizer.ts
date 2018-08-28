import { describe, it, should, shouldEqual } from "./base";

import { Format, StyleConverter } from "../ol3-symbolizer/format/ol3-symbolizer";

describe("Format Tests", () => {

    it("Ensures interface does not break", () => {
        let circle = <Format.Circle>{};
        circle.fill;
        circle.opacity;
        circle.radius;
        circle.snapToPixel;
        circle.stroke;

        let color = <Format.Color>{};
        color === [1] || color == "";

        let fill = <Format.Fill>{};
        fill.color;
        fill.gradient;
        fill.image;
        fill.pattern;

        let icon = <Format.Icon>{};
        icon["anchor-x"];
        icon["anchor-y"];
        icon.anchor;
        icon.anchorOrigin;
        icon.anchorXUnits;
        icon.anchorYUnits;
        icon.color;
        icon.crossOrigin;
        icon.offset;
        icon.offsetOrigin;
        icon.opacity;
        icon.rotateWithView;
        icon.rotation;
        icon.scale;
        icon.size;
        icon.snapToPixel;
        icon.src;

        let image = <Format.Image>{};
        image.opacity;
        image.rotateWithView;
        image.rotation;
        image.scale;
        image.snapToPixel;

        // etc.
    });


});

describe("StyleConverter API Tests", () => {

    it("StyleConverter API", () => {
        let converter = new StyleConverter();
        should(typeof converter.fromJson === "function", "fromJson exists");
        should(typeof converter.toJson === "function", "toJson exists");
    });

});

describe("StyleConverter Json Tests", () => {

    let converter = new StyleConverter();

    it("Circle Tests", () => {
        let style = converter.fromJson({
            circle: {
                radius: 10
            }
        });

        let circleStyle = style.getImage() as ol.style.Circle;
        should(circleStyle !== null, "getImage returns a style");
        should(circleStyle.getRadius() === 10, "getImage is a circle and radius is correct");

        let circleJson = converter.toJson(style);
        should(circleJson.circle !== null, "json contains a circle");
        should(circleJson.circle.radius === 10, "circle radius is correct");
    });

    it("Star Tests", () => {
        let baseline = <Format.Style>{
            star: {
                radius: 10,
                radius2: 5,
                points: 10, // must be even
            }
        };

        let style = converter.fromJson(baseline);

        let starStyle = style.getImage() as ol.style.RegularShape;
        should(starStyle !== null, "getImage returns a style");
        shouldEqual(starStyle.getRadius(), baseline.star.radius, "getImage is a star and radius is correct");

        let starJson = converter.toJson(style);
        should(starJson.star !== null, "json contains a star");
        shouldEqual(starJson.star.radius, baseline.star.radius, "star radius is correct");
        shouldEqual(starJson.star.radius2, baseline.star.radius2, "star radius2 is correct");
        shouldEqual(starJson.star.points, baseline.star.points, "star point count is correct");
    });

});

describe("", () => {
    it("", () => {
    });
});

describe("", () => {
    it("", () => {
    });
});