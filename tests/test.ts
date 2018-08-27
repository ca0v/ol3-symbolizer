import { should } from "./base";
// import { describe, it } from "mocha"; // not available via require-js but...
// available in mocha cli via karma (magically I guess)
declare var describe: any;
declare var it: any;

import { StyleConverter, Format } from "../ol3-symbolizer/format/ol3-symbolizer";
import ol = require("openlayers");

describe("format/ol3-symbolizer", function () {
    it("toJson and fromJson", function () {
        let converter = new StyleConverter();

        var style1 = new ol.style.Style();
        style1.setImage(new ol.style.Circle({ radius: 10 }));
        let json1 = converter.toJson(style1);
        console.log(JSON.stringify(json1));

        should(10 === json1.star.radius, `circle->json: ${JSON.stringify(json1)}`);
        let json2 = converter.toJson(converter.fromJson(json1));
        should(10 === json2.star.radius, "json->fromJson->toJson matches");
    });
});
