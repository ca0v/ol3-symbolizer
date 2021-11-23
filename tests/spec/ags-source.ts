import { shouldEqual } from "ol3-fun/tests/base";
import { ArcGisVectorSourceFactory } from "../../ol3-symbolizer/ags/ags-source";
import { debounce } from "ol3-fun/ol3-fun/common";
import { TileDebug } from "ol/source";
import { createXYZ } from "ol/tilegrid";
import Map from "ol/Map";
import { Tile as TileLayer } from "ol/layer";
import View from "ol/View";
import { unByKey } from "ol/Observable";

describe("ags-source tests", () => {
  it("ArcGisVectorSourceFactory", (done) => {
    // attempting to create a mock map
    let source = new TileDebug({
      projection: "EPSG:3857",
      tileGrid: createXYZ({
        tileSize: 256,
      }),
    });

    let map = new Map({
      target: "map",
      layers: [
        new TileLayer({
          source: source,
        }),
      ],
      view: new View({
        center: [-12826838, 4326274],
        zoom: 5,
        projection: "EPSG:3857",
      }),
    });

    ArcGisVectorSourceFactory.create({
      services:
        "http://localhost:3001/mock/ags/rest/services",
      serviceName:
        "ANNOTATIONS/IPS_ANNOTATIONS_US",
      serviceType: "FeatureServer",
      map: map,
      layers: [3],
      where: "H8REGION IN ('GREEN')",
      // etc
    }).done((layers) => {
      layers.forEach((l) => {
        let source = l.getSource();
        let h = source.on(
          "change",
          debounce(() => {
            let features =
              source.getFeatures(); //.filter(f => f.get("H8REGION") === "GREEN");
            shouldEqual(
              3,
              features.length
            );
            let ids = new Set(
              features.map((f) =>
                f.get("OBJECTID")
              )
            );
            shouldEqual(3, ids.size);
            unByKey(<any>h);
            done();
          })
        );
      });
      layers.forEach((l) =>
        map.addLayer(<any>l)
      );
    });
  });
});
