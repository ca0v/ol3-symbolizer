import { should } from "should";

import Style from "ol/style/Style";
import { assign } from "../ol3-symbolizer/common/assign";
import { mixin } from "../ol3-symbolizer/common/mixin";
import { defaults } from "../ol3-symbolizer/common/defaults";

describe("assign tests", function () {
    it("assign empty", function () {
        // todo: how to use should to expect an exception?
    });

    it("assign number", function () {
        let target = <any>{};
        assign(target, "a", 100);
        should.assert(target.a === 100); // how to show message on failure?
    });

    it("assign object", function () {
        let target = <any>{};
        assign(target, "a", { "a": 100 });
        should.assert(target.a.a === 100); // how to show message on failure?
    });
});

describe("defaults tests", () => {

    it("defaults number", () => {
        should.assert(defaults({}, { a: 100 }).a === 100);
        should.assert(defaults(defaults({}, { a: 100 }), { a: 200 }).a === 100);
        let a = defaults({}, {a: 1});
        should.assert(a === defaults(a, {a: 2}));
    });

});

describe("mixin tests", () => {

    it("mixin number", () => {
        should.assert(mixin({}, { a: 100 }).a === 100);
        should.assert(mixin(mixin({}, { a: 100 }), { a: 200 }).a === 200);
        let a = mixin({}, {a: 1});
        should.assert(a === mixin(a, {a: 2}));
    });

});

describe("test accessing openlayers using webpack", function () {
    it("log ol.style.Style", function () {
        should.assert(!!Style);
        console.log(Style.toString());
    });
});

