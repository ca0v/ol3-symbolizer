import $ = require("jquery");
import { describe, it, should, shouldEqual, stringify } from "ol3-fun/tests/base";
import { ArcGisVectorSourceFactory } from "../../ol3-symbolizer/ags/ags-source";

// 1st attempt at mocking $.ajax -- to be moved to ol-fun if it works
function mock(args: { respond: (data: any) => any }) {
	let original = $.ajax;

	$.ajax = (url: string | JQuery.AjaxSettings, settings?: JQuery.AjaxSettings) => {
		debugger;
		let response = args.respond({ url, settings });
		let d = $.Deferred();
		d.resolve(response);
		return <JQuery.jqXHR>d.promise();
	};

	return () => ($.ajax = original);
}

describe("ags-source tests", () => {
	it("ArcGisVectorSourceFactory", done => {
		let map = <ol.Map>{};

		// setup a mock response

		let unmock = mock({
			respond: data => {
				return;
			}
		});

		ArcGisVectorSourceFactory.create({
			services: "",
			serviceName: "",
			serviceType: "FeatureServer",
			map: map,
			layers: [3]
			// etc
		}).done(layers => {
			layers.forEach(l => {
				let source = l.getSource();
				shouldEqual(3, source.getFeatures().length);
				unmock();
				done();
			});
		});
	});
});
