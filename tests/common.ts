declare var window: any;
/**
// ol/style/Style will only load when using webpack...the common-js syntax isn't amd-compatible and 
// TSC may transpile most of this code but with the ".js" in the MID's it might not work and some commonjs syntax in dependent projects won't work w/ TSC
// I tried @babel/plugin-transform-modules-amd but it also preserves the ".js" extensions so I might be stuck with webpack or rollup for concatination.
// There is a legacy build process that will produce ol.js (600kb), which can be used for AMD tests but not webpack
// SUMMARY: use ol.js for AMD, use node_modules/ol for webpack until ol is converted to ts, at which point
// I'll have the option of doing module-based builds akin to webpack...other options is to modify TSC to build commonjs
// and then transpile again via webpack.  That's probably the best option for 2018.import { should } from "should";
 */
import Style from "ol/style/Style";


import { assign } from "../ol3-symbolizer/common/assign";
import { mixin } from "../ol3-symbolizer/common/mixin";
import { defaults } from "../ol3-symbolizer/common/defaults";
import { should } from "./base";

describe("assign tests", function () {
    it("assign empty", function () {
        // todo: how to use should to expect an exception?
    });

    it("assign number", function () {
        let target = <any>{};
        assign(target, "a", 100);
        should(target.a === 100, ""); // how to show message on failure?
    });

    it("assign object", function () {
        let target = <any>{};
        assign(target, "a", { "a": 100 });
        should(target.a.a === 100, ""); // how to show message on failure?
    });
});

describe("defaults tests", () => {

    it("defaults number", () => {
        should(defaults({}, { a: 100 }).a === 100, "");
        should(defaults(defaults({}, { a: 100 }), { a: 200 }).a === 100, "");
        let a = defaults({}, { a: 1 });
        should(a === defaults(a, { a: 2 }), "");
    });

});

describe("mixin tests", () => {

    it("mixin number", () => {
        should(mixin({}, { a: 100 }).a === 100, "");
        should(mixin(mixin({}, { a: 100 }), { a: 200 }).a === 200, "");
        let a = mixin({}, { a: 1 });
        should(a === mixin(a, { a: 2 }), "");
    });

});

!window["require"] && describe("test accessing openlayers using webpack", function () {
    it("log ol.style.Style", function () {
        should(!!Style, "");
        console.log(Style.toString());
    });
});

describe("test accessing openlayers using amd", function () {
    it("log ol.style.Style", function () {
        require(["openlayers"], (ol: any) => {
            let style = ol.style.Style;
            should(!!style, "");
            console.log(style.toString());
        });
    });
});

