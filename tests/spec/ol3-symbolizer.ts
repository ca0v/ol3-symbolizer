import { dasharray } from "../../ol3-symbolizer/styles/stroke/linedash";
import {
  should,
  shouldEqual,
  stringify,
} from "ol3-fun/tests/base";
import { StyleConverter } from "../../ol3-symbolizer/format/ol3-symbolizer";
import { Format } from "../../ol3-symbolizer/format/@types/formats";
import {
  Circle,
  RegularShape,
} from "ol/style";

describe("ol3-symbolizer", () => {
  let converter = new StyleConverter();

  describe("OL Format Tests", () => {
    it("Ensures interface does not break", () => {
      let circle = <Format.Circle>{};
      circle.fill;
      circle.opacity;
      circle.radius;
      circle.snapToPixel;
      circle.stroke;

      let color = <Format.Color>{};
      color == [1] || color == "";

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

  describe("OL StyleConverter API Tests", () => {
    it("StyleConverter API", () => {
      let converter =
        new StyleConverter();
      should(
        typeof converter.fromJson ===
          "function",
        "fromJson exists"
      );
      should(
        typeof converter.toJson ===
          "function",
        "toJson exists"
      );
    });
  });

  describe("OL StyleConverter Json Tests", () => {
    it("Circle Tests", () => {
      let baseline: Format.Style = {
        circle: {
          fill: {
            color:
              "rgba(197,37,84,0.90)",
          },
          opacity: 1,
          stroke: {
            color: "rgba(227,83,105,1)",
            width: 4.4,
          },
          radius: 7.3,
        },
        text: {
          fill: {
            color:
              "rgba(205,86,109,0.9)",
          },
          stroke: {
            color:
              "rgba(252,175,131,0.5)",
            width: 2,
          },
          text: "Test",
          "offset-x": 0,
          "offset-y": 20,
          font: "18px fantasy",
        },
      };

      let style =
        converter.fromJson(baseline);

      let circleStyle =
        style.getImage() as Circle;
      should(
        circleStyle !== null,
        "getImage returns a style"
      );
      shouldEqual(
        circleStyle.getRadius(),
        baseline.circle.radius,
        "getImage is a circle and radius"
      );

      let circleJson =
        converter.toJson(style);
      should(
        circleJson.circle !== null,
        "json contains a circle"
      );
      shouldEqual(
        circleJson.circle.radius,
        baseline.circle.radius,
        "circle radius"
      );
    });

    it("Star Tests", () => {
      let baseline: Format.Style = {
        star: {
          fill: {
            color: "rgba(54,47,234,1)",
          },
          stroke: {
            color:
              "rgba(75,92,105,0.85)",
            width: 4,
          },
          radius: 9,
          radius2: 0,
          points: 6,
        },
      };

      let style =
        converter.fromJson(baseline);

      let starStyle =
        style.getImage() as RegularShape;
      should(
        starStyle !== null,
        "getImage returns a style"
      );
      shouldEqual(
        starStyle.getRadius(),
        baseline.star.radius,
        "starStyle radius"
      );
      shouldEqual(
        starStyle.getRadius2(),
        baseline.star.radius2,
        "starStyle radius2"
      );
      shouldEqual(
        starStyle.getPoints(),
        baseline.star.points,
        "starStyle points"
      );

      let starJson =
        converter.toJson(style);
      should(
        starJson.star !== null,
        "json contains a star"
      );
      shouldEqual(
        starJson.star.radius,
        baseline.star.radius,
        "starJson radius"
      );
      shouldEqual(
        starJson.star.radius2,
        baseline.star.radius2,
        "starJson radius2"
      );
      shouldEqual(
        starJson.star.points,
        baseline.star.points,
        "starJson point count"
      ); // <-- failing, 3 != 6
    });

    it("Fill Test", () => {
      let baseline: Format.Style = {
        fill: {
          gradient: {
            type: "linear(200,0,201,0)",
            stops:
              "rgba(255,0,0,.1) 0%;rgba(255,0,0,0.8) 100%",
          },
        },
      };

      let style =
        converter.fromJson(baseline);
      let fillStyle = style.getFill();
      should(
        fillStyle !== null,
        "fillStyle exists"
      );
      let gradient =
        fillStyle.getColor() as CanvasGradient & {
          stops: string;
          type: string;
        }; // stops & type might be writeonly?
      shouldEqual(
        gradient.stops,
        baseline.fill.gradient.stops,
        "fillStyle color"
      );
      shouldEqual(
        gradient.type,
        baseline.fill.gradient.type,
        "fillStyle color"
      );
    });

    it("Stroke Test", () => {
      let baseline: Format.Style = {
        stroke: {
          color: "orange",
          width: 2,
          lineDash:
            dasharray.longdashdotdot,
        },
      };

      let style =
        converter.fromJson(baseline);
      let strokeStyle =
        style.getStroke();
      should(
        strokeStyle !== null,
        "strokeStyle exists"
      );
      shouldEqual(
        strokeStyle.getColor(),
        baseline.stroke.color,
        "strokeStyle color"
      );
      shouldEqual(
        strokeStyle.getWidth(),
        baseline.stroke.width,
        "strokeStyle width"
      );
      shouldEqual(
        strokeStyle
          .getLineDash()
          .join(),
        baseline.stroke.lineDash.join(),
        "strokeStyle lineDash"
      );
    });

    it("Text Test", () => {
      let baseline: Format.Style = {
        text: {
          fill: {
            color:
              "rgba(75,92,85,0.85)",
          },
          stroke: {
            color:
              "rgba(255,255,255,1)",
            width: 5,
          },
          "offset-x": 5,
          "offset-y": 10,
          offsetX: 15, // ignored, why are they here?
          offsetY: 20, // ignored, why are they here?
          text: "fantasy light",
          font: "18px serif",
        },
      };

      let style =
        converter.fromJson(baseline);
      let textStyle = style.getText();
      should(
        textStyle !== null,
        "textStyle exists"
      );
      shouldEqual(
        textStyle.getFill().getColor(),
        baseline.text.fill.color,
        "textStyle text color"
      );
      shouldEqual(
        textStyle.getText(),
        baseline.text.text,
        "textStyle text"
      );
      shouldEqual(
        textStyle.getOffsetX(),
        baseline.text["offset-x"],
        "textStyle color"
      );
      shouldEqual(
        textStyle.getOffsetY(),
        baseline.text["offset-y"],
        "textStyle color"
      );
      shouldEqual(
        textStyle.getFont(),
        baseline.text.font,
        "textStyle font"
      );
    });
  });

  describe("OL Basic shapes", () => {
    it("cross, square, diamond, star, triangle, x", () => {
      let cross = {
        star: {
          opacity: 0.5,
          fill: {
            color: "red",
          },
          stroke: {
            color: "black",
            width: 2,
          },
          points: 4,
          radius: 10,
          radius2: 0,
          angle: 0,
        },
      };

      let square = {
        star: {
          fill: {
            color: "red",
          },
          stroke: {
            color: "black",
            width: 2,
          },
          points: 4,
          radius: 10,
          angle: 0.7853981633974483,
        },
      };

      let diamond = {
        star: {
          fill: {
            color: "red",
          },
          stroke: {
            color: "black",
            width: 2,
          },
          points: 4,
          radius: 10,
          angle: 0,
        },
      };

      let star = {
        star: {
          fill: {
            color: "red",
          },
          stroke: {
            color: "black",
            width: 2,
          },
          points: 5,
          radius: 10,
          radius2: 4,
          angle: 0,
        },
      };

      let triangle = {
        star: {
          fill: {
            color: "red",
          },
          stroke: {
            color: "black",
            width: 2,
          },
          points: 3,
          radius: 10,
          angle: 0,
        },
      };

      let x = {
        star: {
          fill: {
            color: "red",
          },
          stroke: {
            color: "black",
            width: 2,
          },
          points: 4,
          radius: 10,
          radius2: 0,
          angle: 0.7853981633974483,
        },
      };

      let crossJson = converter.toJson(
        converter.fromJson(cross)
      );
      let squareJson = converter.toJson(
        converter.fromJson(square)
      );
      let diamondJson =
        converter.toJson(
          converter.fromJson(diamond)
        );
      let starJson = converter.toJson(
        converter.fromJson(star)
      );
      let triangleJson =
        converter.toJson(
          converter.fromJson(triangle)
        );
      let xJson = converter.toJson(
        converter.fromJson(x)
      );

      // the above re-translations should be now be in a friendlier encoding
      // likewise fromJson should work on the following:
      // {cross: {size: 10}}
      // {square: {size: 10}}
      // {diamond: {size: 10}}
      // {star: {size: 10}}
      // {triangle: {size: 10}}
      // {x: {size: 10}}
      // the usecase being a simplification of styling
      /**
       * Before going too far down this road, remind yourself of the ogc styling used by geoserver...I recall it was
       * terse and powerful and css-like and ol probably has support for it already
       */

      should(
        !!crossJson.cross,
        "cross exists"
      );
      shouldEqual(
        crossJson.cross.size,
        cross.star.radius * 2,
        "cross size"
      );

      should(
        !!squareJson.square,
        "square exists"
      );
      shouldEqual(
        squareJson.square.size,
        square.star.radius * 2,
        "square size"
      );

      should(
        !!diamondJson.diamond,
        "diamond exists"
      );
      shouldEqual(
        diamondJson.diamond.size,
        diamond.star.radius * 2,
        "diamond size"
      );

      should(
        !!triangleJson.triangle,
        "triangle exists"
      );
      shouldEqual(
        triangleJson.triangle.size,
        triangle.star.radius * 2,
        "triangle size"
      );

      should(!!xJson.x, "x exists");
      shouldEqual(
        xJson.x.size,
        x.star.radius * 2,
        "x size"
      );

      let items = {
        crossJson,
        squareJson,
        diamondJson,
        triangleJson,
        xJson,
      };

      Object.keys(items).forEach(
        (k) => {
          shouldEqual(
            stringify(
              converter.toJson(
                converter.fromJson(
                  items[k]
                )
              )
            ),
            stringify(items[k]),
            `${k} json->style->json`
          );
        }
      );
    });
  });

  describe("OL NEXT", () => {
    it("NEXT", () => {});
  });
});
