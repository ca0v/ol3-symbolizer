/**
 * See https://openlayers.org/en/latest/examples/vector-esri.html
 * Ultimately this will only query for features it does not already have
 * It will make use the map SRS and the resulttype="tile" and exceededTransferLimit
 * See https://github.com/ca0v/ol3-lab/issues/4
 */

import { Catalog } from "./ags-catalog";
import { StyleConverter } from "../format/ags-symbolizer";
import { defaults } from "ol3-fun/index";
import Map from "ol/map";
import { EsriJSON } from "ol/format";
import Vector, {
  Options as VectorOptions,
} from "ol/source/Vector";
import { createXYZ } from "ol/tilegrid";
import { tile as tileLoadingStrategy } from "ol/loadingstrategy";
import { Vector as VectorLayer } from "ol/layer";
import { Extent } from "ol/extent";
import Projection from "ol/proj/Projection";
import { FeatureLike } from "ol/Feature";
import { Style } from "ol/style";
const esrijsonFormat = new EsriJSON();

function asParam(options: any) {
  return Object.keys(options)
    .map((k) => `${k}=${options[k]}`)
    .join("&");
}

export interface IOptions
  extends VectorOptions {
  services: string;
  serviceName: string;
  serviceType:
    | "FeatureServer"
    | "MapServer";
  map: Map;
  layers: number[];
  tileSize?: number;
  where?: string;
  uidFieldName?: string;
}

const DEFAULT_OPTIONS = <IOptions>{
  tileSize: 512,
  where: "1=1",
};

export class ArcGisVectorSourceFactory {
  static create(options: IOptions) {
    let d =
      $.Deferred<VectorLayer<any>[]>();

    options = defaults(
      options,
      DEFAULT_OPTIONS
    );

    let srs = options.map
      .getView()
      .getProjection()
      .getCode()
      .split(":")
      .pop();

    let all = options.layers.map(
      (layerId) => {
        let d =
          $.Deferred<
            VectorLayer<any>
          >();

        let tileGrid = createXYZ({
          tileSize: options.tileSize,
        });

        let strategy =
          tileLoadingStrategy(tileGrid);

        let loader = (
          extent: Extent,
          resolution: number,
          projection: Projection
        ) => {
          // current loading strategy isn't being clever enough?  Getting duplicates.
          // see ol.source.Vector.prototype.loadFeatures (it keeps history of extents)

          let box = {
            xmin: extent[0],
            ymin: extent[1],
            xmax: extent[2],
            ymax: extent[3],
          };

          let params = {
            f: "json",
            returnGeometry: true,
            spatialRel:
              "esriSpatialRelIntersects",
            geometry:
              encodeURIComponent(
                JSON.stringify(box)
              ),
            geometryType:
              "esriGeometryEnvelope",
            resultType: "tile",
            where: options.where
              ? encodeURIComponent(
                  options.where
                )
              : "",
            inSR: srs,
            outSR: srs,
            outFields: "*",
          };

          let query = `${
            options.services
          }/${options.serviceName}/${
            options.serviceType
          }/${layerId}/query?${asParam(
            params
          )}`;

          $.ajax({
            url: query,
            dataType: "jsonp",
            error: () => {
              debugger;
            },
            success: (response: {
              error: any;
              fields: Array<{
                alias: string;
                name: string;
                type: string;
              }>;
            }) => {
              if (response.error) {
                console.warn(
                  response.error
                    .message +
                    "\n" +
                    response.error.details.join(
                      "\n"
                    )
                );
              } else {
                // dataProjection will be read from document
                var features =
                  esrijsonFormat.readFeatures(
                    response,
                    <any>{
                      featureProjection:
                        projection,
                      dataProjection:
                        projection,
                    }
                  );
                // if we've defined a primary key we can ignore duplicates
                if (
                  !options.uidFieldName &&
                  response.fields
                ) {
                  let oidField =
                    response.fields.filter(
                      (f) =>
                        f.type ===
                        "esriFieldTypeOID"
                    )[0];
                  if (oidField) {
                    options.uidFieldName =
                      oidField.name;
                  }
                }
                if (features.length) {
                  if (
                    options.uidFieldName
                  ) {
                    let uidFieldName =
                      options.uidFieldName;
                    // TODO: very likely source.getFeatureById is faster...
                    let featureIds =
                      source
                        .getFeatures()
                        .map((f) =>
                          f.get(
                            uidFieldName
                          )
                        )
                        .filter(
                          (v) => !!v
                        )
                        .sort();
                    let uniqueFeatures =
                      features.filter(
                        (f) =>
                          -1 ===
                          featureIds.indexOf(
                            f.get(
                              uidFieldName
                            )
                          )
                      );
                    source.addFeatures(
                      <any>(
                        uniqueFeatures
                      )
                    );
                  } else {
                    // add remaining features;
                    source.addFeatures(
                      <any>features
                    );
                  }
                }
              }
            },
          });
        };

        let source = new Vector(<any>{
          strategy: strategy,
          loader: loader,
          wrapX: false,
        });

        let catalog = new Catalog(
          `${options.services}/${options.serviceName}/${options.serviceType}`
        );
        let converter =
          new StyleConverter();

        catalog
          .aboutLayer(layerId)
          .then((layerInfo) => {
            let layer = new VectorLayer(
              <any>{
                title: layerInfo.name,
                source: source,
              }
            );

            let styleMap =
              converter.fromRenderer(
                <any>(
                  layerInfo.drawingInfo
                    .renderer
                ),
                { url: "for icons?" }
              );
            layer.setStyle(<any>((
              feature: FeatureLike,
              resolution: number
            ) => {
              if (
                styleMap instanceof
                Style
              ) {
                return styleMap;
              } else {
                return (<any>styleMap)(
                  feature
                );
              }
            }));

            d.resolve(layer);
          });

        return d;
      }
    );

    $.when
      .apply($, all)
      .then(
        (
          ...args: Array<
            VectorLayer<any>
          >
        ) => d.resolve(args)
      );

    return d;
  }
}
